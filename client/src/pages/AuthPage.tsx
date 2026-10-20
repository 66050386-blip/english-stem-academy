import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { DuoMascot, MascotMood } from '../components/Mascot/DuoMascot';
import { Sparkles, Shield, User, Lock, Mail, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [englishLevel, setEnglishLevel] = useState('A1');
  const [targetTrack, setTargetTrack] = useState('DATA_CENTER');
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [isSlashing, setIsSlashing] = useState(false);
  const [slashCount, setSlashCount] = useState(0);

  const handleMascotSlash = () => {
    setIsSlashing(true);
    setSlashCount((c) => c + 1);
    setTimeout(() => {
      setIsSlashing(false);
    }, 450);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setMascotMood('thinking');

    try {
      if (isRegister) {
        await register({ name, email, password, englishLevel, targetTrack });
      } else {
        await login(email, password);
      }
      setMascotMood('cheering');
    } catch (err: any) {
      setError(err.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      setMascotMood('sad');
    } finally {
      setLoading(false);
    }
  };

  // Instant 1-Click Login
  const handleQuickLogin = async (role: 'STUDENT' | 'ADMIN') => {
    setError(null);
    setLoading(true);
    setMascotMood('cheering');
    handleMascotSlash();

    const username = role === 'STUDENT' ? 'student' : 'admin';
    const pwd = '1234';

    setEmail(username);
    setPassword(pwd);

    try {
      await login(username, pwd);
    } catch (err: any) {
      setError(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
      setMascotMood('sad');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F9FA] dark:bg-[#0F172A] p-4 sm:p-6 select-none">
      <div className="w-full max-w-4xl">
        {/* Top Header Hero */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#58CC02] text-white shadow-duo shadow-[#46A302]">
              <Zap className="h-6 w-6 fill-white" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E293B] dark:text-white">
              English & STEM Academy
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
            เรียนภาษาอังกฤษช่างเทคนิค ฝึกสอบ TOEIC และวิศวกรรม Data Center ในรูปแบบ Interactive Gamified!
          </p>
        </div>

        {/* Mascot & Main Card Container */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left: Mascot & Speech Bubble */}
          <div className="flex flex-col items-center justify-center text-center lg:col-span-5">
            {/* Cartoon Speech Bubble */}
            <div className="relative mb-4 rounded-3xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 speech-bubble-bottom max-w-xs">
              <p className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-100">
                {isSlashing
                  ? '⚡ ย้ากกก! ฟันดาบผ่ามิติ! ⚔️💥 ก้ามเหล็กพร้อมลุยทุกข้อสอบ!'
                  : mascotMood === 'cheering'
                  ? '🎉 เย้! เข้าสู่ระบบสำเร็จแล้ว กำลังพาไปหน้าเรียน...'
                  : mascotMood === 'sad'
                  ? '🥺 อุ๊ย! รหัสผ่านไม่ถูกต้อง ลองกดปุ่ม 1-Click ด้านขวานะ!'
                  : mascotMood === 'thinking'
                  ? '🤔 กำลังตรวจสอบข้อมูลเซิร์ฟเวอร์...'
                  : '👋 ข้าคือน้องกุ้งนักดาบ (Lobster Warrior) ผู้พิทักษ์ Data Center! คลิกที่ตัวข้าเพื่อฟันดาบ ⚔️ หรือกดปุ่ม Student/Admin ด้านขวาเพื่อเข้าเรียนทันที!'}
              </p>
            </div>

            {/* Cartoon Mascot with Interactive Slash */}
            <div className="animate-float">
              <DuoMascot
                mood={mascotMood}
                stance={isSlashing ? 'slash' : 'ready'}
                size={185}
                isSlashing={isSlashing}
                interactiveSlash={true}
                onSlash={handleMascotSlash}
              />
            </div>

            {/* Interactive Slash Button */}
            <button
              type="button"
              onClick={handleMascotSlash}
              className="mt-2.5 flex items-center gap-1.5 rounded-full border-2 border-emerald-400 bg-emerald-50 px-3.5 py-1 text-xs font-black text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all shadow-sm dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300"
            >
              <span>⚔️ คลิกสั่งฟันดาบ!</span>
              {slashCount > 0 && (
                <span className="rounded-full bg-emerald-200 px-1.5 py-0.2 text-[10px] text-emerald-900 font-black">
                  {slashCount}
                </span>
              )}
            </button>

            {/* Account Quick Guide */}
            <div className="mt-4 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-100/60 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-300 max-w-xs">
              <p className="font-extrabold text-slate-800 dark:text-slate-200 mb-1">
                🔑 บัญชีทดสอบที่กำหนด:
              </p>
              <div className="space-y-0.5 text-left text-[11px]">
                <p>• <b>STUDENT:</b> รหัส <code className="bg-white px-1.5 py-0.5 rounded font-black text-[#58CC02] border border-slate-300 dark:bg-slate-900">1234</code></p>
                <p>• <b>ADMIN:</b> รหัส <code className="bg-white px-1.5 py-0.5 rounded font-black text-[#1CB0F6] border border-slate-300 dark:bg-slate-900">1234</code></p>
              </div>
            </div>
          </div>

          {/* Right: 1-Click Cards + Login Form */}
          <div className="lg:col-span-7 space-y-4">
            {/* 1-Click Instant Login Cards (Tactile 3D Buttons) */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  ⚡ ทางลัดเข้าใช้งานด่วน (1-Click Fast Login)
                </span>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                  รหัส 1234
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('STUDENT')}
                  disabled={loading}
                  className="group flex items-center justify-between p-3.5 rounded-2xl border-2 border-b-4 border-emerald-400 border-b-emerald-600 bg-emerald-50 hover:bg-emerald-100/80 active:border-b-2 active:translate-y-0.5 transition-all text-left dark:bg-emerald-950/30 dark:border-emerald-700 dark:border-b-emerald-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#58CC02] text-white shadow-duo shadow-[#46A302]">
                      <User className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-black text-emerald-900 dark:text-emerald-200">
                        เข้าใช้งานเป็น STUDENT
                      </p>
                      <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        user: student / pass: 1234
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-emerald-600 transition-transform group-hover:translate-x-1" />
                </button>

                {/* Admin Card */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('ADMIN')}
                  disabled={loading}
                  className="group flex items-center justify-between p-3.5 rounded-2xl border-2 border-b-4 border-blue-400 border-b-blue-600 bg-blue-50 hover:bg-blue-100/80 active:border-b-2 active:translate-y-0.5 transition-all text-left dark:bg-blue-950/30 dark:border-blue-700 dark:border-b-blue-900"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1CB0F6] text-white shadow-duo shadow-[#1899D6]">
                      <Shield className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-xs font-black text-blue-900 dark:text-blue-200">
                        เข้าใช้งานเป็น ADMIN
                      </p>
                      <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400">
                        user: admin / pass: 1234
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-blue-600 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Standard Login & Register Box */}
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              {/* Tab Switch */}
              <div className="flex rounded-2xl border-2 border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError(null);
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-extrabold transition-all ${
                    !isRegister
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  เข้าสู่ระบบ (Sign In)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setError(null);
                  }}
                  className={`flex-1 rounded-xl py-2 text-xs font-extrabold transition-all ${
                    isRegister
                      ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  สมัครสมาชิกใหม่ (Register)
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-2xl border-2 border-rose-300 bg-rose-50 p-3 text-xs font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
                  <span>❌ {error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                {isRegister && (
                  <div>
                    <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                      ชื่อ - นามสกุล
                    </label>
                    <div className="relative mt-1">
                      <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="สมชาย ใจดี"
                        className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:border-[#58CC02] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                    ชื่อผู้ใช้ หรือ อีเมล
                  </label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={isRegister ? 'yourname@example.com' : 'student หรือ admin'}
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:border-[#58CC02] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                      รหัสผ่าน
                    </label>
                    <span className="text-[10px] font-bold text-slate-400">
                      (รหัสคือ 1234)
                    </span>
                  </div>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••"
                      className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:border-[#58CC02] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  </div>
                </div>

                {isRegister && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                        ระดับภาษา
                      </label>
                      <select
                        value={englishLevel}
                        onChange={(e) => setEnglishLevel(e.target.value)}
                        className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="A1">A1 Beginner</option>
                        <option value="A2">A2 Elementary</option>
                        <option value="B1">B1 Intermediate</option>
                        <option value="B2">B2 Upper-Inter</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-black uppercase text-slate-600 dark:text-slate-300">
                        เป้าหมาย
                      </label>
                      <select
                        value={targetTrack}
                        onChange={(e) => setTargetTrack(e.target.value)}
                        className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2 px-3 text-xs font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      >
                        <option value="DATA_CENTER">Data Center</option>
                        <option value="TOEIC_600">TOEIC 600+</option>
                        <option value="STEM_ENGINEERING">STEM Engineer</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Submit 3D Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 btn-duo-green mt-2 text-sm shadow-md"
                >
                  {loading
                    ? 'กำลังเข้าสู่ระบบ...'
                    : isRegister
                    ? 'สร้างบัญชีผู้ใช้ใหม่'
                    : 'เข้าสู่ระบบ (Sign In)'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
