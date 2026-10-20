"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesData = void 0;
exports.coursesData = [
    // 1. GENERAL ENGLISH & GRAMMAR
    {
        title: 'Essential English & Grammar for Technicians',
        titleTh: 'ภาษาอังกฤษพื้นฐานและไวยากรณ์สำหรับช่างเทคนิค',
        description: 'Master core English grammar, vocabulary structures, and sentence formation from A1 to B2 level.',
        category: 'GENERAL_ENGLISH',
        level: 'A1-B2',
        modules: [
            {
                title: 'Foundations of Sentence Structure',
                titleTh: 'โครงสร้างประโยคพื้นฐานและ Parts of Speech',
                lessons: [
                    {
                        title: 'Parts of Speech in Technical Context',
                        titleTh: 'หน้าที่ของคำในบริบทงานช่าง (Nouns, Verbs, Adjectives)',
                        type: 'GRAMMAR',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Parts of Speech Overview',
                                titleTh: 'ภาพรวมของหน้าที่คำในภาษาอังกฤษ',
                                body: 'Every English sentence is built from parts of speech: Nouns (equipment, technician), Verbs (inspect, operate), Adjectives (faulty, redundant), and Adverbs (safely, immediately). Understanding word forms helps you interpret technical manuals accurately.',
                                bodyTh: 'ประโยคภาษาอังกฤษทุกประโยคประกอบด้วยส่วนของคำ เช่น คำนาม (อุปกรณ์, ช่าง), คำกริยา (ตรวจสอบ, ใช้งาน), คำคุณศัพท์ (ชำรุด, สำรอง), และคำกริยาวิเศษณ์ (อย่างปลอดภัย, ทันที) การเข้าใจหน้าที่คำช่วยให้อ่านคู่มือเทคนิคได้ถูกต้องแม่นยำ',
                            },
                            {
                                sectionType: 'RULE',
                                title: 'Word Formation: Verb to Noun',
                                titleTh: 'การเปลี่ยนรูปคำ: จากกริยาเป็นคำนาม',
                                body: '- inspect (v.) -> inspection (n.)\n- maintain (v.) -> maintenance (n.)\n- distribute (v.) -> distribution (n.)\n- generate (v.) -> generator (n.)',
                                bodyTh: 'สังเกต suffix ที่พบบ่อยในงานวิศวกรรม เช่น -tion (การตรวจสอบ, การบำรุงรักษา) หรือ -or/-er (ผู้ทำ/อุปกรณ์)',
                            },
                        ],
                    },
                    {
                        title: 'Present Simple vs Present Continuous in Operations',
                        titleTh: 'Present Simple และ Present Continuous ในงานซ่อมบำรุง',
                        type: 'GRAMMAR',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Usage Differences',
                                titleTh: 'ความแตกต่างในการใช้งาน',
                                body: 'Use **Present Simple** for permanent facts, routines, and specifications: *The backup generator runs on diesel.*\nUse **Present Continuous** for ongoing activities and current states: *The technician is checking the PDU voltage right now.*',
                                bodyTh: 'Present Simple ใช้สำหรับความจริง กฎเกณฑ์ สเปคอุปกรณ์ หรือตารางงานประจำ เช่น เครื่องกำเนิดไฟฟ้าใช้น้ำมันดีเซล\nPresent Continuous ใช้สำหรับสิ่งที่กำลังเกิดขึ้นขณะนี้ เช่น ช่างกำลังตรวจวัดแรงดัน PDU อยู่ในขณะนี้',
                            },
                        ],
                    },
                    {
                        title: 'Past Simple & Incident Timelines',
                        titleTh: 'Past Simple และการบันทึกเวลาเหตุการณ์ย้อนหลัง',
                        type: 'GRAMMAR',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Reporting Past Incidents',
                                titleTh: 'การรายงานเหตุการณ์ในอดีต',
                                body: 'When logging maintenance or reporting an alert, use Past Simple: *The breaker tripped at 04:15 AM.* *We replaced the air filter yesterday.*',
                                bodyTh: 'เมื่อบันทึกงานซ่อมหรือเขียนรายงานเหตุการณ์ ให้ใช้ Past Simple สำหรับสิ่งที่จบลงแล้ว เช่น เบรกเกอร์ตัดวงจรเมื่อเวลา 04:15 น. หรือ เราเปลี่ยนไส้กรองอากาศเมื่อวานนี้',
                            },
                        ],
                    },
                    {
                        title: 'Passive Voice in Technical Manuals',
                        titleTh: 'Passive Voice ในคู่มือปฏิบัติงานและมาตรฐานความปลอดภัย',
                        type: 'GRAMMAR',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Object + is/are/was/were + V.3',
                                titleTh: 'โครงสร้าง Passive Voice: ประธานถูกกระทำ',
                                body: 'Technical manuals emphasize the object or equipment rather than who performed the action: *Power must be disconnected before opening the enclosure.* *All alarms are monitored 24/7.*',
                                bodyTh: 'คู่มือทางเทคนิคนิยมเน้นที่ตัวอุปกรณ์มากกว่าผู้กระทำ เช่น ต้องตัดกระแสไฟฟ้าก่อนเปิดตู้ หรือ สัญญาณเตือนทั้งหมดได้รับการเฝ้าระวังตลอด 24 ชั่วโมง',
                            },
                        ],
                    },
                    {
                        title: 'Conditionals (If-clauses) for Safety & Troubleshooting',
                        titleTh: 'ประโยคเงื่อนไข (Conditionals) ในระบบความปลอดภัย',
                        type: 'GRAMMAR',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'RULE',
                                title: 'Zero & First Conditionals',
                                titleTh: 'เงื่อนไขแบบ Zero และ First Conditional',
                                body: '**Zero Conditional (Scientific Fact):** If temperature rises above 35°C, the secondary chiller activates automatically.\n**First Conditional (Real Possibility):** If the breaker trips again, we will replace the transformer.',
                                bodyTh: 'Zero Conditional ใช้กับหลักการทำงานอัตโนมัติหรือความจริงทางวิทยาศาสตร์\nFirst Conditional ใช้กับสถานการณ์ที่มีโอกาสเกิดขึ้นจริงในอนาคตและการแก้ปัญหา',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // 2. WORKPLACE ENGLISH (15 Modules required in section 8)
    {
        title: 'Workplace English for Engineering & Tech',
        titleTh: 'ภาษาอังกฤษสำหรับการทำงานในสายงานช่างและเทคโนโลยี (15 บท)',
        description: 'Comprehensive 15-module curriculum covering self-introductions, interviews, problem reporting, email writing, meetings, and shift handover.',
        category: 'WORKPLACE',
        level: 'ALL',
        modules: [
            {
                title: 'Professional Communication (Part 1)',
                titleTh: 'การสื่อสารในที่ทำงาน (ชุดที่ 1)',
                lessons: [
                    {
                        title: '1. Introducing Yourself & Background',
                        titleTh: '1. การแนะนำตนเองและประวัติการทำงาน',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'DIALOGUE',
                                title: 'Self-Introduction Script',
                                titleTh: 'บทสนทนาการแนะนำตนเอง',
                                body: '"Good morning everyone, my name is Somchai. I have a vocational diploma in Electrical Engineering and two years of experience in facility maintenance."',
                                bodyTh: '"สวัสดีตอนเช้าครับทุกคน ผมชื่อสมชาย จบการศึกษาระดับ ปวส. สาขาช่างไฟฟ้ากำลัง และมีประสบการณ์ 2 ปีในการดูแลระบบอาคารและวิศวกรรมอาคารครับ"',
                            },
                        ],
                    },
                    {
                        title: '2. Job Interviews for Technical Roles',
                        titleTh: '2. การสัมภาษณ์งานตำแหน่งช่างเทคนิค',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Common Technical Interview Questions',
                                titleTh: 'คำถามสัมภาษณ์งานสายเทคนิคที่พบบ่อย',
                                body: 'Q: How do you handle emergency power outages?\nA: First, I verify that the automatic transfer switch (ATS) has started the standby generator, then check UPS battery levels.',
                                bodyTh: 'ถาม: คุณจัดการอย่างไรเมื่อเกิดไฟฟ้าดับฉุกเฉิน?\nตอบ: ขั้นแรกผมจะตรวจสอบว่า ATS สั่งสตาร์ทเครื่องกำเนิดไฟฟ้าสำรองเรียบร้อยหรือไม่ จากนั้นตรวจสอบสถานะแบตเตอรี่ UPS ทันที',
                            },
                        ],
                    },
                    {
                        title: '3. Workplace Communication & Etiquette',
                        titleTh: '3. มารยาทและการสื่อสารอย่างมืออาชีพ',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Polite Requests and Clarifications',
                                titleTh: 'การขอร้องและการขอคำชี้แจงอย่างสุภาพ',
                                body: 'Use polite modals: "Could you please send me the latest checklist?" instead of "Give me the checklist."',
                                bodyTh: 'ใช้คำกริยาช่วยที่สุภาพ เช่น "Could you please..." เพื่อความเป็นมืออาชีพในองค์กรข้ามชาติ',
                            },
                        ],
                    },
                    {
                        title: '4. Talking to Supervisors & Team Leaders',
                        titleTh: '4. การรายงานและพูดคุยกับหัวหน้างาน',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'DIALOGUE',
                                title: 'Status Update with Lead Engineer',
                                titleTh: 'การรายงานความคืบหน้างานต่อหัวหน้า',
                                body: 'Technician: "Sir, we have finished the quarterly inspection on Cooling Tower 2. All parameters are within normal thresholds."',
                                bodyTh: 'ช่างเทคนิค: "หัวหน้าครับ พวกเราตรวจสอบ Cooling Tower 2 ประจำไตรมาสเสร็จแล้วครับ ค่าพารามิเตอร์ทุกตัวอยู่ในเกณฑ์ปกติครับ"',
                            },
                        ],
                    },
                    {
                        title: '5. Asking for Help & Clarification',
                        titleTh: '5. การขอความช่วยเหลือและการถามซ้ำเมื่อไม่เข้าใจ',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Phrases for Clarification',
                                titleTh: 'ประโยคสำหรับถามซ้ำอย่างมืออาชีพ',
                                body: '- "Could you please rephrase that?"\n- "Just to confirm, should I shut down breaker B or breaker C first?"\n- "Could you demonstrate that step once more?"',
                                bodyTh: 'ในงานด้านวิศวกรรม หากไม่แน่ใจให้ถามยืนยันทันทีเพื่อความปลอดภัย ห้ามเดาขั้นตอนเอง',
                            },
                        ],
                    },
                    {
                        title: '6. Giving Instructions & Standard Operating Procedures',
                        titleTh: '6. การให้คำแนะนำและขั้นตอน SOP',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Sequence Markers',
                                titleTh: 'คำเชื่อมบอกลำดับขั้นตอน',
                                body: 'First, put on your PPE. Next, verify zero voltage using a multimeter. Then, lock out and tag out (LOTO) the circuit breaker. Finally, begin wire replacement.',
                                bodyTh: 'การอธิบายขั้นตอนทีละสเต็ป (First, Next, Then, Finally) เป็นหัวใจสำคัญในการปฏิบัติตามมาตรฐาน SOP',
                            },
                        ],
                    },
                    {
                        title: '7. Reporting Problems & Abnormalities',
                        titleTh: '7. การรายงานความผิดปกติของเครื่องจักร',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Describing Abnormal Signs',
                                titleTh: 'คำศัพท์ระบุอาการผิดปกติ',
                                body: '- The motor is making an unusual vibrating noise.\n- We noticed a small fluid leakage underneath Chiller unit 3.\n- The temperature reading is fluctuating erratically.',
                                bodyTh: 'ระบุตำแหน่ง เสียง กลิ่น การรั่วซึม หรือค่าที่ผิดปกติอย่างชัดเจน',
                            },
                        ],
                    },
                    {
                        title: '8. Scheduling & Organizing Meetings',
                        titleTh: '8. การนัดหมายและการประชุมงานบำรุงรักษา',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 25,
                        contents: [
                            {
                                sectionType: 'DIALOGUE',
                                title: 'Maintenance Window Scheduling',
                                titleTh: 'การนัดช่วงเวลาปิดปรับปรุงระบบ',
                                body: '"We need to schedule a 2-hour maintenance window during off-peak hours, preferably Sunday 02:00 AM."',
                                bodyTh: '"เราจำเป็นต้องนัดช่วงเวลาบำรุงรักษา 2 ชั่วโมงในช่วงที่มีการใช้งานต่ำสุด แนะนำเป็นวันอาทิตย์เวลา 02:00 น. ครับ"',
                            },
                        ],
                    },
                    {
                        title: '9. Writing Professional Emails',
                        titleTh: '9. การเขียนอีเมลติดต่อประสานงาน',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Standard Structure of Technical Email',
                                titleTh: 'โครงสร้างมาตรฐานของอีเมลงานช่าง',
                                body: 'Subject: Urgent - UPS Battery Replacement Required in Data Hall B\n\nDear Team,\nThis is to notify you that Battery Rack #4 in Data Hall B requires immediate replacement...\n\nBest regards,\nOperations Team',
                                bodyTh: 'หัวเรื่องต้องระบุความเร่งด่วน อุปกรณ์ และสถานที่ให้ชัดเจนเสมอ',
                            },
                        ],
                    },
                    {
                        title: '10. Safety Communication & Warnings',
                        titleTh: '10. การสื่อสารด้านความปลอดภัยและป้ายเตือน',
                        type: 'WORKPLACE',
                        durationMin: 15,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Hazard Warnings',
                                titleTh: 'คำเตือนอันตรายในสถานที่ทำงาน',
                                body: 'DANGER: High Voltage. AUTHORIZED PERSONNEL ONLY.\nCAUTION: Hearing Protection Required in Generator Room.\nNOTICE: Keep This Area Clear of Obstructions at All Times.',
                                bodyTh: 'ทำความเข้าใจระดับความรุนแรงของคำเตือน DANGER (อันตรายถึงชีวิต), CAUTION (ระวังบาดเจ็บหรือเครื่องเสียหาย), NOTICE (ข้อกำหนดทั่วไป)',
                            },
                        ],
                    },
                    {
                        title: '11. Equipment Maintenance Procedures',
                        titleTh: '11. ภาษาอังกฤษในขั้นตอนการซ่อมบำรุงอุปกรณ์',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Preventive vs Corrective Maintenance',
                                titleTh: 'การบำรุงรักษาเชิงป้องกันและการแก้ไข',
                                body: 'Preventive maintenance (PM) is scheduled regularly to prevent failure. Corrective maintenance (CM) is performed to fix equipment that has already broken down.',
                                bodyTh: 'เข้าใจคำศัพท์ PM (ซ่อมบำรุงตามรอบ) และ CM (ซ่อมเมื่ออุปกรณ์เสียหาย)',
                            },
                        ],
                    },
                    {
                        title: '12. Technical Troubleshooting Discussions',
                        titleTh: '12. การสนทนาหาสาเหตุและวิเคราะห์ปัญหา',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 30,
                        contents: [
                            {
                                sectionType: 'DIALOGUE',
                                title: 'Root Cause Analysis Conversation',
                                titleTh: 'บทสนทนาการวิเคราะห์หาสาเหตุที่แท้จริง (Root Cause)',
                                body: 'Eng A: "What caused the server rack to overheat?"\nEng B: "The perforated tile in front of Rack 12 was misplaced, restricting cold air intake."',
                                bodyTh: 'การใช้คำถามเชิงวิเคราะห์ เช่น "What caused...?", "Have you verified the sensor calibration?"',
                            },
                        ],
                    },
                    {
                        title: '13. Shift Handover & Status Reports',
                        titleTh: '13. การส่งมอบเวรและการสรุปสถานะการทำงาน',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'DIALOGUE',
                                title: 'Day Shift to Night Shift Handover',
                                titleTh: 'บทสนทนาส่งเวรกลางวันสู่เวรกลางคืน',
                                body: '"Good evening. All systems are green except for Air Handling Unit 4, which is currently on bypass mode awaiting a new belt replacement."',
                                bodyTh: '"สวัสดีครับ ระบบทุกอย่างปกติเป็นสีเขียว ยกเว้น AHU-4 ที่กำลังเปิดโหมด bypass เพื่อรอเปลี่ยนสายพานเส้นใหม่ครับ"',
                            },
                        ],
                    },
                    {
                        title: '14. Incident Reporting & Escalation',
                        titleTh: '14. การเขียนรายงานเหตุการณ์ฉุกเฉินและการยกระดับปัญหา',
                        type: 'WORKPLACE',
                        durationMin: 25,
                        xpReward: 40,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Incident Report 5 Ws and 1 H',
                                titleTh: 'การสรุปรายงานเหตุการณ์ตามหลัก Who, What, When, Where, Why, How',
                                body: 'Always state time of occurrence, affected systems, immediate action taken, and current status.',
                                bodyTh: 'บันทึกเวลาที่เกิดเหตุ อุปกรณ์ที่ได้รับผลกระทบ การแก้ปัญหาเบื้องต้น และสถานะปัจจุบัน',
                            },
                        ],
                    },
                    {
                        title: '15. Technical Documentation & Logs',
                        titleTh: '15. การจัดทำเอกสารคู่มือทางเทคนิคและสมุดบันทึก',
                        type: 'WORKPLACE',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Accurate Logbook Entries',
                                titleTh: 'การลงบันทึกใน Logbook อย่างถูกต้องตามมาตรฐาน',
                                body: 'Use clear timestamps, serial numbers, engineer initials, and concise descriptions: "2026-10-19 09:30 - Replaced fuse F-102 on PDU-B. Voltage verified 230V steady. Signed: WD"',
                                bodyTh: 'บันทึกเวลา รหัสอุปกรณ์ ช่างผู้ปฏิบัติงาน และค่าที่วัดได้เสมอ',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    // 3. DATA CENTER TECHNICAL ENGLISH (10 Modules required in section 9)
    {
        title: 'Data Center Technical English & Facility Operations',
        titleTh: 'ภาษาอังกฤษเทคนิคดาต้าเซ็นเตอร์และการปฏิบัติการ (10 บท)',
        description: 'Specialized technical curriculum for Data Center Technicians, covering server racks, cooling, UPS, generators, power distribution, and BMS monitoring.',
        category: 'DATA_CENTER',
        level: 'INTERMEDIATE',
        modules: [
            {
                title: 'Data Center Core Infrastructure',
                titleTh: 'โครงสร้างพื้นฐานดาต้าเซ็นเตอร์',
                lessons: [
                    {
                        title: '1. What Is a Data Center & Facility Architecture',
                        titleTh: '1. สถาปัตยกรรมและโครงสร้างดาต้าเซ็นเตอร์',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Data Center Facility Overview',
                                titleTh: 'ภาพรวมของศูนย์ข้อมูล (Data Center Facility)',
                                body: 'A Data Center is a centralized facility housing servers, storage systems, and network infrastructure, supported by redundant power and precision cooling systems to ensure 99.999% uptime (Tier III/IV).',
                                bodyTh: 'ศูนย์ข้อมูล (Data Center) เป็นสถานที่รวมเซิร์ฟเวอร์ ระบบจัดเก็บข้อมูล และเครือข่าย โดยมีระบบไฟฟ้าสำรองและระบบปรับอากาศที่มีความแม่นยำสูงเพื่อรับประกันความต่อเนื่องในการทำงาน 99.999%',
                            },
                        ],
                    },
                    {
                        title: '2. Servers, Server Racks & Cable Management',
                        titleTh: '2. เซิร์ฟเวอร์ ตู้แร็ค และการจัดระเบียบสายสัญญาณ',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Rack Units (U) and Cable Pathways',
                                titleTh: 'หน่วยตู้แร็ค (1U = 1.75 นิ้ว) และรางสายสัญญาณ',
                                body: 'Standard server racks measure 42U or 48U in height. Proper cable management using overhead ladders and velcro ties prevents airflow blockage and accidental disconnects.',
                                bodyTh: 'ตู้แร็คมาตรฐานสูง 42U หรือ 48U การจัดระเบียบสายไฟและสายใยแก้วด้วยสายรัด velcro ป้องกันการกีดขวางทิศทางลมเย็น',
                            },
                        ],
                    },
                    {
                        title: '3. Cooling Systems & Airflow Management (Hot/Cold Aisle)',
                        titleTh: '3. การจัดการทิศทางลมร้อน-เย็น (Hot/Cold Aisle Containment)',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Containment Concepts',
                                titleTh: 'แนวคิดการกั้นแยกโซนลมเย็นและลมร้อน',
                                body: 'Cold air is supplied through perforated floor tiles to the front of server racks (Cold Aisle). Hot air exhausted from the rear of the servers is captured in the Hot Aisle and returned to the cooling units.',
                                bodyTh: 'ลมเย็นถูกส่งจากพื้นยกเข้าสู่ด้านหน้าตู้เซิร์ฟเวอร์ (Cold Aisle) ลมร้อนจากด้านหลังจะถูกดูดกลับไปปรับอุณหภูมิใหม่ (Hot Aisle)',
                            },
                        ],
                    },
                    {
                        title: '4. HVAC, Chillers & CRAH Units',
                        titleTh: '4. ระบบชิลเลอร์ ปรับอากาศ และ CRAH / CRAC',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Computer Room Air Handler (CRAH)',
                                titleTh: 'เครื่องปรับอากาศสำหรับห้องคอมพิวเตอร์',
                                body: 'CRAH units circulate chilled water from external chillers through coils to maintain server room temperature between 18°C and 27°C, complying with ASHRAE standards.',
                                bodyTh: 'หน่วย CRAH ใช้น้ำหล่อเย็นจากชิลเลอร์เพื่อควบคุมอุณหภูมิและความชื้นให้อยู่ในเกณฑ์มาตรฐาน ASHRAE',
                            },
                        ],
                    },
                    {
                        title: '5. UPS Systems & Battery Banks',
                        titleTh: '5. ระบบสำรองไฟฟ้าอัตโนมัติ (UPS) และชุดแบตเตอรี่',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Uninterruptible Power Supply (UPS)',
                                titleTh: 'ระบบไฟฟ้าสำรอง UPS แบบ Double Conversion',
                                body: 'The UPS conditions incoming utility power and provides instant battery power during outages until backup diesel generators synchronize and take load.',
                                bodyTh: 'UPS จ่ายไฟสำรองจากแบตเตอรี่ทันทีที่ไฟหลักตกหรือดับ จนกว่าเครื่องกำเนิดไฟฟ้าดีเซลจะสตาร์ทและรับโหลดเต็มที่',
                            },
                        ],
                    },
                    {
                        title: '6. Backup Diesel Generators & Fuel Systems',
                        titleTh: '6. เครื่องกำเนิดไฟฟ้าดีเซลสำรองและระบบน้ำมันเชื้อเพลิง',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Automatic Transfer Switch (ATS) & Generator',
                                titleTh: 'ระบบสวิตช์โอนย้ายแหล่งจ่ายไฟฟ้าอัตโนมัติ (ATS)',
                                body: 'In the event of utility grid failure, the ATS signals the standby diesel generators to start within 10 to 15 seconds, supplying critical facility power.',
                                bodyTh: 'สวิตช์ ATS จะส่งสัญญาณสตาร์ทเครื่องยนต์ดีเซลภายใน 10-15 วินาทีเมื่อไฟฟ้าหลวงดับ',
                            },
                        ],
                    },
                    {
                        title: '7. Power Distribution: Transformers, PDUs & Busways',
                        titleTh: '7. ระบบกระจายกำลังไฟฟ้า PDU และ Busway',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Power Distribution Units (PDUs)',
                                titleTh: 'ตู้จ่ายไฟ PDU และราง Busway เหนือแร็ค',
                                body: 'PDUs step down high voltage electricity and distribute power through circuit breakers to individual rack power strips (ePDUs) with A/B dual power redundancy.',
                                bodyTh: 'PDU กระจายกำลังไฟฟ้าสู่ตู้แร็คด้วยระบบสำรองไฟคู่สาย A และ สาย B (Redundancy)',
                            },
                        ],
                    },
                    {
                        title: '8. Network Fundamentals, Fiber Optics & Patch Panels',
                        titleTh: '8. ระบบเครือข่าย สายใยแก้วนำแสง และ Patch Panel',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Structured Cabling and Optical Transceivers',
                                titleTh: 'การเดินสายสัญญาณโครงสร้างและ Transceiver (SFP+/QSFP)',
                                body: 'Fiber optic cables (Single-mode and Multi-mode) terminate at patch panels in Main Distribution Areas (MDA), connecting top-of-rack (ToR) switches to core routers.',
                                bodyTh: 'สายไฟเบอร์ออปติกเชื่อมต่อระหว่างสวิตช์ประจำตู้ (ToR) ไปยัง Core Switch ผ่าน Patch Panel',
                            },
                        ],
                    },
                    {
                        title: '9. Building Management Systems (BMS) & Environmental Sensors',
                        titleTh: '9. ระบบจัดการอาคาร (BMS) และเซ็นเซอร์วัดสภาพแวดล้อม',
                        type: 'DATA_CENTER',
                        durationMin: 20,
                        xpReward: 35,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Telemetry, Temperature & Leak Detection',
                                titleTh: 'การวัดค่าระยะไกล อุณหภูมิ และสายตรวจจับน้ำรั่วซึม',
                                body: 'BMS monitors thousands of data points including temperature, relative humidity, water leak detection ropes, and fire suppression systems (VESDA).',
                                bodyTh: 'ระบบ BMS เฝ้าระวังอุณหภูมิ ความชื้นสัมพัทธ์ การรั่วไหลของน้ำ และระบบดับเพลิงชนิดตรวจจับควันเร็วมาก (VESDA)',
                            },
                        ],
                    },
                    {
                        title: '10. Preventive Maintenance & Equipment Troubleshooting',
                        titleTh: '10. แผนซ่อมบำรุงเชิงป้องกันและการแก้ไขปัญหาหน้างาน',
                        type: 'DATA_CENTER',
                        durationMin: 25,
                        xpReward: 40,
                        contents: [
                            {
                                sectionType: 'THEORY',
                                title: 'Thermal Imaging and Regular Inspections',
                                titleTh: 'การตรวจจับความร้อนด้วยกล้องอินฟราเรดและการตรวจเช็คประจำงวด',
                                body: 'Technicians use thermal imaging cameras to detect hot spots on electrical connections and verify fan vibration levels before component failure occurs.',
                                bodyTh: 'การใช้กล้องตรวจจับความร้อนค้นหาจุดหลวมหรือจุดที่มีอุณหภูมิสูงผิดปกติบนบัสบาร์ก่อนเกิดปัญหาไฟลัดวงจร',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
