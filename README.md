# English & STEM Learning Academy 🚀
### Data Center & Technical Engineering Preparation Platform

> **⚡ วิธีเริ่มใช้งานอย่างง่าย (Quick Start):**
> 1. ดับเบิ้ลคลิกไฟล์ `start.bat` หรือเปิดเทอร์มินัลแล้วพิมพ์คำสั่งเดียว:
>    ```bash
>    npm start
>    ```
> 2. เว็บไซต์จะเปิดอัตโนมัติที่: **http://localhost:4444**
> 3. บัญชีทดสอบ:
>    - **Admin:** `admin@academy.com` / รหัสผ่าน: `admin123`
>    - **Student:** `student@academy.com` / รหัสผ่าน: `student123`
>
> 💳 **ระบบเติมเงินธนาคารไทยพาณิชย์ (SCB):**
> - ธนาคาร: **ธนาคารไทยพาณิชย์ (SCB)**
> - เลขที่บัญชี: **`4150431812`** (รูปแบบ 415-043181-2)
> - ลิ้งค์ตรงสู่แอป SCB EASY และระบบสร้าง QR Code พร้อมในหน้าต่างเติมเงิน (Wardrobe)

---

## 🌟 ฟีเจอร์หลักของระบบ (Core Features)

1. **Learning Dashboard (แดชบอร์ดติดตามความคืบหน้า)**
   - คำนวณ Streak จำนวนวันที่เรียนต่อเนื่องอัตโนมัติ
   - ระบบเก็บค่าประสบการณ์ (XP) และปรับระดับ (Level) อัตโนมัติ
   - กราฟเรดาร์ความเชี่ยวชาญ 6 ด้าน (General English, Workplace, Technical DC, TOEIC, STEM, Logic) ด้วย Recharts
   - แสดงบทเรียนแนะนำ (Recommended Lessons) และประวัติการทำแบบทดสอบล่าสุด

2. **Courses & Interactive Lesson Viewer (หลักสูตร & บทเรียน 30 บท)**
   - **Workplace English (15 บทเรียน)**: การสื่อสารกับหัวหน้างาน การแจ้งเหตุฉุกเฉิน การส่งต่องาน Shift Handover
   - **Data Center Technical English (10 บทเรียน)**: ระบบทำความเย็น CRAC/CRAH, แหล่งจ่ายไฟสำรอง UPS & Generator, สายสัญญาณ Fiber Optic, ระบบดับเพลิง และความปลอดภัย LOTO
   - **General English A1–B2**: พื้นฐานการสื่อสารทั่วไป
   - ระบบอ่านออกเสียงสำเนียงภาษาอังกฤษด้วย Web Speech API (Text-to-Speech)
   - แบบทดสอบท้ายบท (Knowledge Check) ตรวจคำตอบแบบเรียลไทม์พร้อมคำอธิบายภาษาไทย และมอบ XP ทันที

3. **Vocabulary & SM-2 Spaced Repetition (คลังคำศัพท์ 347 คำ)**
   - แฟลชการ์ด 3D Flip Card พลิกดูคำแปลภาษาไทย ตัวอย่างประโยค และชนิดของคำ
   - บันทึกคำอ่านสัทอักษร (IPA) พร้อมปุ่มฟังเสียงอ่าน
   - อัลกอริทึม **SuperMemo-2 (SM-2)** คำนวณรอบทบทวนถัดไปตามคะแนนความจำ (Again, Hard, Good, Easy)
   - ตัวกรองตามระดับ CEFR (A1, A2, B1, B2) และหมวดหมู่
   - ระบบคัดกรองคำศัพท์ที่ต้องทบทวนวันนี้ (Due for Review) และแบบทดสอบคำศัพท์ (Vocab Quiz) 10 ข้อ

