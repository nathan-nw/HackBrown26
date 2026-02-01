export interface AITracker {
  sessionId: string;
  callId: number;
  kind: string;
  step: number;
  ts: number;
}

export interface AIPayload {
  ideaDraft: any; // Using any for flexibility, can be typed strictly if needed
}

export interface AIRequest {
  tracker: AITracker;
  payload: AIPayload;
}

export interface PatternMatchResult {
  narrow: {
    company: string;
    sentence: string;
  };
  wide: {
    company: string;
    sentence: string;
  };
  why: string;
}

export interface AIResponse {
  tracker: AITracker;
  result: PatternMatchResult | null; // Typed result, or null on error
}
