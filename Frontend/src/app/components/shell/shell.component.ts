import { Component, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TriagemComponent } from '../triagem/triagem.component';
import { DiagnosticoComponent } from '../diagnostico/diagnostico.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatButtonModule, MatTooltipModule, TriagemComponent, DiagnosticoComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
})
export class ShellComponent {
  readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