4. **5 English Skill Hubs (ศูนย์ฝึก 5 ทักษะภาษาอังกฤษ)**
   - **Grammar Practice**: บทเรียนไวยากรณ์ 10 หัวข้อ (Tenses, Passive Voice, Conditionals, Modals) พร้อมแบบฝึกหัดและคำอธิบายภาษาไทย
   - **Technical Listening**: จำลองสถานการณ์เสียงประกาศและบทสนทนาหน้างาน ปรับความเร็วเสียงได้ (0.75x, 1.0x, 1.25x) พร้อมปุ่มเปิด/ปิด Transcript และคำแปลภาษาไทย
   - **Speaking Practice**: บันทึกเสียงผ่านไมโครโฟนจริงด้วย Web Speech API Speech Recognition ตรวจจับคำพูดและเปรียบเทียบความถูกต้องคำต่อคำ (Rule-based Text Diff) ชี้จุดที่ออกเสียงตกหล่น
   - **Technical Reading**: ฝึกอ่านคู่มือ SOP, Incident Report, และ Technical Specs พร้อมคำแปลภาษาไทยแบบสลับดูได้
   - **Writing Practice**: 3 โหมด (เรียงประโยค Sentence Scramble, เติมคำในช่องว่าง Cloze, และ Incident/Maintenance Report Writer พร้อมระบบตรวจโครงสร้าง Rule-based)

5. **TOEIC Examination Center (Part 1–7)**
   - คลังข้อสอบ TOEIC 102 ข้อ ครอบคลุมพาร์ท 1 ถึง 7 (Photographs, Question-Response, Conversations, Short Talks, Incomplete Sentences, Text Completion, Reading Comprehension)
   - ป้องกันการโกงโดยการส่งคำตอบไปตรวจบนเซิร์ฟเวอร์ (Server-Side Grading)
   - วิเคราะห์จุดอ่อนแยกตามประเภทข้อผิดพลาด (Grammar, Vocabulary, Detail Trap, Inference)

6. **STEM & Technical Engineering Hub (100 ข้อ)**
   - ข้อสอบ 4 หมวด: วิทยาศาสตร์ (Science), เทคโนโลยี (Technology), วิศวกรรมไฟฟ้า & ทำความเย็น (Engineering), และคณิตศาสตร์ประยุกต์ (Mathematics)
   - แสดงสูตรคำนวณที่เกี่ยวข้อง (เช่น $P = V \times I$, $PUE = \text{Total Power}/\text{IT Power}$, กฎของโอห์ม)
   - เฉลยวิธีคิดอย่างละเอียดทีละขั้นตอนเป็นภาษาไทย

7. **Logical Reasoning & Mechanical Aptitude (50 ข้อ)**
   - ข้อสอบอนุกรมตัวเลข (Number Series)
   - ตรรกศาสตร์และการสรุปความ (Logical Deduction)
   - ความถนัดเชิงกลไกและมิติสัมพันธ์ (รอก คาน เฟือง ล้อหมุน)

8. **Personality & Work Attitude Assessment (50 ข้อ)**
   - แบบประเมินระดับ Likert 5 ระดับ ครอบคลุม 5 คุณลักษณะ: Teamwork, Detail Orientation, Adaptability, Problem Solving, และ Safety Mindset
   - กราฟเรดาร์สรุปคุณลักษณะส่วนบุคคลและข้อแนะนำความเหมาะสมกับสายงาน Data Center

9. **Mock Exam Simulator (ระบบจำลองการสอบจริง)**
   - เลือกแทร็กการสอบ (Comprehensive Mixed, TOEIC Focus, STEM Focus, Logic Focus)
   - ตั้งเวลาจับเวลาถอยหลัง (15, 30, 45, 60 นาที) พร้อมระบบส่งข้อสอบอัตโนมัติเมื่อหมดเวลา
   - บันทึกคำตอบแบบ Draft อัตโนมัติทุกคลิก
   - Question Palette แสดงสถานะข้อที่ตอบแล้ว ข้อที่ติดธงไว้ และข้อที่ยังไม่ตอบ
   - บันทึกประวัติการสอบทุกรอบ พร้อมโหมดเฉลยละเอียดทุกข้อ

