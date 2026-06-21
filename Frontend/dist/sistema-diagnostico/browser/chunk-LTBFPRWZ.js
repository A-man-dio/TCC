import {
  DefaultValueAccessor,
  FormControl,
  FormControlName,
  FormGroup,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TWYMCGVP.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ID7PT6HI.js";
import {
  AuthService,
  Router,
  RouterLink
} from "./chunk-KOIP6O46.js";
import {
  Component,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-VVLWDSGZ.js";

// src/app/components/auth/register/register.component.ts
function RegisterComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6)(1, "mat-icon");
    \u0275\u0275text(2, "error_outline");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
function RegisterComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Nome deve ter pelo menos 3 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Email inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "M\xEDnimo 6 caracteres");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "As senhas n\xE3o coincidem");
    \u0275\u0275elementEnd();
  }
}
function RegisterComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 23);
    \u0275\u0275text(1, " A registar\u2026 ");
  }
}
function RegisterComponent_Conditional_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "person_add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " Criar conta ");
  }
}
function passwordsMatch(g) {
  const senha = g.get("senha")?.value;
  const confirma = g.get("confirma")?.value;
  return senha && confirma && senha !== confirma ? { passwordMismatch: true } : null;
}
var _RegisterComponent = class _RegisterComponent {
  togglePass() {
    this.showPass.update((v) => !v);
  }
  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
    this.form = new FormGroup({
      nome: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      senha: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirma: new FormControl("", Validators.required)
    }, { validators: passwordsMatch });
    this.isLoading = signal(false, ...ngDevMode ? [{ debugName: "isLoading" }] : []);
    this.error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
    this.showPass = signal(false, ...ngDevMode ? [{ debugName: "showPass" }] : []);
  }
  submit() {
    if (this.form.invalid || this.isLoading())
      return;
    this.isLoading.set(true);
    this.error.set(null);
    this.authService.registar({
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.senha
    }).subscribe({
      next: () => this.router.navigate(["/"]),
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 409) {
          this.error.set("Este email j\xE1 est\xE1 registado.");
        } else if (err.status === 0) {
          this.error.set("Servidor inacess\xEDvel. Verifique se o backend est\xE1 activo.");
        } else {
          this.error.set("Erro inesperado. Tente novamente.");
        }
      }
    });
  }
};
_RegisterComponent.\u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router));
};
_RegisterComponent.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], decls: 49, vars: 19, consts: [[1, "auth-page"], [1, "auth-brand"], [1, "brand-icon-wrap"], [1, "brand-text"], [1, "auth-card"], [1, "card-header"], [1, "error-banner"], ["novalidate", "", 1, "auth-form", 3, "ngSubmit", "formGroup"], [1, "form-field"], ["for", "nome"], ["id", "nome", "type", "text", "formControlName", "nome", "placeholder", "Dr. Jo\xE3o Silva", "autocomplete", "name"], [1, "field-error"], ["for", "email"], ["id", "email", "type", "email", "formControlName", "email", "placeholder", "medico@hospital.ao", "autocomplete", "email"], ["for", "senha"], [1, "input-wrap"], ["id", "senha", "formControlName", "senha", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", 3, "type"], ["type", "button", "tabindex", "-1", 1, "toggle-pass", 3, "click"], ["for", "confirma"], ["id", "confirma", "formControlName", "confirma", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", "autocomplete", "new-password", 3, "type"], ["type", "submit", 1, "submit-btn", "violet", 3, "disabled"], [1, "auth-link"], ["routerLink", "/login"], [1, "spinner"]], template: function RegisterComponent_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon");
    \u0275\u0275text(4, "radiology");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 3)(6, "h1");
    \u0275\u0275text(7, "Sistema de Diagn\xF3stico por Raio-X");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9, "An\xE1lise de imagens m\xE9dicas com intelig\xEAncia artificial");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 4)(11, "div", 5)(12, "h2");
    \u0275\u0275text(13, "Criar conta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p");
    \u0275\u0275text(15, "Preencha os seus dados para aceder ao sistema");
    \u0275\u0275elementEnd()();
    \u0275\u0275conditionalCreate(16, RegisterComponent_Conditional_16_Template, 5, 1, "div", 6);
    \u0275\u0275elementStart(17, "form", 7);
    \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_17_listener() {
      return ctx.submit();
    });
    \u0275\u0275elementStart(18, "div", 8)(19, "label", 9);
    \u0275\u0275text(20, "Nome completo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 10);
    \u0275\u0275conditionalCreate(22, RegisterComponent_Conditional_22_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "div", 8)(24, "label", 12);
    \u0275\u0275text(25, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 13);
    \u0275\u0275conditionalCreate(27, RegisterComponent_Conditional_27_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 8)(29, "label", 14);
    \u0275\u0275text(30, "Senha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "div", 15);
    \u0275\u0275element(32, "input", 16);
    \u0275\u0275elementStart(33, "button", 17);
    \u0275\u0275listener("click", function RegisterComponent_Template_button_click_33_listener() {
      return ctx.togglePass();
    });
    \u0275\u0275elementStart(34, "mat-icon");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()()();
    \u0275\u0275conditionalCreate(36, RegisterComponent_Conditional_36_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 8)(38, "label", 18);
    \u0275\u0275text(39, "Confirmar senha");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 19);
    \u0275\u0275conditionalCreate(41, RegisterComponent_Conditional_41_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "button", 20);
    \u0275\u0275conditionalCreate(43, RegisterComponent_Conditional_43_Template, 2, 0)(44, RegisterComponent_Conditional_44_Template, 3, 0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "p", 21);
    \u0275\u0275text(46, " J\xE1 tem conta? ");
    \u0275\u0275elementStart(47, "a", 22);
    \u0275\u0275text(48, "Entrar");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    \u0275\u0275advance(16);
    \u0275\u0275conditional(ctx.error() ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx.form);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx.form.get("nome").invalid && ctx.form.get("nome").touched);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.form.get("nome").invalid && ctx.form.get("nome").touched ? 22 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx.form.get("email").invalid && ctx.form.get("email").touched);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.form.get("email").invalid && ctx.form.get("email").touched ? 27 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275classProp("invalid", ctx.form.get("senha").invalid && ctx.form.get("senha").touched);
    \u0275\u0275property("type", ctx.showPass() ? "text" : "password");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx.showPass() ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.form.get("senha").invalid && ctx.form.get("senha").touched ? 36 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("invalid", ctx.form.hasError("passwordMismatch") && ctx.form.get("confirma").touched);
    \u0275\u0275property("type", ctx.showPass() ? "text" : "password");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.form.hasError("passwordMismatch") && ctx.form.get("confirma").touched ? 41 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx.form.invalid || ctx.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx.isLoading() ? 43 : 44);
  }
}, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatIconModule, MatIcon], styles: ['@charset "UTF-8";\n\n\n\n.auth-page[_ngcontent-%COMP%] {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 28px;\n  padding: 40px 20px;\n  background: var(--bg-void);\n}\n.auth-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.brand-icon-wrap[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  background: var(--violet-glow);\n  border: 1px solid rgba(157, 111, 255, 0.25);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-icon-wrap[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--violet);\n}\n.brand-text[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.1;\n  letter-spacing: -0.2px;\n}\n.brand-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.66rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 420px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-bright);\n  border-radius: 16px;\n  padding: 36px 32px 28px;\n  position: relative;\n  overflow: hidden;\n}\n.auth-card[_ngcontent-%COMP%]::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--violet),\n      transparent);\n  opacity: 0.7;\n}\n.card-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-family: var(--font-display);\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-family: var(--font-body);\n  font-size: 0.83rem;\n  color: var(--text-secondary);\n}\n.error-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n  border-radius: 8px;\n  padding: 10px 14px;\n  margin-bottom: 20px;\n  font-family: var(--font-body);\n  font-size: 0.82rem;\n  color: var(--red);\n}\n.error-banner[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-field[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 11px 14px;\n  background: var(--bg-void);\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  color: var(--text-primary);\n  font-family: var(--font-body);\n  font-size: 0.9rem;\n  outline: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus {\n  border-color: var(--violet);\n  box-shadow: 0 0 0 3px var(--violet-glow);\n}\n.form-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-muted);\n}\n.form-field[_ngcontent-%COMP%]   input.invalid[_ngcontent-%COMP%] {\n  border-color: var(--red);\n}\n.input-wrap[_ngcontent-%COMP%] {\n  position: relative;\n}\n.input-wrap[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  padding-right: 44px;\n}\n.toggle-pass[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text-muted);\n  display: flex;\n  align-items: center;\n  padding: 4px;\n  border-radius: 4px;\n  transition: color 0.2s;\n}\n.toggle-pass[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.toggle-pass[_ngcontent-%COMP%]:hover {\n  color: var(--text-secondary);\n}\n.field-error[_ngcontent-%COMP%] {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  color: var(--red);\n  letter-spacing: 0.2px;\n}\n.submit-btn[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  width: 100%;\n  padding: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--violet-dim),\n      var(--violet));\n  border: none;\n  border-radius: 10px;\n  color: #EDF2FF;\n  font-family: var(--font-display);\n  font-size: 0.9rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: opacity 0.2s, transform 0.15s;\n}\n.submit-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  opacity: 0.88;\n  transform: translateY(-1px);\n}\n.submit-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.spinner[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(237, 242, 255, 0.3);\n  border-top-color: #EDF2FF;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_spin 0.7s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-link[_ngcontent-%COMP%] {\n  margin-top: 20px;\n  text-align: center;\n  font-family: var(--font-body);\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--violet);\n  text-decoration: none;\n  font-weight: 600;\n  margin-left: 4px;\n}\n.auth-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=register.component.css.map */'] });
var RegisterComponent = _RegisterComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(RegisterComponent, [{
    type: Component,
    args: [{ selector: "app-register", standalone: true, imports: [ReactiveFormsModule, RouterLink, MatIconModule], template: `<div class="auth-page">

  <div class="auth-brand">
    <div class="brand-icon-wrap">
      <mat-icon>radiology</mat-icon>
    </div>
    <div class="brand-text">
      <h1>Sistema de Diagn\xF3stico por Raio-X</h1>
      <p>An\xE1lise de imagens m\xE9dicas com intelig\xEAncia artificial</p>
    </div>
  </div>

  <div class="auth-card">
    <div class="card-header">
      <h2>Criar conta</h2>
      <p>Preencha os seus dados para aceder ao sistema</p>
    </div>

    @if (error()) {
      <div class="error-banner">
        <mat-icon>error_outline</mat-icon>
        <span>{{ error() }}</span>
      </div>
    }

    <form [formGroup]="form" (ngSubmit)="submit()" class="auth-form" novalidate>

      <div class="form-field">
        <label for="nome">Nome completo</label>
        <input
          id="nome"
          type="text"
          formControlName="nome"
          placeholder="Dr. Jo\xE3o Silva"
          autocomplete="name"
          [class.invalid]="form.get('nome')!.invalid && form.get('nome')!.touched"
        />
        @if (form.get('nome')!.invalid && form.get('nome')!.touched) {
          <span class="field-error">Nome deve ter pelo menos 3 caracteres</span>
        }
      </div>

      <div class="form-field">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          placeholder="medico@hospital.ao"
          autocomplete="email"
          [class.invalid]="form.get('email')!.invalid && form.get('email')!.touched"
        />
        @if (form.get('email')!.invalid && form.get('email')!.touched) {
          <span class="field-error">Email inv\xE1lido</span>
        }
      </div>

      <div class="form-field">
        <label for="senha">Senha</label>
        <div class="input-wrap">
          <input
            id="senha"
            [type]="showPass() ? 'text' : 'password'"
            formControlName="senha"
            placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
            autocomplete="new-password"
            [class.invalid]="form.get('senha')!.invalid && form.get('senha')!.touched"
          />
          <button type="button" class="toggle-pass" (click)="togglePass()" tabindex="-1">
            <mat-icon>{{ showPass() ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </div>
        @if (form.get('senha')!.invalid && form.get('senha')!.touched) {
          <span class="field-error">M\xEDnimo 6 caracteres</span>
        }
      </div>

      <div class="form-field">
        <label for="confirma">Confirmar senha</label>
        <input
          id="confirma"
          [type]="showPass() ? 'text' : 'password'"
          formControlName="confirma"
          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
          autocomplete="new-password"
          [class.invalid]="form.hasError('passwordMismatch') && form.get('confirma')!.touched"
        />
        @if (form.hasError('passwordMismatch') && form.get('confirma')!.touched) {
          <span class="field-error">As senhas n\xE3o coincidem</span>
        }
      </div>

      <button type="submit" class="submit-btn violet" [disabled]="form.invalid || isLoading()">
        @if (isLoading()) {
          <span class="spinner"></span>
          A registar\u2026
        } @else {
          <mat-icon>person_add</mat-icon>
          Criar conta
        }
      </button>

    </form>

    <p class="auth-link">
      J\xE1 tem conta?
      <a routerLink="/login">Entrar</a>
    </p>
  </div>

</div>
`, styles: ['@charset "UTF-8";\n\n/* src/app/components/auth/register/register.component.scss */\n.auth-page {\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 28px;\n  padding: 40px 20px;\n  background: var(--bg-void);\n}\n.auth-brand {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.brand-icon-wrap {\n  width: 44px;\n  height: 44px;\n  background: var(--violet-glow);\n  border: 1px solid rgba(157, 111, 255, 0.25);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n}\n.brand-icon-wrap mat-icon {\n  font-size: 22px;\n  width: 22px;\n  height: 22px;\n  color: var(--violet);\n}\n.brand-text h1 {\n  font-family: var(--font-display);\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  line-height: 1.1;\n  letter-spacing: -0.2px;\n}\n.brand-text p {\n  font-family: var(--font-mono);\n  font-size: 0.66rem;\n  color: var(--text-secondary);\n  margin-top: 3px;\n  letter-spacing: 0.3px;\n}\n.auth-card {\n  width: 100%;\n  max-width: 420px;\n  background: var(--bg-surface);\n  border: 1px solid var(--border-bright);\n  border-radius: 16px;\n  padding: 36px 32px 28px;\n  position: relative;\n  overflow: hidden;\n}\n.auth-card::before {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background:\n    linear-gradient(\n      90deg,\n      transparent,\n      var(--violet),\n      transparent);\n  opacity: 0.7;\n}\n.card-header {\n  margin-bottom: 24px;\n}\n.card-header h2 {\n  font-family: var(--font-display);\n  font-size: 1.4rem;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin-bottom: 6px;\n}\n.card-header p {\n  font-family: var(--font-body);\n  font-size: 0.83rem;\n  color: var(--text-secondary);\n}\n.error-banner {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: var(--red-bg);\n  border: 1px solid var(--red-border);\n  border-radius: 8px;\n  padding: 10px 14px;\n  margin-bottom: 20px;\n  font-family: var(--font-body);\n  font-size: 0.82rem;\n  color: var(--red);\n}\n.error-banner mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  flex-shrink: 0;\n}\n.auth-form {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.form-field label {\n  font-family: var(--font-mono);\n  font-size: 0.68rem;\n  font-weight: 500;\n  color: var(--text-secondary);\n  letter-spacing: 0.6px;\n  text-transform: uppercase;\n}\n.form-field input {\n  width: 100%;\n  padding: 11px 14px;\n  background: var(--bg-void);\n  border: 1px solid var(--border-bright);\n  border-radius: 8px;\n  color: var(--text-primary);\n  font-family: var(--font-body);\n  font-size: 0.9rem;\n  outline: none;\n  transition: border-color 0.2s, box-shadow 0.2s;\n}\n.form-field input:focus {\n  border-color: var(--violet);\n  box-shadow: 0 0 0 3px var(--violet-glow);\n}\n.form-field input::placeholder {\n  color: var(--text-muted);\n}\n.form-field input.invalid {\n  border-color: var(--red);\n}\n.input-wrap {\n  position: relative;\n}\n.input-wrap input {\n  padding-right: 44px;\n}\n.toggle-pass {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  color: var(--text-muted);\n  display: flex;\n  align-items: center;\n  padding: 4px;\n  border-radius: 4px;\n  transition: color 0.2s;\n}\n.toggle-pass mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.toggle-pass:hover {\n  color: var(--text-secondary);\n}\n.field-error {\n  font-family: var(--font-mono);\n  font-size: 0.65rem;\n  color: var(--red);\n  letter-spacing: 0.2px;\n}\n.submit-btn {\n  margin-top: 4px;\n  width: 100%;\n  padding: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  background:\n    linear-gradient(\n      135deg,\n      var(--violet-dim),\n      var(--violet));\n  border: none;\n  border-radius: 10px;\n  color: #EDF2FF;\n  font-family: var(--font-display);\n  font-size: 0.9rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: opacity 0.2s, transform 0.15s;\n}\n.submit-btn mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.submit-btn:hover:not(:disabled) {\n  opacity: 0.88;\n  transform: translateY(-1px);\n}\n.submit-btn:disabled {\n  opacity: 0.4;\n  cursor: not-allowed;\n}\n.spinner {\n  width: 16px;\n  height: 16px;\n  border: 2px solid rgba(237, 242, 255, 0.3);\n  border-top-color: #EDF2FF;\n  border-radius: 50%;\n  animation: spin 0.7s linear infinite;\n}\n@keyframes spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n.auth-link {\n  margin-top: 20px;\n  text-align: center;\n  font-family: var(--font-body);\n  font-size: 0.82rem;\n  color: var(--text-muted);\n}\n.auth-link a {\n  color: var(--violet);\n  text-decoration: none;\n  font-weight: 600;\n  margin-left: 4px;\n}\n.auth-link a:hover {\n  text-decoration: underline;\n}\n/*# sourceMappingURL=register.component.css.map */\n'] }]
  }], () => [{ type: AuthService }, { type: Router }], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src/app/components/auth/register/register.component.ts", lineNumber: 20 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-LTBFPRWZ.js.map
