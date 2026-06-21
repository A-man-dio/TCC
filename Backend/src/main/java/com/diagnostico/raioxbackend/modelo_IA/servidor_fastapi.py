"""
Servidor FastAPI — Microserviço de IA para Diagnóstico por Raio-X
Porta: 8000

MODO ACTUAL: MOCK (respostas simuladas — não requer modelo treinado)
MODO FUTURO: REAL  (descomentar a secção "MODELO REAL" e comentar a secção "MOCK")

Como correr:
    pip install fastapi uvicorn pillow python-multipart
    python servidor_fastapi.py

Quando o modelo estiver pronto, instalar também:
    pip install torchxrayvision torch torchvision
"""

import json
import time
import base64
import io
import random
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel


# ══════════════════════════════════════════════════════════════════════════════
# SECÇÃO A — CONFIGURAÇÃO PARTILHADA (mock e real usam isto)
# ══════════════════════════════════════════════════════════════════════════════

PORTA        = 8000
MODEL_VERSION_MOCK = "mock-v0.0"        # versão usada nas respostas simuladas
MODEL_VERSION_REAL = "angolano-v1.0.0"  # versão a usar quando o modelo real estiver pronto

CLASSES = ["Normal", "Pneumonia", "Tuberculose", "COVID-19"]
NUM_CLASSES = len(CLASSES)


# ══════════════════════════════════════════════════════════════════════════════
# SECÇÃO B — CARREGAMENTO DO MODELO REAL
# Descomenta este bloco inteiro quando tiveres o modelo treinado.
# Comenta a SECÇÃO C (MOCK) antes de descomentar isto.
# ══════════════════════════════════════════════════════════════════════════════

# import numpy as np
# import torch
# import torch.nn as nn
# import torchvision
# import torchxrayvision as xrv
# from PIL import Image
#
# MODELO_PATH  = "melhor_modelo_finetuned.pth"   # gerado pelo notebook transfer_learning_multiclasse.ipynb
# CLASSES_PATH = "classes.json"                  # gerado pelo mesmo notebook (CORRECÇÃO 5)
#
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
# print(f"Dispositivo: {device}")
#
# # Carregar as classes do ficheiro JSON (garante consistência com o treino)
# with open(CLASSES_PATH, "r", encoding="utf-8") as f:
#     config      = json.load(f)
#     CLASSES     = config["classes"]
#     NUM_CLASSES = config["num_classes"]
#
# # Recriar a arquitectura EXACTAMENTE igual ao notebook de treino
# # (se alterares o classifier no notebook, altera aqui também)
# model = xrv.models.DenseNet(weights="densenet121-res224-mimic_ch")
# model.op_threshs = None
# model.classifier = nn.Sequential(
#     nn.Linear(1024, 256),
#     nn.ReLU(),
#     nn.Dropout(0.4),
#     nn.Linear(256, NUM_CLASSES)
# )
# model.load_state_dict(torch.load(MODELO_PATH, map_location=device))
# model.to(device)
# model.eval()   # modo inferência — desativa dropout e batchnorm de treino
# print(f"Modelo real carregado. Classes: {CLASSES}")
#
# # Pré-processamento — DEVE ser idêntico ao notebook de treino
# # Se mudares aqui sem mudar no notebook (ou vice-versa), as predições ficam erradas
# _transform = torchvision.transforms.Compose([
#     xrv.datasets.XRayCenterCrop(),
#     xrv.datasets.XRayResizer(224)
# ])
#
# def _preprocessar(imagem_bytes: bytes) -> torch.Tensor:
#     img = Image.open(io.BytesIO(imagem_bytes)).convert("L")  # força escala de cinza
#     img = np.array(img, dtype=np.float32)
#     img = xrv.datasets.normalize(img, 255)                   # normaliza para [-1024, 1024]
#     img = img[None, ...]                                      # adiciona canal → (1, H, W)
#     img = _transform(img)
#     return torch.from_numpy(img).unsqueeze(0).to(device)     # adiciona batch → (1, 1, 224, 224)