10. **Admin Management Panel**
    - จัดการผู้ใช้งานและปรับเปลี่ยนสิทธิ์ (STUDENT, ADMIN)
    - เพิ่มข้อสอบใหม่ และระบบ **Batch Import ข้อสอบผ่าน JSON** พร้อมตัวตรวจสอบรูปแบบ
    - เพิ่ม แก้ไข และลบคำศัพท์ในระบบ

---

## 🛠️ Technology Stack

| ชั้นของระบบ (Layer) | เทคโนโลยีที่เลือกใช้ | รายละเอียด |
| :--- | :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite | โครงสร้าง Component แยกตามหน้าที่ พร้อม Type Safety 100% |
| **Styling** | Tailwind CSS | ธีมสี Professional Navy/Blue, Dark Mode & Light Mode |
| **UI Components** | Lucide React, Canvas-Confetti | ไอคอนมาตรฐานและเอฟเฟกต์แอนิเมชัน |
| **Data Visualization** | Recharts | กราฟเรดาร์ (Radar Chart) และกราฟแท่ง (Bar Chart) |
| **Audio & Speech** | Web Speech API | SpeechSynthesis (TTS) ปรับความเร็วได้ และ SpeechRecognition (STT) |
| **Backend** | Node.js, Express.js, TypeScript | RESTful API สถาปัตยกรรมแบบ Controller/Router แยกชัดเจน |
| **Database & ORM** | Prisma ORM, SQLite / PostgreSQL | โครงสร้าง Database Relational สมบูรณ์แบบ รองรับทั้ง Local SQLite (`dev.db`) และ PostgreSQL |
| **Security & Auth** | JWT (JSON Web Token), bcryptjs | เข้ารหัสผ่านอย่างปลอดภัย สิทธิ์การเข้าถึงแบบ Role-based (RBAC) |
| **Testing** | Vitest, Supertest | ทดสอบการทำงานของ RESTful API อัตโนมัติ |

---

## 📦 โครงสร้างโปรเจกต์ (Project Structure)

```
english-stem-academy/
├── package.json                   # Root package orchestration
├── README.md                      # เอกสารประกอบการติดตั้งและการใช้งาน
├── server/                        # Backend REST API
│   ├── package.json
│   ├── tsconfig.json
│   ├── prisma/
│   │   ├── schema.prisma          # SQLite schema สำหรับใช้งานทันที
│   │   ├── schema.postgresql.prisma # PostgreSQL production schema
│   │   ├── seed.ts                # Seed script สร้างข้อมูล 600+ รายการ
│   │   └── dev.db                 # SQLite ฐานข้อมูลจริง
│   └── src/
│       ├── index.ts               # จุดเริ่มต้นเซิร์ฟเวอร์ Express
│       ├── lib/prisma.ts          # PrismaClient singleton
│       ├── middleware/auth.ts     # JWT Authentication & Role guard
│       ├── utils/sm2.ts           # อัลกอริทึม SuperMemo-2 Spaced Repetition
│       ├── utils/auth.ts          # bcrypt hash & JWT signing
│       ├── routes/
│       │   ├── auth.routes.ts
│       │   ├── dashboard.routes.ts
│       │   ├── course.routes.ts
│       │   ├── vocabulary.routes.ts
│       │   ├── practice.routes.ts
│       │   ├── toeic.routes.ts
│       │   ├── stem.routes.ts
│       │   ├── logic.routes.ts
│       │   ├── personality.routes.ts
│       │   ├── exam.routes.ts
│       │   ├── analytics.routes.ts
│       │   └── admin.routes.ts
│       └── __tests__/api.test.ts  # Automated unit & integration tests
└── client/                        # Frontend Single-Page Application
    ├── package.json
    ├── vite.config.ts             # Proxy API forwarder ไปยังเซิร์ฟเวอร์ :3333
    ├── tailwind.config.js
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx                # ตัวจัดการเราท์ติ้งและ State หลัก
        ├── context/
        │   ├── AuthContext.tsx    # จัดการเซสชันและข้อมูลผู้ใช้
        │   └── ThemeContext.tsx   # Dark/Light mode
        ├── services/api.ts        # Typed API Service Wrapper
        ├── utils/speech.ts        # Web Speech API TTS & STT
        ├── components/Layout/
        │   ├── Navbar.tsx         # แถบแสดงสถานะ Streak, Level, XP
        │   ├── Sidebar.tsx        # เมนูนำทางแบบแยกหมวดหมู่
        │   └── AppLayout.tsx
        └── pages/
            ├── AuthPage.tsx       # เข้าสู่ระบบ / สมัครสมาชิก (พร้อมปุ่ม 1-Click Demo)
            ├── DashboardPage.tsx  # หน้าแดชบอร์ดหลัก
            ├── CoursesPage.tsx    # รวมหลักสูตร 30 บท
            ├── LessonViewerPage.tsx # หน้าเรียนและทำแบบทดสอบประจำบท
            ├── VocabularyPage.tsx # แฟลชการ์ด 3D & อัลกอริทึม SM-2
            ├── GrammarPage.tsx    # แบบฝึกไวยากรณ์
            ├── ListeningPage.tsx  # เครื่องเล่นเสียงและแบบฝึกการฟัง
            ├── SpeakingPage.tsx   # บันทึกเสียงและวัดคะแนนความถูกต้อง
            ├── ReadingPage.tsx    # อ่านบทความและคู่มือเทคนิค
            ├── WritingPage.tsx    # เรียงประโยคและตรวจรายงาน
            ├── ToeicPage.tsx      # ฝึกสอบ TOEIC Part 1-7
            ├── StemPage.tsx       # คลังข้อสอบ STEM & สูตรคำนวณ
            ├── LogicPage.tsx      # ตรรกศาสตร์ & เชาวน์ปัญญา
            ├── PersonalityPage.tsx # แบบประเมินบุคลิกภาพ & เรดาร์ชาร์ต
            ├── MockExamPage.tsx   # จำลองการสอบจับเวลาจริง
            ├── AnalyticsPage.tsx  # วิเคราะห์ผลการเรียน
            └── AdminPage.tsx      # จัดการผู้ใช้และข้อสอบ
```

