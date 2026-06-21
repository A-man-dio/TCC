import { Component, ElementRef, signal, computed, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
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
import { TriagemResult } from '../../models/analysis.models';

@Component({
  selector: 'app-triagem',
  standalone: true,
  imports: [DatePipe, MatProgressBarModule, MatButtonModule, MatIconModule],
  templateUrl: './triagem.component.html',
  styleUrl: './triagem.component.scss',
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
  ],
})
export class TriagemComponent {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('changeInput') changeInputRef!: ElementRef<HTMLInputElement>;

  selectedImage = signal<string | null>(null);
  selectedFile  = signal<File | null>(null);
  isAnalyzing   = signal(false);
  result        = signal<TriagemResult | null>(null);
  isDragging    = signal(false);
  showFeedback  = signal(false);
  feedbackSubmitted = signal(false);
  error         = signal<string | null>(null);

  // O oposto do resultado previsto — é sempre a única correção possível
  suggestedCorrection = computed(() =>
    this.result()?.status === 'Normal' ? 'Anômalo' : 'Normal'
  );

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
      this.feedbackSubmitted.set(false);
      this.showFeedback.set(false);
    };
    reader.readAsDataURL(file);
  }

  analyze(): void {
    const file = this.selectedFile();
    if (!file) return;
    this.isAnalyzing.set(true);
    this.result.set(null);
    this.error.set(null);
    this.analysisService.analisarTriagem(file).subscribe({
      next: result => {
        this.isAnalyzing.set(false);
        this.result.set(result);
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
    this.showFeedback.set(false);
    this.feedbackSubmitted.set(false);
  }

  toggleFeedback(): void {
    this.showFeedback.update(v => !v);
  }

  confirmFeedback(): void {
    const res = this.result();
    if (!res) return;
    this.analysisService.enviarFeedbackTriagem(res.id, res.status, this.suggestedCorrection()).subscribe();
    this.feedbackSubmitted.set(true);
    this.showFeedback.set(false);
  }

  dismissFeedback(): void {
    this.showFeedback.set(false);
  }
}
