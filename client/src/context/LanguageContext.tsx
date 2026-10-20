import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string, fallback?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    // Navigation & General
    appTitle: 'อคาเดมีภาษาอังกฤษและสะเต็ม',
    appSubtitle: 'เตรียมความพร้อมงานดาต้าเซ็นเตอร์และวิศวกรรม',
    dashboard: 'หน้าหลัก',
    courses: 'หลักสูตร',
    path: 'แผนที่การเรียน',
    vocabulary: 'คลังคำศัพท์',
    grammar: 'ไวยากรณ์',
    listening: 'การฟังหน้างาน',
    speaking: 'การพูดสื่อสาร',
    reading: 'การอ่านคู่มือ',
    writing: 'การเขียนรายงาน',
    toeic: 'ศูนย์สอบโทอิค',
    stem: 'ความถนัดสะเต็ม',
    logic: 'ตรรกศาสตร์',
    personality: 'แบบทดสอบบุคลิกภาพ',
    mockExam: 'จำลองการสอบ',
    analytics: 'สถิติการเรียน',
    wardrobe: 'ห้องแต่งตัวกุ้งมังกร',
    profile: 'ข้อมูลส่วนตัว',
    admin: 'ระบบจัดการหลังบ้าน',

    // Currencies & Gamification
    coins: 'เหรียญทอง',
    gems: 'อัญมณี',
    vipDragon: 'ยศวีไอพีมังกร',
    streak: 'วันต่อเนื่อง',
    lives: 'พลังชีวิต',
    level: 'เลเวล',
    xp: 'ค่าประสบการณ์',
    topup: 'เติมเงิน',
    addCoins: 'เติมเหรียญทอง',

    // Dashboard
    welcomeBack: 'ยินดีต้อนรับกลับมา',
    careerTitle: 'วิศวกรฝึกหัดดาต้าเซ็นเตอร์',
    continueLesson: 'เรียนต่อบทเรียนล่าสุด',
    dailyQuests: 'ภารกิจประจำวัน',
    completeOneLesson: 'เรียนจบอย่างน้อย 1 บท',
    reviewVocab: 'ทบทวนคำศัพท์สะสม 5 คำ',
    startReview: 'เริ่มทบทวนคำศัพท์ทันที',
    claimReward: 'รับรางวัล',
    leaderboard: 'ตารางอันดับผู้เรียน',
    radarTitle: 'ความเชี่ยวชาญ 6 ด้าน',
    dailyChest: 'หีบสมบัติประจำวัน',
    openChest: 'เปิดหีบรับของรางวัล',
    unit1Title: 'หน่วยที่ 1 • พื้นฐานงานวิศวกรรม',
    unit1Subtitle: 'ภาษาอังกฤษในที่ทำงานและโครงสร้างพื้นฐานดาต้าเซ็นเตอร์',

    // Actions & Buttons
    checkAnswer: 'ตรวจคำตอบ',
    continue: 'ถัดไป',
    back: 'ย้อนกลับ',
    finish: 'เสร็จสิ้น',
    tryAgain: 'ลองใหม่อีกครั้ง',
    correct: 'ถูกต้อง ยอดเยี่ยมมาก!',
    wrong: 'คำตอบที่ถูกต้องคือ',
    select: 'เลือก',
    close: 'ปิด',
    save: 'บันทึก',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    logout: 'ออกจากระบบ',

    // Admin & Gifts
    adminCenter: 'ศูนย์ควบคุมผู้ดูแลระบบ',
    adminOverview: 'ภาพรวมระบบที่แอดมินสามารถทำได้',
    grantGifts: 'มอบของขวัญให้ผู้เล่น',
    selectPlayer: 'เลือกผู้เล่นที่ต้องการมอบของขวัญ',
    sendGift: 'ส่งมอบของขวัญทันที',
    giftCoins: 'จำนวนเหรียญทองที่มอบ',
    giftGems: 'จำนวนอัญมณีที่มอบ',
    giftXp: 'จำนวนค่าประสบการณ์ที่มอบ',
    giftVip: 'เปิดสิทธิ์วีไอพีมังกร',
    giftDragonSet: 'มอบเซ็ตนักรบมังกรเพลิงครบชุด',
    giftReason: 'บันทึก/เหตุผลการมอบของขวัญ',
    manageCurriculum: 'จัดการหลักสูตรและบทเรียน',
    manageExams: 'คลังข้อสอบและนำเข้าชุดข้อมูล',
    manageUsers: 'รายชื่อผู้เรียนและระดับขั้น',
    allUsers: 'ผู้ใช้งานทั้งหมดในระบบ',
  },
  en: {
    // Navigation & General
    appTitle: 'English & STEM Academy',
    appSubtitle: 'Data Center & Engineering Preparation',
    dashboard: 'Dashboard',
    courses: 'Courses',
    path: 'Learning Path',
    vocabulary: 'Vocabulary',
    grammar: 'Grammar',
    listening: 'Technical Listening',
    speaking: 'Speaking Practice',
    reading: 'Technical Reading',
    writing: 'Report Writing',
    toeic: 'TOEIC Center',
    stem: 'STEM Aptitude',
    logic: 'Logic & Reasoning',
    personality: 'Personality Test',
    mockExam: 'Mock Exam',
    analytics: 'Analytics',
    wardrobe: 'Lobster Wardrobe',
    profile: 'Profile',
    admin: 'Admin Console',

    // Currencies & Gamification
    coins: 'Gold Coins',
    gems: 'Gems',
    vipDragon: 'VIP Dragon',
    streak: 'Day Streak',
    lives: 'Lives',
    level: 'Level',
    xp: 'Experience',
    topup: 'Top Up',
    addCoins: 'Top Up Coins',

    // Dashboard
    welcomeBack: 'Welcome Back',
    careerTitle: 'Data Center Trainee Engineer',
    continueLesson: 'Continue Lesson',
    dailyQuests: 'Daily Quests',
    completeOneLesson: 'Complete 1 lesson',
    reviewVocab: 'Review 5 vocabulary cards',
    startReview: 'Start Review Now',
    claimReward: 'Claim Reward',
    leaderboard: 'Leaderboard',
    radarTitle: '6 Skill Mastery Matrix',
    dailyChest: 'Daily Treasure Chest',
    openChest: 'Open Daily Chest',
    unit1Title: 'Unit 1 • Engineering Foundations',
    unit1Subtitle: 'Workplace English & Data Center Infrastructure',

    // Actions & Buttons
    checkAnswer: 'Check Answer',
    continue: 'Continue',
    back: 'Back',
    finish: 'Finish',
    tryAgain: 'Try Again',
    correct: 'Excellent! Correct Answer',
    wrong: 'The correct answer is',
    select: 'Select',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    logout: 'Sign Out',

    // Admin & Gifts
    adminCenter: 'Admin Control Center',
    adminOverview: 'Administrative Capabilities Overview',
    grantGifts: 'Grant Gifts to Players',
    selectPlayer: 'Select Target Player',
    sendGift: 'Send Gift Now',
    giftCoins: 'Coins to Grant',
    giftGems: 'Gems to Grant',
    giftXp: 'XP to Grant',
    giftVip: 'Grant VIP Dragon Status',
    giftDragonSet: 'Grant Full Dragon Warrior Gear Set',
    giftReason: 'Gift Reason / Note',
    manageCurriculum: 'Manage Courses & Curriculum',
    manageExams: 'Exam Bank & Batch Import',
    manageUsers: 'User Directory & Ranks',
    allUsers: 'All Registered Users',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'th',
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('academy_lang');
      return saved === 'en' ? 'en' : 'th';
    } catch {
      return 'th';
    }
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('academy_lang', lang);
    } catch {}
  };

  const toggleLanguage = () => {
    setLanguage(language === 'th' ? 'en' : 'th');
  };

  const t = (key: string, fallback?: string): string => {
    return translations[language]?.[key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