---

## 🚀 วิธีการติดตั้งและรันโปรเจกต์ (Installation & Setup)

### 1. ความต้องการของระบบ (Prerequisites)
- **Node.js**: เวอร์ชัน 18 ขึ้นไป
- **NPM**: เวอร์ชัน 9 ขึ้นไป
- **Web Browser**: Google Chrome หรือ Microsoft Edge (เพื่อรองรับการใช้งาน Web Speech API เต็มประสิทธิภาพ)

### 2. การติดตั้ง Dependencies
เปิดเทอร์มินัลในโฟลเดอร์โปรเจกต์:

```bash
# ติดตั้งฝั่ง Backend
cd server
npm install

# ติดตั้งฝั่ง Frontend
cd ../client
npm install
```

### 3. การเตรียมฐานข้อมูลและ Seed ข้อมูลเริ่มต้น
ฐานข้อมูลเริ่มต้นถูกตั้งค่าเป็น SQLite (`file:./dev.db`) เพื่อให้สามารถรันบนเครื่อง Windows ได้ทันทีโดยไม่ต้องติดตั้ง PostgreSQL Service เพิ่มเติม:

```bash
cd server

# ดัน Schema ขึ้นฐานข้อมูล
npx prisma db push

# รันสคริปต์สร้างข้อมูลจำลองและคลังข้อสอบ 600+ ข้อ
npm run seed
```

*(หมายเหตุ: หากต้องการใช้ PostgreSQL ให้แก้ไขไฟล์ `.env` ในโฟลเดอร์ `server` และใช้ `npx prisma db push --schema=prisma/schema.postgresql.prisma`)*

### 4. การรันเซิร์ฟเวอร์ (Development Mode)

สามารถเปิดรันทั้ง Backend และ Frontend พร้อมกันได้:

**รัน Backend Server (Port 3333):**
```bash
cd server
npm run dev
```

**รัน Frontend Client (Port 4444):**
```bash
cd client
npm run dev
```

เปิดเบราว์เซอร์ไปที่: **`http://localhost:4444`**

---

## 🔑 บัญชีผู้ใช้งานเริ่มต้น (Default Credentials)

