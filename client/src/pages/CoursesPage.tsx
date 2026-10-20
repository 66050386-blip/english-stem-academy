import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Course, CourseModule, Lesson } from '../types';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Filter,
  Search,
  BookCheck,
  Server,
  Briefcase,
  Globe,
  Sparkles,
} from 'lucide-react';

interface CoursesPageProps {
  onSelectLesson: (lessonId: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onSelectLesson }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  useEffect(() => {
    loadCourses();
  }, [selectedCategory]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const cat = selectedCategory === 'ALL' ? undefined : selectedCategory;
      const data = await api.courses.getCourses(cat);
      setCourses(data);
      if (data.length > 0 && !activeCourse) {
        // default select first course
        loadCourseDetail(data[0].id);
      }
    } catch (err) {
      console.error('Failed to load courses', err);
    } finally {
      setLoading(false);
    }
  };

  const loadCourseDetail = async (courseId: string) => {
    try {
      const detail = await api.courses.getCourseDetail(courseId);
      setActiveCourse(detail);
    } catch (err) {
      console.error('Failed to load course detail', err);
    }
  };

  const categories = [
    { id: 'ALL', label: 'ทั้งหมด', icon: Globe },
    { id: 'WORKPLACE', label: 'Workplace English (15 บท)', icon: Briefcase },
    { id: 'DATA_CENTER', label: 'Data Center English (10 บท)', icon: Server },
    { id: 'GENERAL', label: 'General English (A1-B2)', icon: BookOpen },
  ];

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.titleTh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            หลักสูตรและบทเรียน (Courses & Lessons)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            เรียนรู้ภาษาอังกฤษสำหรับงานเทคนิคและ Data Center ตั้งแต่พื้นฐานจนถึงการปฏิบัติงานจริง
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาบทเรียน, หัวข้อ..."
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                active
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Course Grid & Modules split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Course Cards */}
        <div className="space-y-4 lg:col-span-5">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            รายชื่อหลักสูตร ({filteredCourses.length})
          </h2>

          {loading ? (
            <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500">ไม่พบหลักสูตรที่ตรงกับเงื่อนไข</p>
            </div>
          ) : (
            filteredCourses.map((course) => {
              const isSelected = activeCourse?.id === course.id;
              const percent = course.progressPercent || 0;
              return (
                <div
                  key={course.id}
                  onClick={() => loadCourseDetail(course.id)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50/50 shadow-md ring-2 ring-primary-500/20 dark:border-primary-500/50 dark:bg-primary-950/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {course.level}
                        </span>
                        <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                          {course.category}
                        </span>
                      </div>
                      <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                        {course.titleTh}
                      </h3>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {course.title}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                      <BookCheck className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-xs text-slate-600 dark:text-slate-400">
                    {course.description}
                  </p>

                  {/* Progress & Meta */}
                  <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.completedLessons || 0} / {course.totalLessons || 0} บทเรียน
                      </span>
                      <span className="font-semibold text-primary-600 dark:text-primary-400">
                        {percent}% สำเร็จ
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-primary-600 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Module & Lesson Tree */}
        <div className="lg:col-span-7">
          {activeCourse ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                    {activeCourse.category}
                  </span>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>ประมาณ {activeCourse.totalDurationMin || 120} นาที</span>
                  </div>
                </div>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                  {activeCourse.titleTh}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeCourse.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  {activeCourse.description}
                </p>
              </div>

              {/* Modules list */}
              <div className="mt-6 space-y-6">
                {activeCourse.modules && activeCourse.modules.length > 0 ? (
                  activeCourse.modules.map((module, mIdx) => (
                    <div key={module.id} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                          โมดูล {mIdx + 1}: {module.titleTh} ({module.title})
                        </h4>
                        <span className="text-[11px] text-slate-400">
                          {module.lessons?.length || 0} บท
                        </span>
                      </div>

                      <div className="space-y-2">
                        {module.lessons?.map((lesson) => {
                          const isDone = lesson.isCompleted;
                          return (
                            <div
                              key={lesson.id}
                              onClick={() => onSelectLesson(lesson.id)}
                              className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 transition-all hover:border-primary-300 hover:bg-white hover:shadow-sm dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-primary-500/40 dark:hover:bg-slate-800/60"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                                    isDone
                                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400'
                                      : 'bg-slate-200/80 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                  }`}
                                >
                                  {isDone ? (
                                    <CheckCircle2 className="h-4 w-4" />
                                  ) : (
                                    <BookOpen className="h-4 w-4" />
                                  )}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h5 className="text-xs font-bold text-slate-800 group-hover:text-primary-600 dark:text-slate-200 dark:group-hover:text-primary-400">
                                      {lesson.titleTh}
                                    </h5>
                                    {isDone && (
                                      <span className="rounded bg-emerald-100 px-1.5 py-0.2 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                                        สำเร็จแล้ว
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400">{lesson.title}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-500">
                                  <Sparkles className="h-3 w-3" />
                                  +{lesson.xpReward} XP
                                </span>
                                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                                  <Clock className="h-3 w-3" />
                                  {lesson.durationMin}m
                                </span>
                                <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-600" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">ยังไม่มีเนื้อหาในหลักสูตรนี้</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-96 flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
              <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-700" />
              <p className="mt-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                เลือกหลักสูตรทางซ้ายมือเพื่อดูเนื้อหาบทเรียน
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
