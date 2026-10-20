import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ExternalQuestion {
  categoryCode: string;
  topicName?: string;
  questionText: string;
  questionTextTh?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  errorType?: string;
  formulaUsed?: string;
  explanationTh: string;
  options: {
    optionKey: string;
    contentEn: string;
    contentTh?: string;
    isCorrect: boolean;
  }[];
}

const realQuestions: ExternalQuestion[] = [
  // =========================================================================
  // 1. DATA CENTER & ELECTRICAL ENGINEERING (STEM_ENG)
  // =========================================================================
  {
    categoryCode: 'STEM_ENG',
    topicName: 'Cooling, HVAC and Chillers',
    questionText: 'A data center facility consumes a total power of 1,800 kW from the utility grid. The IT server equipment consumes 1,200 kW. What is the Power Usage Effectiveness (PUE) of this data center?',
    questionTextTh: 'ดาต้าเซ็นเตอร์แห่งหนึ่งใช้พลังงานรวมจากระบบไฟฟ้าทั้งหมด 1,800 kW ในขณะที่อุปกรณ์เซิร์ฟเวอร์ (IT Load) ใช้พลังงาน 1,200 kW จงหาค่า PUE (Power Usage Effectiveness) ของศูนย์นี้',
    difficulty: 'MEDIUM',
    formulaUsed: 'PUE = Total Facility Energy / IT Equipment Energy',
    explanationTh: 'สูตร PUE = พลังงานรวมของอาคาร (Total Facility Power) ÷ พลังงานของอุปกรณ์ IT (IT Equipment Power) = 1,800 kW ÷ 1,200 kW = 1.50 ค่า PUE ยิ่งใกล้ 1.00 ยิ่งมีประสิทธิภาพการใช้พลังงานสูง',
    options: [
      { optionKey: 'A', contentEn: '1.20', contentTh: '1.20', isCorrect: false },
      { optionKey: 'B', contentEn: '1.50', contentTh: '1.50', isCorrect: true },
      { optionKey: 'C', contentEn: '0.67', contentTh: '0.67', isCorrect: false },
      { optionKey: 'D', contentEn: '2.10', contentTh: '2.10', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_ENG',
    topicName: 'AC Power, Voltage and Current',
    questionText: 'In a 3-phase, 400V line-to-line electrical system feeding a server Power Distribution Unit (PDU), the measured line current is 100 Amperes with a power factor (cos θ) of 0.95. What is the active real power (P) delivered in kilowatts?',
    questionTextTh: 'ในระบบไฟฟ้า 3 เฟส แรงดันระหว่างสาย 400V ที่จ่ายไฟให้ตู้ PDU วัดกระแสในสายได้ 100A และมีค่าพาวเวอร์แฟกเตอร์ (cos θ) เท่ากับ 0.95 กำลังไฟฟ้าจริง (Active Power) มีค่ากี่กิโลวัตต์ (kW)?',
    difficulty: 'HARD',
    formulaUsed: 'P = √3 × V_L × I_L × cos(θ) / 1000',
    explanationTh: 'กำลังไฟฟ้าจริง 3 เฟส คำนวณจาก P = √3 × V_L × I_L × cos(θ) = 1.732 × 400 × 100 × 0.95 = 65,816 วัตต์ หรือประมาณ 65.8 kW',
    options: [
      { optionKey: 'A', contentEn: '38.0 kW', contentTh: '38.0 kW', isCorrect: false },
      { optionKey: 'B', contentEn: '65.8 kW', contentTh: '65.8 kW', isCorrect: true },
      { optionKey: 'C', contentEn: '114.0 kW', contentTh: '114.0 kW', isCorrect: false },
      { optionKey: 'D', contentEn: '40.0 kW', contentTh: '40.0 kW', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_ENG',
    topicName: 'Cooling, HVAC and Chillers',
    questionText: 'A high-density server rack consumes 8,000 Watts (8 kW) of electrical power continuously. Approximately how much heat does this rack generate in BTU per hour (BTU/hr)?',
    questionTextTh: 'ตู้แร็คเซิร์ฟเวอร์ความหนาแน่นสูงใช้กำลังไฟฟ้า 8,000 วัตต์ (8 kW) อย่างต่อเนื่อง ตู้นี้จะคายความร้อนออกมาประมาณกี่ BTU ต่อชั่วโมง?',
    difficulty: 'MEDIUM',
    formulaUsed: '1 Watt = 3.412142 BTU/hr | Heat (BTU/hr) = Power (W) × 3.412',
    explanationTh: 'พลังงานไฟฟ้าที่อุปกรณ์ IT ใช้งานเกือบ 100% จะถูกเปลี่ยนเป็นความร้อน 1 Watt = 3.412 BTU/hr ดังนั้น 8,000 W × 3.412 = 27,296 BTU/hr (ประมาณ 27,300 BTU/hr)',
    options: [
      { optionKey: 'A', contentEn: '8,000 BTU/hr', contentTh: '8,000 BTU/hr', isCorrect: false },
      { optionKey: 'B', contentEn: '18,500 BTU/hr', contentTh: '18,500 BTU/hr', isCorrect: false },
      { optionKey: 'C', contentEn: '27,300 BTU/hr', contentTh: '27,300 BTU/hr', isCorrect: true },
      { optionKey: 'D', contentEn: '34,120 BTU/hr', contentTh: '34,120 BTU/hr', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_ENG',
    topicName: 'Uninterruptible Power Supply (UPS)',
    questionText: 'According to Uptime Institute Tier classifications, which Tier standard requires concurrent maintainability (ability to maintain any component without downtime) and dual active power paths (2N or 2N+1)?',
    questionTextTh: 'ตามมาตรฐาน Tier Classification ของสถาบัน Uptime Institute ระดับ Tier ใดที่กำหนดให้ระบบต้องรองรับ Concurrent Maintainability (ซ่อมบำรุงได้โดยไม่ต้องหยุดทำงาน) และมีเส้นทางจ่ายไฟอิสระคู่แบบ 2N หรือ 2N+1?',
    difficulty: 'MEDIUM',
    explanationTh: 'Tier III กำหนดคุณสมบัติ Concurrent Maintainability มีเส้นทางจ่ายไฟสำรอง ส่วน Tier IV เป็น Fault Tolerant (2N+1) ทนต่อความล้มเหลวของอุปกรณ์ทุกชนิดโดยไม่กระทบโหลดงาน',
    options: [
      { optionKey: 'A', contentEn: 'Tier I', contentTh: 'Tier I (พื้นฐาน)', isCorrect: false },
      { optionKey: 'B', contentEn: 'Tier II', contentTh: 'Tier II (มีอุปกรณ์สำรองบางส่วน N+1)', isCorrect: false },
      { optionKey: 'C', contentEn: 'Tier III and Tier IV', contentTh: 'Tier III และ Tier IV', isCorrect: true },
      { optionKey: 'D', contentEn: 'Only Tier I and Tier II', contentTh: 'เฉพาะ Tier I และ Tier II', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_ENG',
    topicName: 'Cooling, HVAC and Chillers',
    questionText: 'What is the primary thermodynamic benefit of implementing a Hot Aisle / Cold Aisle Containment system in a data center?',
    questionTextTh: 'ประโยชน์หลักทางอุณหพลศาสตร์ (Thermodynamics) ของการทำระบบกั้นลมร้อน/ลมเย็น (Hot/Cold Aisle Containment) ในดาต้าเซ็นเตอร์คืออะไร?',
    difficulty: 'EASY',
    explanationTh: 'การปิดกั้นทางเดินลมป้องกันไม่ให้อากาศเย็นด้านหน้าแร็คผสมกับอากาศร้อนที่ปล่อยจากหลังเซิร์ฟเวอร์ (Prevents hot and cold air mixing) ทำให้ Delta T สูงขึ้นและแอร์ทำงานได้อย่างมีประสิทธิภาพสูงสุด',
    options: [
      { optionKey: 'A', contentEn: 'It prevents the mixing of cold supply air and hot exhaust air, maximizing CRAC efficiency.', contentTh: 'ป้องกันไม่ให้อากาศเย็นจ่ายกับอากาศร้อนผสมกัน เพิ่มประสิทธิภาพของเครื่อง CRAC สูงสุด', isCorrect: true },
      { optionKey: 'B', contentEn: 'It increases the acoustic noise of cooling fans.', contentTh: 'เพิ่มเสียงรบกวนของพัดลมระบายความร้อน', isCorrect: false },
      { optionKey: 'C', contentEn: 'It eliminates the need for any backup power generators.', contentTh: 'ทำให้ไม่ต้องใช้เครื่องกำเนิดไฟฟ้าสำรอง', isCorrect: false },
      { optionKey: 'D', contentEn: 'It converts single-phase AC electricity into DC electricity automatically.', contentTh: 'แปลงไฟฟ้ากระแสสลับเป็นกระแสตรงโดยอัตโนมัติ', isCorrect: false },
    ],
  },

  // =========================================================================
  // 2. HARDWARE & NETWORKING (STEM_TECH)
  // =========================================================================
  {
    categoryCode: 'STEM_TECH',
    topicName: 'IP Addressing and Subnetting',
    questionText: 'A data center engineer needs to allocate a subnet for a dedicated server management cluster with a CIDR prefix of /28. How many usable host IP addresses are available in this subnet?',
    questionTextTh: 'วิศวกรดาต้าเซ็นเตอร์ต้องการจัดสรร Subnet สำหรับกลุ่มเซิร์ฟเวอร์จัดการระบบด้วย CIDR Prefix ขนาด /28 จะมีหมายเลข IP ที่ใช้งานได้จริงกับโฮสต์ (Usable Host IPs) ทั้งหมดกี่หมายเลข?',
    difficulty: 'MEDIUM',
    formulaUsed: 'Usable Hosts = 2^(32 - Prefix) - 2',
    explanationTh: 'IPv4 มี 32 บิต ซับเน็ต /28 มีบิตโฮสต์เหลือ 32 - 28 = 4 บิต จำนวน IP ทั้งหมดคือ 2^4 = 16 ลบ Network Address (1) และ Broadcast Address (1) เหลือไอพีที่ใช้งานได้จริง 16 - 2 = 14 หมายเลข',
    options: [
      { optionKey: 'A', contentEn: '16 usable IPs', contentTh: '16 หมายเลข', isCorrect: false },
      { optionKey: 'B', contentEn: '14 usable IPs', contentTh: '14 หมายเลข', isCorrect: true },
      { optionKey: 'C', contentEn: '30 usable IPs', contentTh: '30 หมายเลข', isCorrect: false },
      { optionKey: 'D', contentEn: '6 usable IPs', contentTh: '6 หมายเลข', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_TECH',
    topicName: 'Data Storage and RAID Systems',
    questionText: 'A storage storage array uses RAID 6 with eight (8) hard drives, each with a capacity of 10 Terabytes (TB). What is the total usable storage capacity and fault tolerance of this array?',
    questionTextTh: 'ตู้สตอเรจใช้งานระบบ RAID 6 โดยใช้ฮาร์ดไดรฟ์ขนาด 10 TB จำนวน 8 ลูก ความจุที่ใช้งานได้จริง (Usable Capacity) และความสามารถในการทนต่อไดรฟ์เสียหายพร้อมกันคือเท่าใด?',
    difficulty: 'MEDIUM',
    formulaUsed: 'RAID 6 Usable Capacity = (N - 2) × Capacity',
    explanationTh: 'RAID 6 ใช้ระบบ Dual Distributed Parity โดยกันเนื้อที่เทียบเท่า 2 ไดรฟ์สำหรับ Parity ความจุใช้งานได้ = (8 - 2) × 10 TB = 60 TB และสามารถทนต่อฮาร์ดไดรฟ์พังพร้อมกันได้สูงสุด 2 ลูกโดยข้อมูลไม่สูญหาย',
    options: [
      { optionKey: 'A', contentEn: '70 TB usable, 1 drive failure tolerance', contentTh: 'ความจุ 70 TB, ทนฮาร์ดดิสก์เสีย 1 ลูก', isCorrect: false },
      { optionKey: 'B', contentEn: '60 TB usable, 2 drive failure tolerance', contentTh: 'ความจุ 60 TB, ทนฮาร์ดดิสก์เสีย 2 ลูก', isCorrect: true },
      { optionKey: 'C', contentEn: '40 TB usable, 4 drive failure tolerance', contentTh: 'ความจุ 40 TB, ทนฮาร์ดดิสก์เสีย 4 ลูก', isCorrect: false },
      { optionKey: 'D', contentEn: '80 TB usable, 0 drive failure tolerance', contentTh: 'ความจุ 80 TB, ห้ามไดรฟ์เสียเลย', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_TECH',
    topicName: 'Computer Networking Basics',
    questionText: 'When connecting Top-of-Rack (ToR) switches to Core switches across a large data center campus over 2 kilometers, which fiber-optic cable and laser wavelength standard must be selected?',
    questionTextTh: 'เมื่อต้องเดินสายไฟเบอร์ออปติกเชื่อมต่อระหว่างสวิตช์ข้ามอาคารดาต้าเซ็นเตอร์ระยะทาง 2 กิโลเมตร ควรเลือกใช้สายไฟเบอร์และมาตรฐานเลเซอร์ความยาวคลื่นประเภทใด?',
    difficulty: 'HARD',
    explanationTh: 'ระยะทาง 2 กิโลเมตรเกินขีดจำกัดของ Multimode (OM3/OM4 สูงสุดประมาณ 400-500 เมตร) จึงต้องใช้ Single-Mode Fiber (OS2) ทำงานที่ความยาวคลื่น 1310 nm หรือ 1550 nm (เช่น 10GBASE-LR หรือ 40GBASE-LR4)',
    options: [
      { optionKey: 'A', contentEn: 'Multimode OM4 with 850 nm VCSEL (Short Reach - SR)', contentTh: 'Multimode OM4 ความยาวคลื่น 850 nm (SR)', isCorrect: false },
      { optionKey: 'B', contentEn: 'Single-Mode Fiber (OS2) with 1310 nm Laser (Long Reach - LR)', contentTh: 'Single-Mode Fiber (OS2) ความยาวคลื่น 1310 nm (LR)', isCorrect: true },
      { optionKey: 'C', contentEn: 'Standard Cat6A UTP Copper Cable', contentTh: 'สายทองแดง Cat6A UTP ทั่วไป', isCorrect: false },
      { optionKey: 'D', contentEn: 'Coaxial RG-59 Cable', contentTh: 'สายโคแอกเชียล RG-59', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_TECH',
    topicName: 'Server Architecture and Hardware',
    questionText: 'In standard 19-inch equipment racks, what is the exact physical height of one Rack Unit (1U)?',
    questionTextTh: 'ในตู้แร็คมาตรฐานขนาด 19 นิ้ว ความสูงของอุปกรณ์ขนาด 1 Rack Unit (1U) มีค่าเท่ากับเท่าใดตามมาตรฐาน EIA-310?',
    difficulty: 'EASY',
    formulaUsed: '1U = 1.75 inches = 44.45 mm',
    explanationTh: '1 Rack Unit (1U) ตามมาตรฐาน EIA-310 กำหนดให้มีความสูงเท่ากับ 1.75 นิ้ว หรือ 44.45 มิลลิเมตร (ประกอบด้วยรูยึดน็อต 3 รูต่อ 1U)',
    options: [
      { optionKey: 'A', contentEn: '1.00 inch (25.4 mm)', contentTh: '1.00 นิ้ว (25.4 มม.)', isCorrect: false },
      { optionKey: 'B', contentEn: '1.75 inches (44.45 mm)', contentTh: '1.75 นิ้ว (44.45 มม.)', isCorrect: true },
      { optionKey: 'C', contentEn: '2.50 inches (63.5 mm)', contentTh: '2.50 นิ้ว (63.5 มม.)', isCorrect: false },
      { optionKey: 'D', contentEn: '3.00 inches (76.2 mm)', contentTh: '3.00 นิ้ว (76.2 มม.)', isCorrect: false },
    ],
  },

  // =========================================================================
  // 3. STEM SCIENCE & MATHEMATICS (STEM_SCIENCE / STEM_MATH)
  // =========================================================================
  {
    categoryCode: 'STEM_SCIENCE',
    topicName: 'Basic Electricity and Magnetism',
    questionText: 'Why do technicians handling sensitive server CPUs and RAM modules wear an Electrostatic Discharge (ESD) wrist strap grounded to the server chassis?',
    questionTextTh: 'เหตุใดช่างเทคนิคที่สัมผัส CPU และ RAM ของเซิร์ฟเวอร์จึงต้องสวมสายรัดข้อมือ ESD (Electrostatic Discharge) ที่ต่อสายดินเข้ากับโครงแชสซี?',
    difficulty: 'EASY',
    explanationTh: 'ร่างกายมนุษย์สามารถสะสมไฟฟ้าสถิตได้หลายพันโวลต์ ซึ่งสามารถทำลายวงจรรวม (Semiconductor microchips) ขนาดเล็กของ CPU หรือ RAM ได้ทันที สายรัด ESD จะช่วยถ่ายประจุไฟฟ้าสถิตลงดินอย่างปลอดภัย',
    options: [
      { optionKey: 'A', contentEn: 'To prevent high-voltage electrostatic charges from damaging delicate semiconductor chips.', contentTh: 'เพื่อป้องกันไฟฟ้าสถิตแรงดันสูงทำลายชิปเซมิคอนดักเตอร์ที่บอบบาง', isCorrect: true },
      { optionKey: 'B', contentEn: 'To speed up the BIOS firmware flashing process.', contentTh: 'เพื่อเร่งความเร็วในการแฟลชไบออส', isCorrect: false },
      { optionKey: 'C', contentEn: 'To measure the body temperature of the technician.', contentTh: 'เพื่อวัดอุณหภูมิร่างกายของช่าง', isCorrect: false },
      { optionKey: 'D', contentEn: 'To prevent magnetic fields from erasing SSD storage drives.', contentTh: 'เพื่อป้องกันสนามแม่เหล็กลบข้อมูลใน SSD', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_MATH',
    topicName: 'Linear Equations and Formulas',
    questionText: 'A data center cooling tower uses water circulation with a flow rate of 500 gallons per minute (GPM). If 1 GPM equals approximately 3.785 liters per minute (L/min), what is the water flow in liters per hour (L/hr)?',
    questionTextTh: 'หอหล่อเย็น (Cooling Tower) ใช้อัตราการไหลของน้ำ 500 แกลลอนต่อนาที (GPM) ถ้า 1 แกลลอนเท่ากับประมาณ 3.785 ลิตร อัตราการไหลของน้ำจะมีค่ากี่ลิตรต่อชั่วโมง (L/hr)?',
    difficulty: 'MEDIUM',
    formulaUsed: 'Flow (L/hr) = GPM × 3.785 × 60',
    explanationTh: 'คำนวณ: 500 GPM × 3.785 L/gal = 1,892.5 ลิตรต่อนาที จากนั้นคูณ 60 นาทีต่อชั่วโมง = 1,892.5 × 60 = 113,550 ลิตรต่อชั่วโมง',
    options: [
      { optionKey: 'A', contentEn: '18,925 L/hr', contentTh: '18,925 ลิตร/ชม.', isCorrect: false },
      { optionKey: 'B', contentEn: '113,550 L/hr', contentTh: '113,550 ลิตร/ชม.', isCorrect: true },
      { optionKey: 'C', contentEn: '30,000 L/hr', contentTh: '30,000 ลิตร/ชม.', isCorrect: false },
      { optionKey: 'D', contentEn: '227,100 L/hr', contentTh: '227,100 ลิตร/ชม.', isCorrect: false },
    ],
  },
  {
    categoryCode: 'STEM_MATH',
    topicName: 'Statistics and Graph Interpretation',
    questionText: 'A high-availability cloud database has an availability target of 99.99% ("four nines") in a standard 365-day year (8,760 hours). What is the maximum allowable unplanned downtime per year?',
    questionTextTh: 'คลาวด์ดาต้าเบสระดับ High Availability มีเป้าหมายความพร้อมใช้งาน 99.99% ("Four Nines") ในระยะเวลา 1 ปี (365 วัน หรือ 8,760 ชั่วโมง) ระบบจะหยุดทำงานฉุกเฉินได้สูงสุดไม่เกินกี่นาทีต่อปี?',
    difficulty: 'HARD',
    formulaUsed: 'Downtime = 8,760 hours × (1 - 0.9999) × 60 min',
    explanationTh: 'เวลาทั้งหมดใน 1 ปี = 8,760 ชั่วโมง × 60 นาที = 525,600 นาที ความไม่พร้อมใช้งานที่ยอมรับได้ = 100% - 99.99% = 0.01% (0.0001) ดังนั้น Downtime สูงสุด = 525,600 × 0.0001 = 52.56 นาทีต่อปี (ประมาณ 52.6 นาที)',
    options: [
      { optionKey: 'A', contentEn: '8.76 hours', contentTh: '8.76 ชั่วโมง', isCorrect: false },
      { optionKey: 'B', contentEn: '52.56 minutes', contentTh: '52.56 นาที', isCorrect: true },
      { optionKey: 'C', contentEn: '3.65 days', contentTh: '3.65 วัน', isCorrect: false },
      { optionKey: 'D', contentEn: '5.26 minutes', contentTh: '5.26 นาที', isCorrect: false },
    ],
  },

  // =========================================================================
  // 4. REAL TOEIC PART 5 (INCOMPLETE SENTENCES - WORKPLACE & TECHNICAL)
  // =========================================================================
  {
    categoryCode: 'TOEIC_PART_5',
    questionText: 'The lead facilities engineer emphasized that all emergency diesel generators must be tested _______ to verify their automatic transfer capability during grid failures.',
    questionTextTh: 'หัวหน้าวิศวกรอาคารเน้นย้ำว่าเครื่องกำเนิดไฟฟ้าดีเซลฉุกเฉินทั้งหมดต้องได้รับการทดสอบ _______ เพื่อตรวจสอบความสามารถในการสลับโหลดอัตโนมัติเมื่อระบบไฟฟ้าหลักดับ',
    difficulty: 'MEDIUM',
    errorType: 'VOCABULARY',
    explanationTh: 'เลือกคำวิเศษณ์ (Adverb) ขยายกริยา "must be tested" คือ "periodically" (อย่างสม่ำเสมอตามรอบระยะเวลา) ตัวเลือกอื่น: periodic (Adj), periodicity (Noun), periodize (Verb)',
    options: [
      { optionKey: 'A', contentEn: 'periodic', contentTh: 'ตามรอบเวลา (คำคุณศัพท์)', isCorrect: false },
      { optionKey: 'B', contentEn: 'periodically', contentTh: 'อย่างสม่ำเสมอตามรอบระยะเวลา (คำกริยาวิเศษณ์)', isCorrect: true },
      { optionKey: 'C', contentEn: 'periodicity', contentTh: 'ความเป็นรอบระยะ (คำนาม)', isCorrect: false },
      { optionKey: 'D', contentEn: 'periods', contentTh: 'ช่วงเวลา (คำนามพหูพจน์)', isCorrect: false },
    ],
  },
  {
    categoryCode: 'TOEIC_PART_5',
    questionText: 'Had the technician _______ the digital multimeter before testing the busway, the short circuit would have been detected immediately.',
    questionTextTh: 'หากช่างเทคนิคได้ _______ มัลติมิเตอร์แบบดิจิทัลก่อนทดสอบบัสเวย์ การลัดวงจรก็คงถูกตรวจพบได้ในทันที',
    difficulty: 'HARD',
    errorType: 'GRAMMAR',
    explanationTh: 'โครงสร้าง Conditional Inversion (Third Conditional แบบละ if): "Had + Subject + V.3, Subject + would have + V.3" ดังนั้นหลัง Had the technician ต้องใช้ Past Participle (V.3) คือ "calibrated"',
    options: [
      { optionKey: 'A', contentEn: 'calibrate', contentTh: 'ปรับเทียบ (V.1)', isCorrect: false },
      { optionKey: 'B', contentEn: 'calibrating', contentTh: 'กำลังปรับเทียบ (V.ing)', isCorrect: false },
      { optionKey: 'C', contentEn: 'calibrated', contentTh: 'ปรับเทียบแล้ว (V.3)', isCorrect: true },
      { optionKey: 'D', contentEn: 'calibration', contentTh: 'การปรับเทียบ (Noun)', isCorrect: false },
    ],
  },
  {
    categoryCode: 'TOEIC_PART_5',
    questionText: 'The newly commissioned chiller plant operates with high thermal efficiency, _______ electrical consumption across Data Center Hall B by 18 percent.',
    questionTextTh: 'ระบบชิลเลอร์ที่เพิ่งเปิดใช้งานทำงานด้วยประสิทธิภาพเชิงความร้อนสูง _______ การใช้พลังงานไฟฟ้าในอาคารดาต้าเซ็นเตอร์ฮอลล์ B ลงถึง 18 เปอร์เซ็นต์',
    difficulty: 'MEDIUM',
    errorType: 'GRAMMAR',
    explanationTh: 'โครงสร้าง Participle Clause แสดงผลลัพธ์ที่ตามมา (Resulting Action): ใช้ Present Participle (V.ing) "substantially reducing" เพื่อทำหน้าที่เป็นประโยคลดรูปของ "which substantially reduces"',
    options: [
      { optionKey: 'A', contentEn: 'substantially reduce', contentTh: 'ลดลงอย่างมาก (V.inf)', isCorrect: false },
      { optionKey: 'B', contentEn: 'substantially reducing', contentTh: 'ส่งผลให้ลดลงอย่างมาก (V.ing)', isCorrect: true },
      { optionKey: 'C', contentEn: 'substance reduction', contentTh: 'การลดสาร (Noun phrase)', isCorrect: false },
      { optionKey: 'D', contentEn: 'substantial reduced', contentTh: 'รูปผสมผิดไวยากรณ์', isCorrect: false },
    ],
  },
  {
    categoryCode: 'TOEIC_PART_5',
    questionText: 'Neither the primary air conditioning unit _______ the backup fan coil was operational following the lightning strike on the distribution sub-panel.',
    questionTextTh: 'ทั้งชุดเครื่องปรับอากาศหลัก _______ พัดลมคอยล์สำรอง ไม่สามารถทำงานได้หลังจากเกิดฟ้าผ่าลงที่แผงจ่ายไฟย่อย',
    difficulty: 'EASY',
    errorType: 'GRAMMAR',
    explanationTh: 'Correlative Conjunction: คู่คำเชื่อมที่ถูกต้องของ "Neither" คือ "nor" (Neither ... nor แปลว่า ไม่ทั้งคู่) ส่วน "Either" ใช้คู่กับ "or"',
    options: [
      { optionKey: 'A', contentEn: 'or', contentTh: 'หรือ', isCorrect: false },
      { optionKey: 'B', contentEn: 'nor', contentTh: 'และไม่ (ใช้คู่กับ Neither)', isCorrect: true },
      { optionKey: 'C', contentEn: 'and', contentTh: 'และ', isCorrect: false },
      { optionKey: 'D', contentEn: 'but', contentTh: 'แต่', isCorrect: false },
    ],
  },
  {
    categoryCode: 'TOEIC_PART_5',
    questionText: 'Strict compliance with ISO 27001 standards is _______ for all personnel accessing the physical server floor.',
    questionTextTh: 'การปฏิบัติตามมาตรฐาน ISO 27001 อย่างเคร่งครัดเป็นสิ่ง _______ สำหรับบุคลากรทุกคนที่เข้าสู่พื้นที่ห้องเซิร์ฟเวอร์',
    difficulty: 'EASY',
    errorType: 'VOCABULARY',
    explanationTh: 'หลัง Verb to be "is" ต้องการคำคุณศัพท์ (Adjective) เพื่อขยายประธาน: "mandatory" แปลว่า เป็นข้อบังคับ/จำเป็นต้องทำ ตัวเลือกอื่น: mandate (Noun/Verb), mandatorily (Adverb)',
    options: [
      { optionKey: 'A', contentEn: 'mandatory', contentTh: 'เป็นข้อบังคับ/จำเป็น (Adjective)', isCorrect: true },
      { optionKey: 'B', contentEn: 'mandate', contentTh: 'คำสั่ง/มอบหมาย (Noun/Verb)', isCorrect: false },
      { optionKey: 'C', contentEn: 'mandatorily', contentTh: 'อย่างเป็นข้อบังคับ (Adverb)', isCorrect: false },
      { optionKey: 'D', contentEn: 'mandating', contentTh: 'กำลังสั่งการ (Participle)', isCorrect: false },
    ],
  },

  // =========================================================================
  // 5. LOGICAL REASONING & MECHANICAL APTITUDE (LOGIC)
  // =========================================================================
  {
    categoryCode: 'LOGIC',
    topicName: 'Pattern Recognition',
    questionText: 'In a mechanical power transmission system, Gear A has 24 teeth and rotates clockwise at 120 RPM. Gear B has 48 teeth and is directly meshed with Gear A. What is the rotational speed and direction of Gear B?',
    questionTextTh: 'ในระบบส่งกำลังทางกล เฟือง A มี 24 ฟัน หมุนตามเข็มนาฬิกาด้วยความเร็ว 120 รอบต่อนาที (RPM) ขบอยู่กับเฟือง B ซึ่งมี 48 ฟัน ความเร็วและทิศทางการหมุนของเฟือง B คือข้อใด?',
    difficulty: 'MEDIUM',
    formulaUsed: 'Speed B = Speed A × (Teeth A / Teeth B) | Meshed gears rotate in opposite directions',
    explanationTh: '1. ทิศทาง: เฟืองที่ขบกันโดยตรง 2 ตัวจะหมุนทิศตรงข้ามกันเสมอ เฟือง A หมุนตามเข็ม -> เฟือง B ต้องหมุน "ทวนเข็มนาฬิกา (Counter-clockwise)"\n2. ความเร็ว: อัตราทด = 24 / 48 = 1/2 ดังนั้นความเร็วของ B = 120 × (24 / 48) = 60 RPM',
    options: [
      { optionKey: 'A', contentEn: '240 RPM, Clockwise', contentTh: '240 RPM, ตามเข็มนาฬิกา', isCorrect: false },
      { optionKey: 'B', contentEn: '60 RPM, Counter-clockwise', contentTh: '60 RPM, ทวนเข็มนาฬิกา', isCorrect: true },
      { optionKey: 'C', contentEn: '120 RPM, Counter-clockwise', contentTh: '120 RPM, ทวนเข็มนาฬิกา', isCorrect: false },
      { optionKey: 'D', contentEn: '60 RPM, Clockwise', contentTh: '60 RPM, ตามเข็มนาฬิกา', isCorrect: false },
    ],
  },
  {
    categoryCode: 'LOGIC',
    topicName: 'Logical Deduction',
    questionText: 'Three circuit breakers (CB1, CB2, CB3) protect a data center rack. Investigation shows:\n1. If CB1 trips, CB2 always trips.\n2. CB2 tripped today.\n3. CB3 only trips if CB2 does NOT trip.\nWhich of the following statements MUST be true?',
    questionTextTh: 'เบรกเกอร์ 3 ตัว (CB1, CB2, CB3) ป้องกันตู้แร็คเซิร์ฟเวอร์ จากการตรวจสอบพบเงื่อนไข:\n1. ถ้า CB1 ทริป CB2 จะทริปเสมอ\n2. วันนี้พบว่า CB2 ทริป\n3. CB3 จะทริปก็ต่อเมื่อ CB2 ไม่ทริปเท่านั้น\nข้อใดต่อไปนี้ต้องเป็นจริงอย่างแน่นอน?',
    difficulty: 'HARD',
    explanationTh: 'วิเคราะห์ตามตรรกศาสตร์:\n- จากเงื่อนไข 3: "CB3 ทริปก็ต่อเมื่อ CB2 ไม่ทริป" เนื่องจากวันนี้ CB2 ทริป ดังนั้น CB3 ต้อง "ไม่ทริป" แน่นอน\n- จากเงื่อนไข 1: "ถ้า CB1 ทริป แล้ว CB2 ทริป" (P -> Q) การที่ Q เป็นจริง (CB2 ทริป) ไม่สามารถสรุปได้ว่า CB1 ต้องทริปด้วย (อาจทริปหรือไม่ทริปก็ได้)\nดังนั้นข้อที่ต้องเป็นจริงแน่นอนคือ "CB3 did not trip"',
    options: [
      { optionKey: 'A', contentEn: 'CB1 must have tripped today.', contentTh: 'CB1 ต้องทริปแน่นอนวันนี้', isCorrect: false },
      { optionKey: 'B', contentEn: 'CB3 did not trip today.', contentTh: 'CB3 ไม่ได้ทริปแน่นอนวันนี้', isCorrect: true },
      { optionKey: 'C', contentEn: 'All three circuit breakers tripped.', contentTh: 'เบรกเกอร์ทั้ง 3 ตัวทริปทั้งหมด', isCorrect: false },
      { optionKey: 'D', contentEn: 'Neither CB1 nor CB2 was energized.', contentTh: 'ทั้ง CB1 และ CB2 ไม่มีไฟฟ้า', isCorrect: false },
    ],
  },
];

async function seedExternalQuestions() {
  console.log('===> Starting Injection of Real External Exam Questions...');
  let count = 0;

  for (const q of realQuestions) {
    const cat = await prisma.category.findUnique({
      where: { code: q.categoryCode },
    });

    if (!cat) {
      console.warn(`Category not found: ${q.categoryCode}`);
      continue;
    }

    let topicId: string | null = null;
    if (q.topicName) {
      const topic = await prisma.topic.findFirst({
        where: { name: q.topicName },
      });
      if (topic) topicId = topic.id;
    }

    // Check if duplicate question exists
    const existing = await prisma.question.findFirst({
      where: { questionText: q.questionText },
    });

    if (existing) {
      continue;
    }

    await prisma.question.create({
      data: {
        categoryId: cat.id,
        topicId,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh || null,
        difficulty: q.difficulty,
        errorType: q.errorType || 'COMPREHENSION',
        formulaUsed: q.formulaUsed || null,
        explanationTh: q.explanationTh,
        isPublished: true,
        options: {
          create: q.options.map((opt, oIdx) => ({
            optionKey: opt.optionKey,
            contentEn: opt.contentEn,
            contentTh: opt.contentTh || null,
            isCorrect: opt.isCorrect,
            orderIndex: oIdx,
          })),
        },
      },
    });

    count++;
  }

  console.log(`✓ Successfully injected ${count} authentic external examination questions.`);

  // Also create a Real Incident RCA Case Study in QuestionGroup for Reading/TOEIC Part 7
  const rcaGroup = await prisma.questionGroup.create({
    data: {
      title: 'INCIDENT ROOT CAUSE ANALYSIS (RCA): Chilled Water Pressure Drop',
      contextType: 'MANUAL',
      contentEn: `FACILITY INCIDENT SUMMARY REPORT
Incident ID: INC-2026-0882
Classification: P2 - Redundancy Degraded (Non-Service Affecting)
Location: Data Center Delta - Chiller Plant Room 3
Date/Time: 14 October 2026, 03:15 UTC

1. EVENT DESCRIPTION
At 03:15 UTC, automated telemetry alerted the Network Operations Center (NOC) that the secondary loop chilled water supply pressure dropped from 65 PSI to 42 PSI within three minutes. Primary Chiller CH-01 experienced a cavitation alarm, and CRAH units in Data Hall B reported supply air temperatures rising from 21.5°C to 24.0°C.

2. ROOT CAUSE
Subsequent inspection by shift engineers revealed that a faulty bypass differential pressure sensor (DPS-302) sent errant 4-20mA signals to the Building Management System (BMS). This caused the motorized three-way mixing valve to erroneously open to 100%, bypassing the secondary heat exchanger.

3. CORRECTIVE ACTIONS
- At 03:28 UTC, on-duty technicians manually overrode mixing valve MV-302 to 45% nominal flow.
- Secondary loop pressure recovered to 63 PSI at 03:34 UTC.
- Supply air temperatures normalized to 21.0°C across Data Hall B within 12 minutes.
- Sensor DPS-302 was replaced and recalibrated during the scheduled maintenance window at 10:00 UTC.`,
      contentTh: `รายงานสรุปเหตุการณ์ฉุกเฉินประจำอาคาร (RCA)
รหัสเหตุการณ์: INC-2026-0882
ระดับความรุนแรง: P2 - ระบบสำรองลดทอนลง (ไม่กระทบการทำงานของเซิร์ฟเวอร์หลัก)
สถานที่: ดาต้าเซ็นเตอร์ เดลต้า - ห้องระบบชิลเลอร์ 3
วัน/เวลา: 14 ตุลาคม 2026 เวลา 03:15 UTC

1. คำอธิบายเหตุการณ์:
เมื่อเวลา 03:15 UTC ระบบเทเลเมทรีอัตโนมัติแจ้งเตือนศูนย์ NOC ว่าแรงดันน้ำหล่อเย็นในลูปสำรองลดลงจาก 65 PSI เหลือ 42 PSI ภายในเวลา 3 นาที ชิลเลอร์หลัก CH-01 เกิดสัญญาณเตือนการเกิดฟองไอในปั๊ม (Cavitation) และตู้ CRAH ในห้อง Data Hall B อุณหภูมิลมจ่ายเพิ่มขึ้นจาก 21.5°C เป็น 24.0°C

2. สาเหตุที่แท้จริง:
เซ็นเซอร์วัดแรงดันผลต่าง (DPS-302) ส่งสัญญาณกระแส 4-20mA ผิดพลาดไปยังระบบ BMS ทำให้วาล์วผสมแบบ 3 ทางไฟฟ้าเปิดค้างที่ 100% ส่งผลให้น้ำไหลลัดวงจรข้ามเครื่องแลกเปลี่ยนความร้อนสำรอง

3. การแก้ไข:
- เวลา 03:28 UTC ช่างเทคนิคเข้าควบคุมแบบ Manual ปรับวาล์ว MV-302 มาที่ 45%
- แรงดันน้ำกลับสู่ระดับ 63 PSI เมื่อเวลา 03:34 UTC
- อุณหภูมิลมจ่ายกลับสู่ระดับปกติ 21.0°C ทั่วทั้งห้อง Data Hall B ภายใน 12 นาที
- ได้ทำการเปลี่ยนเซ็นเซอร์ DPS-302 ตัวใหม่และปรับเทียบซ้ำในรอบบำรุงรักษาเวลา 10:00 UTC`,
      questions: {
        create: [
          {
            categoryId: (await prisma.category.findUnique({ where: { code: 'TOEIC_PART_7' } }))!.id,
            questionText: 'What was the primary root cause of the chilled water pressure drop in Chiller Plant Room 3?',
            questionTextTh: 'สาเหตุหลักที่แท้จริงของการลดลงของแรงดันน้ำหล่อเย็นในห้องชิลเลอร์ 3 คืออะไร?',
            difficulty: 'MEDIUM',
            explanationTh: 'ในหัวข้อที่ 2 (Root Cause) ระบุชัดเจนว่าเกิดจากเซ็นเซอร์วัดแรงดันผลต่าง (DPS-302) ส่งสัญญาณผิดพลาดไปยังระบบ BMS ทำให้วาล์วผสมเปิดค้าง 100%',
            options: {
              create: [
                { optionKey: 'A', contentEn: 'A sudden total power grid failure across the campus', contentTh: 'ไฟฟ้าดับทั้งอาคารอย่างกะทันหัน', isCorrect: false, orderIndex: 0 },
                { optionKey: 'B', contentEn: 'An errant signal from differential pressure sensor DPS-302', contentTh: 'สัญญาณผิดพลาดจากเซ็นเซอร์วัดแรงดันผลต่าง DPS-302', isCorrect: true, orderIndex: 1 },
                { optionKey: 'C', contentEn: 'A burst underground water pipe outside the facility', contentTh: 'ท่อน้ำใต้ดินแตกภายนอกอาคาร', isCorrect: false, orderIndex: 2 },
                { optionKey: 'D', contentEn: 'A coolant contamination in the primary chiller loop', contentTh: 'สารทำความเย็นปนเปื้อนในลูปหลัก', isCorrect: false, orderIndex: 3 },
              ],
            },
          },
          {
            categoryId: (await prisma.category.findUnique({ where: { code: 'TOEIC_PART_7' } }))!.id,
            questionText: 'How long did it take for the on-duty technicians to manually stabilize the mixing valve after the alert at 03:15 UTC?',
            questionTextTh: 'ช่างเทคนิคเวรใช้เวลากี่นาทีในการปรับวาล์วแบบ Manual ให้เสถียรหลังจากการแจ้งเตือนเมื่อเวลา 03:15 UTC?',
            difficulty: 'EASY',
            explanationTh: 'แจ้งเตือนเวลา 03:15 UTC ช่างเทคนิคปรับวาล์วแบบ Manual ที่เวลา 03:28 UTC: 03:28 - 03:15 = 13 นาที',
            options: {
              create: [
                { optionKey: 'A', contentEn: '13 minutes', contentTh: '13 นาที', isCorrect: true, orderIndex: 0 },
                { optionKey: 'B', contentEn: '3 minutes', contentTh: '3 นาที', isCorrect: false, orderIndex: 1 },
                { optionKey: 'C', contentEn: '45 minutes', contentTh: '45 นาที', isCorrect: false, orderIndex: 2 },
                { optionKey: 'D', contentEn: '30 minutes', contentTh: '30 นาที', isCorrect: false, orderIndex: 3 },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✓ Seeded Real Incident Root Cause Analysis Case Study with ID: ${rcaGroup.id}`);
  await prisma.$disconnect();
}

seedExternalQuestions().catch((e) => {
  console.error('Failed to seed real external questions:', e);
  process.exit(1);
});