สามารถกดปุ่ม **"กรอกข้อมูลทดสอบ (Demo)"** ในหน้าล็อกอิน หรือใช้ข้อมูลดังต่อไปนี้:

| บทบาท (Role) | บัญชี (Username / Email) | รหัสผ่าน (Password) | สิทธิ์การเข้าถึง |
| :--- | :--- | :--- | :--- |
| **แอดมิน (Admin)** | `admin` หรือ `admin@academy.local` | `1234` | เข้าถึงได้ทุกฟีเจอร์ รวมถึง Admin Panel, CRUD ข้อสอบ และจัดการผู้ใช้ |
| **นักเรียน (Student)** | `student` หรือ `student@academy.local` | `1234` | เข้าถึงบทเรียน แผนที่การเรียน แฟลชการ์ด ศูนย์ฝึก 5 ทักษะ TOEIC STEM และสอบจำลอง |

---

## 🧪 การรันแบบทดสอบอัตโนมัติ (Automated Tests)

เซิร์ฟเวอร์มาพร้อมกับ Unit & Integration Test ผ่าน Vitest ครอบคลุมการทำงานของ Auth, Spaced Repetition (SM-2), Courses, Flashcards, TOEIC, STEM, Logic, Speaking และ Mock Exams:

```bash
cd server
npm test
```

ผลลัพธ์: **11/11 Passed (100%)**

---

## 📡 สรุปรายการ RESTful API Endpoints

| หมวดหมู่ | Method | Endpoint | สิทธิ์ | รายละเอียด |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `POST` | `/api/auth/register` | Public | สมัครสมาชิกผู้ใช้ใหม่ |
| | `POST` | `/api/auth/login` | Public | เข้าสู่ระบบและรับ JWT Token |
| | `GET` | `/api/auth/me` | User | ดึงข้อมูลโปรไฟล์ สถิติ และ Streak ของตนเอง |
| **Dashboard** | `GET` | `/api/dashboard` | User | ดึงข้อมูลสถิติ เรดาร์ชาร์ต และบทเรียนแนะนำ |
| **Courses** | `GET` | `/api/courses` | User | รายการหลักสูตร แยกตามหมวดหมู่ |
| | `GET` | `/api/courses/lessons/:id` | User | ดึงเนื้อหาบทเรียนและแบบทดสอบท้ายบท |
| | `POST` | `/api/courses/lessons/:id/progress` | User | บันทึกการเรียนจบและรับรางวัล XP |
| **Vocabulary**| `GET` | `/api/vocabulary` | User | ค้นหาและกรองคำศัพท์ตาม CEFR และหมวด |
| | `GET` | `/api/vocabulary/due-reviews` | User | ดึงรายการคำศัพท์ที่ถึงกำหนดทบทวน SM-2 |
| | `POST` | `/api/vocabulary/:id/review` | User | ส่งผลประเมินความจำ (Again/Hard/Good/Easy) |
| | `GET` | `/api/vocabulary/quiz` | User | สร้างแบบทดสอบคำศัพท์ 10 ข้อ |
| **Practice** | `GET` | `/api/practice/grammar` | User | ดึงหัวข้อและข้อสอบไวยากรณ์ |
| | `GET` | `/api/practice/listening` | User | ดึงบทสนทนาและโจทย์การฟัง |
| | `GET` | `/api/practice/speaking/prompts` | User | ดึงประโยคฝึกพูดภาษาอังกฤษ |
| | `POST` | `/api/practice/speaking/evaluate` | User | ตรวจสอบการออกเสียงและประเมินความถูกต้อง |
| | `GET` | `/api/practice/reading` | User | ดึงคู่มือและเอกสารเทคนิคสำหรับฝึกอ่าน |
| | `POST` | `/api/practice/writing/evaluate-report` | User | ตรวจสอบโครงสร้างรายงานเทคนิคแบบ Rule-based |
| **TOEIC** | `GET` | `/api/toeic/overview` | User | สรุปจำนวนข้อสอบ TOEIC Part 1-7 |
| | `GET` | `/api/toeic/practice/:part` | User | ดึงข้อสอบประจำพาร์ท (ซ่อนเฉลย) |
| | `POST` | `/api/toeic/submit` | User | ตรวจข้อสอบ TOEIC บนเซิร์ฟเวอร์ |
| **STEM** | `GET` | `/api/stem/questions` | User | ดึงข้อสอบวิทย์-คณิต-วิศวกรรม |
| | `POST` | `/api/stem/submit` | User | ตรวจคำตอบ STEM และแสดงเฉลยวิธีทำ |
| **Logic** | `GET` | `/api/logic/questions` | User | ดึงข้อสอบตรรกศาสตร์และเชาวน์ปัญญา |
| | `POST` | `/api/logic/submit` | User | ตรวจข้อสอบตรรกศาสตร์ |
| **Personality**| `GET` | `/api/personality/questions` | User | ดึงแบบประเมิน 50 ข้อ |
| | `POST` | `/api/personality/submit` | User | วิเคราะห์บุคลิกภาพและสร้างเรดาร์ชาร์ต |
| **Exams** | `POST` | `/api/exams/start` | User | เริ่มการสอบจำลองจับเวลาจริง (ซ่อนเฉลย) |
| | `POST` | `/api/exams/:id/save-answer` | User | บันทึกคำตอบแบบ Draft อัตโนมัติ |
| | `POST` | `/api/exams/:id/submit` | User | ส่งข้อสอบ คำนวณเกรด และบันทึกประวัติ |
| | `GET` | `/api/exams/:id/review` | User | ดูเฉลยละเอียดทุกข้อหลังสอบเสร็จ |
| **Admin** | `GET` | `/api/admin/overview` | Admin | สถิติภาพรวมทั้งระบบ |
| | `GET` | `/api/admin/users` | Admin | รายชื่อผู้ใช้งานและการเปลี่ยนสิทธิ์ |
| | `POST` | `/api/admin/questions/batch-import`| Admin | นำเข้าข้อสอบชุดใหญ่ผ่าน JSON |
| | `POST` | `/api/admin/vocabulary` | Admin | เพิ่มคำศัพท์ใหม่เข้าสู่ระบบ |