# ══════════════════════════════════════════════════════════════════════════════
# SECÇÃO C — MOCK (respostas simuladas — comenta quando activares o modelo real)
# ══════════════════════════════════════════════════════════════════════════════

def _mock_probs() -> list[float]:
    """Gera probabilidades aleatórias realistas para simular o modelo."""
    raw   = [random.uniform(0.05, 1.0) for _ in CLASSES]
    total = sum(raw)
    return [v / total for v in raw]   # normalizar para somar 1


# ══════════════════════════════════════════════════════════════════════════════
# SECÇÃO D — CONTRATOS DE REQUEST / RESPONSE
# Devem corresponder exactamente aos DTOs do Spring Boot (integration/dto/)
# ══════════════════════════════════════════════════════════════════════════════

class PredictRequest(BaseModel):
    imagemBase64: str   # imagem codificada em base64 — enviada pelo Spring Boot
    imagemHash:   str   # SHA-256 da imagem — para registo no Spring Boot
    requestId:    str   # UUID gerado pelo Spring Boot para rastrear o pedido


class ProbabilidadeDoenca(BaseModel):
    doenca:         str
    probabilidade:  int   # percentagem inteira, ex: 67


class TriagemResponse(BaseModel):
    requestId:    str
    status:       str   # "Normal" ou "Anômalo"  ← Spring espera exactamente estes valores
    confianca:    int   # percentagem da classe vencedora
    modelVersion: str
    inferenceMs:  int


class DiagnosticoResponse(BaseModel):
    requestId:      str
    probabilidades: list[ProbabilidadeDoenca]
    modelVersion:   str
    inferenceMs:    int


# ══════════════════════════════════════════════════════════════════════════════
# SECÇÃO E — APLICAÇÃO E ENDPOINTS
# ══════════════════════════════════════════════════════════════════════════════

app = FastAPI(title="RaioX IA — Microserviço", version="1.0.0")


@app.get("/health")
def health():
    """Spring Boot pode chamar este endpoint para verificar se o servidor está vivo."""
    return {
        "status": "ok",
        "modo":   "mock",          # ← muda para "real" quando activares o modelo
        "classes": CLASSES
    }


# ─────────────────────────────────────────────────────────────────────────────
# Endpoint: /predict/triagem
# ─────────────────────────────────────────────────────────────────────────────

@app.post("/predict/triagem", response_model=TriagemResponse)
def predict_triagem(req: PredictRequest):

    # Validar que o base64 é decodificável (independente de mock ou real)
    try:
        imagem_bytes = base64.b64decode(req.imagemBase64)
    except Exception:
        raise HTTPException(status_code=400, detail="imagemBase64 inválido")

    inicio = time.time()

    # ── MOCK ──────────────────────────────────────────────────────────────────
    # Remove este bloco quando activares o modelo real (SECÇÃO B)
    probs        = _mock_probs()
    idx_vencedor = int(probs.index(max(probs)))
    classe       = CLASSES[idx_vencedor]
    confianca    = int(round(probs[idx_vencedor] * 100))
    time.sleep(0.05)   # simular latência de inferência
    model_version = MODEL_VERSION_MOCK
    # ── FIM MOCK ──────────────────────────────────────────────────────────────

    # ── MODELO REAL ───────────────────────────────────────────────────────────
    # Descomenta este bloco e comenta o bloco MOCK quando o modelo estiver pronto.
    # Requer que a SECÇÃO B (carregamento do modelo) também esteja descomentada.
    #
    # with torch.no_grad():
    #     tensor       = _preprocessar(imagem_bytes)
    #     outputs      = model(tensor)
    #     probs_tensor = torch.softmax(outputs, dim=1)[0].cpu().numpy()
    # probs        = probs_tensor.tolist()
    # idx_vencedor = int(probs_tensor.argmax())
    # classe       = CLASSES[idx_vencedor]
    # confianca    = int(round(probs[idx_vencedor] * 100))
    # model_version = MODEL_VERSION_REAL
    # ── FIM MODELO REAL ───────────────────────────────────────────────────────

    inference_ms = int((time.time() - inicio) * 1000)

    # Mapeamento para os dois valores que o Spring Boot espera
    status = "Normal" if classe == "Normal" else "Anômalo"

    return TriagemResponse(
        requestId    = req.requestId,
        status       = status,
        confianca    = confianca,
        modelVersion = model_version,
        inferenceMs  = inference_ms
    )


