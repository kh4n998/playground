export interface Answer {
  value?: number;
  label?: string;
  correct: boolean;
  selected: boolean;
}

export interface Quiz {
  index: number;
  question: string;
  option: Answer[];
}