---

## 🛡️ มาตรการความปลอดภัยและมาตรฐานทางวิศวกรรม

1. **Anti-Cheat Grading (การตรวจคำตอบฝั่งเซิร์ฟเวอร์)**
   - API สำหรับการสอบ (`/api/exams/start`, `/api/toeic/practice/:part`, `/api/stem/questions`) จะตัดเฉลย (`isCorrect`, `explanationTh`) ออกทั้งหมดก่อนส่งให้ Client ป้องกันไม่ให้นักเรียนเปิดดูเฉลยผ่าน Network Tab หรือ Inspect Element ได้
   - การคิดคะแนนและการเฉลยจะเกิดขึ้นเฉพาะเมื่อส่งคำตอบไปยัง Endpoint `/submit` เท่านั้น

2. **SuperMemo-2 (SM-2) Spaced Repetition Algorithm**
   - คำนวณช่วงเวลาการทบทวนคำศัพท์ตามระดับความจำ (Quality Score 0-5)
   - ปรับ Ease Factor ($EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$)
   - หากประเมินคะแนนต่ำกว่า 3 รอบทบทวนจะถูกรีเซ็ตกลับไปเริ่มต้นใหม่ เพื่อเสริมสร้างความจำระยะยาว

3. **Transparent Evaluation (การประเมินผลอย่างตรงไปตรงมา)**
   - การประเมินผลการพูด (Speaking) ระบุชัดเจนว่าเป็นระบบ Rule-based Text Diff จาก Web Speech API Transcription โดยไม่กล่าวอ้างว่าเป็น Phoneme-level AI หากไม่มีโมเดลเฉพาะทางรองรับ
   - การตรวจรายงาน (Writing) ใช้ Rule-based Structural Engine ตรวจสอบความยาวคำ, คีย์เวิร์ดทางเทคนิค, และองค์ประกอบโครงสร้างรายงาน
