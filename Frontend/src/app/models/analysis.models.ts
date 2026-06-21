export type TriagemStatus = 'Normal' | 'Anômalo';

export interface TriagemResult {
  id: string;
  status: TriagemStatus;
  confidence: number;
  timestamp: Date;
}

export interface DiseaseProbability {
  name: string;
  probability: number;
  severity: 'none' | 'low' | 'moderate' | 'high';
  colorKey: 'green' | 'orange' | 'red' | 'purple' | 'cyan';
  icon: string;
}

export interface DiagnosticoResult {
  id: string;
  probabilities: DiseaseProbability[];
  primaryDiagnosis: DiseaseProbability;
  timestamp: Date;
}

export interface TriagemFeedback {
  type: 'triagem';
  prediction: TriagemStatus;
  correction: TriagemStatus;
  timestamp: Date;
}

export interface DiagnosticoFeedback {
  type: 'diagnostico';
  primaryPrediction: string;
  correction: string[];
  timestamp: Date;
}