# ─────────────────────────────────────────────────────────────────────────────
# Endpoint: /predict/diagnostico
# ─────────────────────────────────────────────────────────────────────────────

@app.post("/predict/diagnostico", response_model=DiagnosticoResponse)
def predict_diagnostico(req: PredictRequest):

    try:
        imagem_bytes = base64.b64decode(req.imagemBase64)
    except Exception:
        raise HTTPException(status_code=400, detail="imagemBase64 inválido")

    inicio = time.time()

    # ── MOCK ──────────────────────────────────────────────────────────────────
    probs         = _mock_probs()
    model_version = MODEL_VERSION_MOCK
    time.sleep(0.05)
    # ── FIM MOCK ──────────────────────────────────────────────────────────────

    # ── MODELO REAL ───────────────────────────────────────────────────────────
    # with torch.no_grad():
    #     tensor       = _preprocessar(imagem_bytes)
    #     outputs      = model(tensor)
    #     probs_tensor = torch.softmax(outputs, dim=1)[0].cpu().numpy()
    # probs         = probs_tensor.tolist()
    # model_version = MODEL_VERSION_REAL
    # ── FIM MODELO REAL ───────────────────────────────────────────────────────

    inference_ms = int((time.time() - inicio) * 1000)

    probabilidades = [
        ProbabilidadeDoenca(doenca=classe, probabilidade=int(round(p * 100)))
        for classe, p in zip(CLASSES, probs)
    ]
    probabilidades.sort(key=lambda x: x.probabilidade, reverse=True)

    return DiagnosticoResponse(
        requestId      = req.requestId,
        probabilidades = probabilidades,
        modelVersion   = model_version,
        inferenceMs    = inference_ms
    )


# ─────────────────────────────────────────────────────────────────────────────
# Endpoint: /finetune/trigger
# ─────────────────────────────────────────────────────────────────────────────

@app.post("/finetune/trigger")
def finetune_trigger(payload: dict):
    """
    Chamado pelo Spring Boot quando acumula 1000 imagens de feedback.
    """

    # ── MOCK ──────────────────────────────────────────────────────────────────
    print(f"[MOCK] Fine-tuning solicitado: {payload}")
    return {"status": "accepted", "runId": payload.get("runId"), "modo": "mock"}
    # ── FIM MOCK ──────────────────────────────────────────────────────────────

    # ── MODELO REAL ───────────────────────────────────────────────────────────
    # import threading
    # import subprocess
    # def _executar_treino():
    #     dataset_path = payload.get("datasetPath", "feedback-data/")
    #     tipo         = payload.get("tipo", "TRIAGEM")
    #     print(f"[REAL] A iniciar re-treino com dados de {dataset_path} ...")
    #     # Opção simples: chamar o notebook como script
    #     # subprocess.run(["python", "re_treino.py", "--tipo", tipo, "--dataset", dataset_path])
    #     # Após treino, recarregar o modelo em memória:
    #     # model.load_state_dict(torch.load(MODELO_PATH, map_location=device))
    #     # model.eval()
    #     print("[REAL] Re-treino concluído.")
    # threading.Thread(target=_executar_treino, daemon=True).start()
    # return {"status": "accepted", "runId": payload.get("runId"), "modo": "real"}
    # ── FIM MODELO REAL ───────────────────────────────────────────────────────


# ══════════════════════════════════════════════════════════════════════════════
# ARRANCAR
# ══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("=" * 55)
    print("  RaioX IA — Servidor FastAPI")
    print(f"  Modo:   MOCK (respostas simuladas)")
    print(f"  URL:    http://localhost:{PORTA}")
    print(f"  Docs:   http://localhost:{PORTA}/docs")
    print("=" * 55)
    uvicorn.run(app, host="0.0.0.0", port=PORTA, reload=False)
