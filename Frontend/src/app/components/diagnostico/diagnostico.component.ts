import {
  Component,
  ElementRef,
  signal,
  computed,
  ViewChild,
} from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { AnalysisService } from '../../services/analysis.service';
import { DiagnosticoResult, DiseaseProbability } from '../../models/analysis.models';

@Component({
  selector: 'app-diagnostico',
  standalone: true,
  imports: [DatePipe, NgClass, MatProgressBarModule, MatButtonModule, MatIconModule],
  templateUrl: './diagnostico.component.html',
  styleUrl: './diagnostico.component.scss',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px)' }),
        animate('380ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10px)' }),
        animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
    trigger('barGrow', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class DiagnosticoComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('changeInput') changeInputRef!: ElementRef<HTMLInputElement>;

  selectedImage = signal<string | null>(null);
  selectedFile  = signal<File | null>(null);
  isAnalyzing   = signal(false);
  result        = signal<DiagnosticoResult | null>(null);
  isDragging    = signal(false);
  showFeedback  = signal(false);
  feedbackSubmitted = signal(false);
  animateBars   = signal(false);
  error         = signal<string | null>(null);

  // Signal-based selection so Angular detects mutations reactively
  feedbackSelections = signal<ReadonlySet<string>>(new Set());

  // Derived signals for exclusivity rules
  readonly normalSelected = computed(() => this.feedbackSelections().has('Normal'));
  readonly anyDiseaseSelected = computed(() =>
    [...this.feedbackSelections()].some(s => s !== 'Normal')
  );
  readonly hasAnyFeedback = computed(() => this.feedbackSelections().size > 0);

  readonly allDiseases = ['Normal', 'Pneumonia', 'Tuberculose', 'Cardiomegalia', 'Derrame Pleural'];

  constructor(private readonly analysisService: AnalysisService) {}

  triggerFileInput(): void {
    this.fileInputRef.nativeElement.click();
  }

  triggerChangeInput(): void {
    this.changeInputRef.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.loadImage(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) this.loadImage(file);
  }

  private loadImage(file: File): void {
    this.selectedFile.set(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      this.selectedImage.set(reader.result as string);
      this.result.set(null);
      this.error.set(null);
      this.animateBars.set(false);
      this.feedbackSubmitted.set(false);
      this.showFeedback.set(false);
      this.feedbackSelections.set(new Set());
    };
    reader.readAsDataURL(file);
  }

  analyze(): void {
    const file = this.selectedFile();
    if (!file) return;
    this.isAnalyzing.set(true);
    this.result.set(null);
    this.error.set(null);
    this.animateBars.set(false);
    this.analysisService.analisarDiagnostico(file).subscribe({
      next: result => {
        this.isAnalyzing.set(false);
        this.result.set(result);
        setTimeout(() => this.animateBars.set(true), 80);
      },
      error: () => {
        this.isAnalyzing.set(false);
        this.error.set('Erro ao contactar o servidor. Verifique se o backend e o modelo IA estão activos.');
      },
    });
  }

  reset(): void {
    this.selectedImage.set(null);
    this.selectedFile.set(null);
    this.result.set(null);
    this.error.set(null);
    this.isAnalyzing.set(false);
    this.animateBars.set(false);
    this.showFeedback.set(false);
    this.feedbackSubmitted.set(false);
    this.feedbackSelections.set(new Set());
  }

  toggleFeedback(): void {
    this.showFeedback.update(v => !v);
  }

  toggleDisease(disease: string): void {
    if (this.isDisabled(disease)) return;
    const next = new Set(this.feedbackSelections());
    if (next.has(disease)) {
      next.delete(disease);
    } else {
      next.add(disease);
    }
    this.feedbackSelections.set(next);
  }

  isDiseaseSelected(disease: string): boolean {
    return this.feedbackSelections().has(disease);
  }

  isDisabled(disease: string): boolean {
    if (disease === 'Normal') {
      return this.anyDiseaseSelected();
    } else {
      return this.normalSelected();
    }
  }

  submitFeedback(): void {
    const res = this.result();
    if (!this.hasAnyFeedback() || !res) return;
    this.analysisService.enviarFeedbackDiagnostico(
      res.id, res.primaryDiagnosis.name, [...this.feedbackSelections()]
    ).subscribe();
    this.feedbackSubmitted.set(true);
    this.showFeedback.set(false);
  }

  getSeverityLabel(severity: DiseaseProbability['severity']): string {
    const map: Record<string, string> = {
      none: 'Nenhuma',
      low: 'Baixa',
      moderate: 'Moderada',
      high: 'Alta',
    };
    return map[severity] ?? severity;
  }

  trackByName(_: number, item: DiseaseProbability): string {
    return item.name;
  }
}
