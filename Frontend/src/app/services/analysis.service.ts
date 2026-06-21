import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { DiagnosticoResult, DiseaseProbability, TriagemResult, TriagemStatus } from '../models/analysis.models';

interface BackendDiseaseProbability {
  nome: string;
  probabilidade: number;
  severidade: string;
}

interface BackendTriagemResponse {
  id: string;
  status: string;
  confianca: number;
  timestamp: unknown;
  duracaoMs: number;
}

interface BackendDiagnosticoResponse {
  id: string;
  diagnosticoPrimario: BackendDiseaseProbability;
  probabilidades: BackendDiseaseProbability[];
  timestamp: unknown;
  duracaoMs: number;
}

const DISEASE_META: Record<string, Pick<DiseaseProbability, 'colorKey' | 'icon'>> = {
  'Normal':          { colorKey: 'green',  icon: 'check_circle' },
  'Pneumonia':       { colorKey: 'orange', icon: 'air' },
  'Tuberculose':     { colorKey: 'red',    icon: 'warning' },
  'Cardiomegalia':   { colorKey: 'purple', icon: 'favorite' },
  'Derrame Pleural': { colorKey: 'cyan',   icon: 'water_drop' },
};

@Injectable({ providedIn: 'root' })
export class AnalysisService {
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  constructor(private readonly http: HttpClient) {}

  analisarTriagem(imagem: File): Observable<TriagemResult> {
    const form = new FormData();
    form.append('imagem', imagem);
    return this.http.post<BackendTriagemResponse>(`${this.baseUrl}/analise/triagem`, form).pipe(
      map(r => ({
        id:         r.id,
        status:     r.status as TriagemStatus,
        confidence: r.confianca,
        timestamp:  new Date(),
      })),
    );
  }

  analisarDiagnostico(imagem: File): Observable<DiagnosticoResult> {
    const form = new FormData();
    form.append('imagem', imagem);
    return this.http.post<BackendDiagnosticoResponse>(`${this.baseUrl}/analise/diagnostico`, form).pipe(
      map(r => {
        const mapDisease = (p: BackendDiseaseProbability): DiseaseProbability => ({
          name:       p.nome,
          probability: p.probabilidade,
          severity:   this.mapSeveridade(p.severidade),
          ...(DISEASE_META[p.nome] ?? { colorKey: 'green', icon: 'check_circle' }),
        });

        return {
          id:               r.id,
          probabilities:    r.probabilidades.map(mapDisease),
          primaryDiagnosis: mapDisease(r.diagnosticoPrimario),
          timestamp:        new Date(),
        };
      }),
    );
  }

  enviarFeedbackTriagem(analiseId: string, predicao: string, correcao: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/feedback/triagem`, { analiseId, predicao, correcao });
  }

  enviarFeedbackDiagnostico(analiseId: string, predicaoPrimaria: string, correcao: string[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/feedback/diagnostico`, { analiseId, predicaoPrimaria, correcao });
  }

  private mapSeveridade(s: string): DiseaseProbability['severity'] {
    const map: Record<string, DiseaseProbability['severity']> = {
      none: 'none', low: 'low', moderate: 'moderate', high: 'high',
    };
    return map[s] ?? 'none';
  }
}
