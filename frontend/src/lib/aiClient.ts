export interface AIRequest {
  tracker: {
    sessionId: string;
    callId: number;
    kind: string;
    step: number;
    ts: number;
  };
  payload: any;
}

export interface AIResponse {
  tracker: {
    sessionId: string;
    callId: number;
    kind: string;
    step: number;
    ts: number;
  };
  result: any;
  error?: string;
}

export async function callAI(
  request: AIRequest, 
  signal?: AbortSignal
): Promise<AIResponse> {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  try {
    const response = await fetch(`${backendUrl}/api/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal,
    });

    if (response.status === 429) {
      throw new Error('Rate limited');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'AI request failed');
    }

    return await response.json();
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw error; // Let caller handle aborts specifically if needed
    }
    console.debug('[AI Client] Error:', error);
    throw error;
  }
}
