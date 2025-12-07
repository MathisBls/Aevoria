// Vérifier si VITE_API_URL contient déjà /api
const rawBaseUrl: string = (import.meta.env.VITE_API_URL as string | undefined) || 'http://localhost:3000';
const BASE_URL: string = rawBaseUrl.endsWith('/api') ? rawBaseUrl : `${rawBaseUrl}/api`;

const getToken = (): string | null => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

interface ApiError extends Error {
  response?: {
    status: number;
    data: { message: string };
  };
}

interface ErrorData {
  message?: string;
  error?: string;
}

const handleResponse = async (response: Response): Promise<unknown> => {
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('useraev');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('useraev');
      
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
        window.location.href = '/login';
      }
    }
    
    let errorMessage: string = response.statusText;
    try {
      const errorData = (await response.json()) as ErrorData;
      errorMessage = errorData.message || errorData.error || errorMessage;
    } catch {
      const errorText = await response.text();
      errorMessage = errorText || errorMessage;
    }
    
    const error: ApiError = new Error(errorMessage) as ApiError;
    error.response = { status: response.status, data: { message: errorMessage } };
    throw error;
  }
  if (response.status === 204) return null;
  return response.json() as Promise<unknown>;
};

const apiService = {
  get: async (endpoint: string): Promise<unknown> => {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'GET',
      headers
    });
    return handleResponse(res);
  },

  post: async (endpoint: string, data?: unknown, options?: { headers?: Record<string, string> }): Promise<unknown> => {
    const token = getToken();
    const headers: Record<string, string> = {};
    
    // Ne pas définir Content-Type pour FormData, le navigateur le fait automatiquement
    if (data instanceof FormData) {
      // Laisser le navigateur définir Content-Type avec boundary
    } else {
      headers['Content-Type'] = 'application/json';
    }
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    // Fusionner avec les headers optionnels
    if (options?.headers) {
      Object.assign(headers, options.headers);
    }
    
    const body = data instanceof FormData ? data : (data ? JSON.stringify(data) : undefined);
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });
    return handleResponse(res);
  },

  patch: async (endpoint: string, data?: unknown): Promise<unknown> => {
    const token = getToken();
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return handleResponse(res);
  },

  delete: async (endpoint: string): Promise<unknown> => {
    const token = getToken();
    const headers: Record<string, string> = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });
    return handleResponse(res);
  },
};

export default apiService;

