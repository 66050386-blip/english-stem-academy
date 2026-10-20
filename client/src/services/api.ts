const BASE_URL = '/api';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || `HTTP error ${response.status}`);
  }

  return json.data !== undefined ? json.data : json;
}

export const api = {
  // Auth
  auth: {
    login: (credentials: any) => request<any>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
    register: (userData: any) => request<any>('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
    getMe: () => request<any>('/auth/me'),
    updateProfile: (profile: any) => request<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),
    changePassword: (data: any) => request<any>('/auth/change-password', { method: 'PUT', body: JSON.stringify(data) }),
  },

  // Dashboard
  dashboard: {
    getDashboardData: () => request<any>('/dashboard'),
  },

  // Courses
  courses: {
    getCourses: (category?: string) => request<any>(`/courses${category ? `?category=${category}` : ''}`),
    getCourseDetail: (id: string) => request<any>(`/courses/${id}`),
    getLessonDetail: (id: string) => request<any>(`/courses/lessons/${id}`),
    saveProgress: (lessonId: string, data: { timeSpentSec: number; isCompleted: boolean; score?: number }) =>
      request<any>(`/courses/lessons/${lessonId}/progress`, { method: 'POST', body: JSON.stringify(data) }),
  },

  // Vocabulary
  vocabulary: {
    list: (params?: { search?: string; level?: string; category?: string; page?: number; limit?: number }) => {
      const q = new URLSearchParams();
      if (params?.search) q.append('search', params.search);
      if (params?.level) q.append('level', params.level);
      if (params?.category) q.append('category', params.category);
      if (params?.page) q.append('page', params.page.toString());
      if (params?.limit) q.append('limit', params.limit.toString());
      return request<any>(`/vocabulary?${q.toString()}`);
    },
    getDueReviews: () => request<any>('/vocabulary/due-reviews'),
    submitReview: (id: string, rating: number) =>
      request<any>(`/vocabulary/${id}/review`, { method: 'POST', body: JSON.stringify({ rating }) }),
    toggleBookmark: (id: string) => request<any>(`/vocabulary/${id}/bookmark`, { method: 'POST' }),
    getQuiz: (category?: string, count?: number) =>
      request<any>(`/vocabulary/quiz?category=${category || 'ALL'}&count=${count || 10}`),
  },

  // Practice Centers
  practice: {
    getGrammar: () => request<any>('/practice/grammar'),
    getListening: () => request<any>('/practice/listening'),
    getSpeakingPrompts: () => request<any>('/practice/speaking/prompts'),
    evaluateSpeaking: (data: { targetText: string; transcribedText: string }) =>
      request<any>('/practice/speaking/evaluate', { method: 'POST', body: JSON.stringify(data) }),
    getReading: () => request<any>('/practice/reading'),
    evaluateReport: (data: { reportType: string; userText: string }) =>
      request<any>('/practice/writing/evaluate-report', { method: 'POST', body: JSON.stringify(data) }),
  },

  // TOEIC
  toeic: {
    getOverview: () => request<any>('/toeic/overview'),
    getPractice: (part: number, count?: number) => request<any>(`/toeic/practice/${part}?count=${count || 10}`),
    submitPractice: (data: { answers: { questionId: string; selectedKey: string }[]; timeSpentSec: number }) =>
      request<any>('/toeic/submit', { method: 'POST', body: JSON.stringify(data) }),
  },

  // STEM
  stem: {
    getOverview: () => request<any>('/stem/overview'),
    getQuestions: (params?: { subject?: string; topicId?: string; difficulty?: string; count?: number }) => {
      const q = new URLSearchParams();
      if (params?.subject) q.append('subject', params.subject);
      if (params?.topicId) q.append('topicId', params.topicId);
      if (params?.difficulty) q.append('difficulty', params.difficulty);
      if (params?.count) q.append('count', params.count.toString());
      return request<any>(`/stem/questions?${q.toString()}`);
    },
    submit: (answers: { questionId: string; selectedKey: string }[]) =>
      request<any>('/stem/submit', { method: 'POST', body: JSON.stringify({ answers }) }),
  },

  // Logic
  logic: {
    getQuestions: (count?: number, topicId?: string) =>
      request<any>(`/logic/questions?count=${count || 10}${topicId ? `&topicId=${topicId}` : ''}`),
    submit: (answers: { questionId: string; selectedKey: string }[], timeSpentSec: number) =>
      request<any>('/logic/submit', { method: 'POST', body: JSON.stringify({ answers, timeSpentSec }) }),
  },

  // Personality
  personality: {
    getQuestions: () => request<any>('/personality/questions'),
    submit: (responses: { questionId: string; score: number }[]) =>
      request<any>('/personality/submit', { method: 'POST', body: JSON.stringify({ responses }) }),
  },

  // Mock Exams
  exams: {
    start: (params: { examType: string; questionCount: number; timeLimitMinutes: number }) =>
      request<any>('/exams/start', { method: 'POST', body: JSON.stringify(params) }),
    saveDraftAnswer: (sessionId: string, data: { questionId: string; selectedKey: string }) =>
      request<any>(`/exams/${sessionId}/save-answer`, { method: 'POST', body: JSON.stringify(data) }),
    submit: (sessionId: string, data: { answers: { questionId: string; selectedKey: string }[]; timeSpentSec: number }) =>
      request<any>(`/exams/${sessionId}/submit`, { method: 'POST', body: JSON.stringify(data) }),
    getHistory: () => request<any>('/exams/history'),
    getReview: (sessionId: string) => request<any>(`/exams/${sessionId}/review`),
  },

  // Analytics
  analytics: {
    getStats: () => request<any>('/analytics'),
  },

  // Admin
  admin: {
    getOverview: () => request<any>('/admin/overview'),
    getUsers: (params?: { page?: number; limit?: number; search?: string }) => {
      const q = new URLSearchParams();
      if (params?.page) q.append('page', params.page.toString());
      if (params?.limit) q.append('limit', params.limit.toString());
      if (params?.search) q.append('search', params.search);
      return request<any>(`/admin/users?${q.toString()}`);
    },
    updateUserRole: (id: string, role: string) =>
      request<any>(`/admin/users/${id}/role`, { method: 'PUT', body: JSON.stringify({ role }) }),
    grantGift: (data: {
      targetUserId: string;
      addCoins?: number;
      setCoins?: number;
      addGems?: number;
      setGems?: number;
      addXp?: number;
      setXp?: number;
      addStreak?: number;
      setStreak?: number;
      resetStreak?: boolean;
      resetGiftCooldown?: boolean;
      setGiftClaimed?: boolean;
      setVip?: boolean;
      unlockDragonSet?: boolean;
      revokeDragonSet?: boolean;
      reason?: string;
    }) => request<any>('/admin/gifts', { method: 'POST', body: JSON.stringify(data) }),
    createQuestion: (data: any) => request<any>('/admin/questions', { method: 'POST', body: JSON.stringify(data) }),
    batchImportQuestions: (questions: any[]) =>
      request<any>('/admin/questions/batch-import', { method: 'POST', body: JSON.stringify({ questions }) }),
    createVocab: (data: any) => request<any>('/admin/vocabulary', { method: 'POST', body: JSON.stringify(data) }),
    updateVocab: (id: string, data: any) =>
      request<any>(`/admin/vocabulary/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    deleteVocab: (id: string) => request<any>(`/admin/vocabulary/${id}`, { method: 'DELETE' }),
  },

  // Wardrobe & Gamification
  wardrobe: {
    getWardrobe: () => request<any>('/wardrobe'),
    buyItem: (itemId: string) => request<any>('/wardrobe/buy', { method: 'POST', body: JSON.stringify({ itemId }) }),
    equipItem: (category: 'head' | 'armor' | 'weapon' | 'shoes', itemId: string) =>
      request<any>('/wardrobe/equip', { method: 'POST', body: JSON.stringify({ category, itemId }) }),
    claimDaily: () => request<any>('/wardrobe/claim-daily', { method: 'POST' }),
    topup: (packageId: string, options?: { paymentMethod?: string; transferRef?: string }) =>
      request<any>('/wardrobe/topup', { method: 'POST', body: JSON.stringify({ packageId, ...options }) }),
    adminAdjust: (data: {
      targetUserId?: string;
      addXp?: number;
      setLevel?: number;
      addGems?: number;
      addCoins?: number;
      setVip?: boolean;
      unlockAll?: boolean;
      resetToLevelZero?: boolean;
    }) => request<any>('/wardrobe/admin/adjust', { method: 'POST', body: JSON.stringify(data) }),
  },
};
