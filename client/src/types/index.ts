export interface User {
  id: string;
  name: string;
  email: string;
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN';
  profile?: {
    englishLevel: string;
    targetTrack: string;
    dailyGoalMinutes: number;
    avatar?: string;
    bio?: string;
    uiLanguage?: string;
    equippedHead?: string;
    equippedArmor?: string;
    equippedWeapon?: string;
    equippedShoes?: string;
    unlockedItems?: string;
  };
  statistics?: {
    xp: number;
    level: number;
    gems?: number;
    coins?: number;
    isVip?: boolean;
    rankTitle?: string;
    rankTitleTh?: string;
    vocabMastered: number;
    lessonsCompleted: number;
    quizzesTaken: number;
    examsTaken: number;
    averageScore?: number;
  };
  streak?: {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
    lastClaimDate?: string;
  };
  achievements?: Achievement[];
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  titleTh: string;
  description: string;
  descriptionTh: string;
  icon: string;
  xpReward: number;
}

export interface Course {
  id: string;
  title: string;
  titleTh: string;
  description: string;
  category: string;
  level: string;
  thumbnail?: string;
  modulesCount?: number;
  totalLessons?: number;
  completedLessons?: number;
  progressPercent?: number;
  totalDurationMin?: number;
  modules?: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  titleTh: string;
  description?: string;
  orderIndex: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId?: string;
  title: string;
  titleTh: string;
  type: string;
  durationMin: number;
  xpReward: number;
  orderIndex: number;
  isCompleted?: boolean;
  progress?: { isCompleted: boolean; timeSpentSec: number }[];
  contents?: LessonContent[];
  quizzes?: any[];
}

export interface LessonContent {
  id: string;
  sectionType: string;
  title?: string;
  titleTh?: string;
  body: string;
  bodyTh?: string;
  audioUrl?: string;
  imageUrl?: string;
}

export interface Vocabulary {
  id: string;
  word: string;
  ipa?: string;
  partOfSpeech: string;
  meaningTh: string;
  meaningEn?: string;
  level: string;
  category: string;
  exampleEn: string;
  exampleTh: string;
  audioUrl?: string;
  isBookmarked?: boolean;
  reviewStatus?: {
    repetitions: number;
    intervalDays: number;
    nextReviewDate: string;
    isMastered: boolean;
  } | null;
  repetitions?: number;
  easeFactor?: number;
  intervalDays?: number;
}

export interface QuestionOption {
  id?: string;
  optionKey: string;
  contentEn: string;
  contentTh?: string;
  isCorrect?: boolean;
}

export interface Question {
  id: string;
  categoryId?: string;
  categoryName?: string;
  topicName?: string;
  questionText: string;
  questionTextTh?: string;
  questionType?: string;
  difficulty?: string;
  explanationTh?: string;
  formulaUsed?: string;
  audioUrl?: string;
  imageUrl?: string;
  contextEn?: string;
  contextTh?: string;
  options: QuestionOption[];
}
