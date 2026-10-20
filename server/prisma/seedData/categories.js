"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicsData = exports.categoriesData = void 0;
exports.categoriesData = [
    // TOEIC Parts
    { code: 'TOEIC_PART_1', name: 'TOEIC Part 1 - Photographs', nameTh: 'Part 1: ภาพถ่าย (Photographs)', section: 'TOEIC' },
    { code: 'TOEIC_PART_2', name: 'TOEIC Part 2 - Question-Response', nameTh: 'Part 2: ถาม-ตอบ (Question-Response)', section: 'TOEIC' },
    { code: 'TOEIC_PART_3', name: 'TOEIC Part 3 - Conversations', nameTh: 'Part 3: บทสนทนา (Conversations)', section: 'TOEIC' },
    { code: 'TOEIC_PART_4', name: 'TOEIC Part 4 - Short Talks', nameTh: 'Part 4: การบรรยายสั้น (Short Talks)', section: 'TOEIC' },
    { code: 'TOEIC_PART_5', name: 'TOEIC Part 5 - Incomplete Sentences', nameTh: 'Part 5: เติมคำในประโยค (Incomplete Sentences)', section: 'TOEIC' },
    { code: 'TOEIC_PART_6', name: 'TOEIC Part 6 - Text Completion', nameTh: 'Part 6: เติมข้อความในบทอ่าน (Text Completion)', section: 'TOEIC' },
    { code: 'TOEIC_PART_7', name: 'TOEIC Part 7 - Reading Comprehension', nameTh: 'Part 7: การอ่านจับใจความ (Reading Comprehension)', section: 'TOEIC' },
    // STEM Categories
    { code: 'STEM_SCIENCE', name: 'Science', nameTh: 'วิทยาศาสตร์กายภาพ (Science)', section: 'STEM' },
    { code: 'STEM_TECH', name: 'Technology & Hardware', nameTh: 'เทคโนโลยีคอมพิวเตอร์และเครือข่าย (Technology)', section: 'STEM' },
    { code: 'STEM_ENG', name: 'Engineering & Electrical', nameTh: 'วิศวกรรมไฟฟ้าและเครื่องกล (Engineering)', section: 'STEM' },
    { code: 'STEM_MATH', name: 'Mathematics', nameTh: 'คณิตศาสตร์และสถิติ (Mathematics)', section: 'STEM' },
    // Logic & Personality & English
    { code: 'LOGIC', name: 'Logical Reasoning & Aptitude', nameTh: 'ตรรกะและการคิดเชิงวิเคราะห์ (Logic & Aptitude)', section: 'LOGIC' },
    { code: 'GRAMMAR', name: 'English Grammar', nameTh: 'ไวยากรณ์ภาษาอังกฤษ (Grammar)', section: 'ENGLISH' },
    { code: 'READING', name: 'Workplace Reading', nameTh: 'การอ่านเอกสารทางเทคนิค (Reading)', section: 'ENGLISH' },
    { code: 'LISTENING', name: 'Technical Listening', nameTh: 'การฟังเสียงประกาศและบทสนทนา (Listening)', section: 'ENGLISH' },
    { code: 'WORKPLACE', name: 'Workplace English', nameTh: 'ภาษาอังกฤษในสถานที่ทำงาน (Workplace English)', section: 'ENGLISH' },
    { code: 'DATA_CENTER', name: 'Data Center Technical English', nameTh: 'ภาษาอังกฤษเฉพาะทางดาต้าเซ็นเตอร์ (Data Center)', section: 'ENGLISH' },
];
exports.topicsData = [
    // Science topics
    { categoryCode: 'STEM_SCIENCE', name: 'Force and Motion', nameTh: 'แรงและการเคลื่อนที่' },
    { categoryCode: 'STEM_SCIENCE', name: 'Work, Energy and Power', nameTh: 'งาน พลังงาน และกำลัง' },
    { categoryCode: 'STEM_SCIENCE', name: 'Heat, Cooling and Thermodynamics', nameTh: 'ความร้อน อุณหภูมิ และการระบายความร้อน' },
    { categoryCode: 'STEM_SCIENCE', name: 'Pressure and Fluid Dynamics', nameTh: 'ความดันและการไหลของของไหล' },
    { categoryCode: 'STEM_SCIENCE', name: 'Basic Electricity and Magnetism', nameTh: 'ไฟฟ้าเบื้องต้นและแม่เหล็กไฟฟ้า' },
    // Technology topics
    { categoryCode: 'STEM_TECH', name: 'Server Architecture and Hardware', nameTh: 'โครงสร้างเซิร์ฟเวอร์และฮาร์ดแวร์' },
    { categoryCode: 'STEM_TECH', name: 'Computer Networking Basics', nameTh: 'พื้นฐานระบบเครือข่ายและสวิตช์' },
    { categoryCode: 'STEM_TECH', name: 'IP Addressing and Subnetting', nameTh: 'ไอพีแอดเดรสและซับเน็ต' },
    { categoryCode: 'STEM_TECH', name: 'Data Storage and RAID Systems', nameTh: 'ระบบจัดเก็บข้อมูลและ RAID' },
    { categoryCode: 'STEM_TECH', name: 'Monitoring and Sensor Systems', nameTh: 'ระบบตรวจวัดและเซ็นเซอร์' },
    // Engineering topics
    { categoryCode: 'STEM_ENG', name: 'Ohm’s Law and DC Circuits', nameTh: 'กฎของโอห์มและวงจรไฟฟ้ากระแสตรง' },
    { categoryCode: 'STEM_ENG', name: 'AC Power, Voltage and Current', nameTh: 'ไฟฟ้ากระแสสลับ แรงดัน และกระแส' },
    { categoryCode: 'STEM_ENG', name: 'Uninterruptible Power Supply (UPS)', nameTh: 'ระบบสำรองไฟฟ้าอัตโนมัติ (UPS)' },
    { categoryCode: 'STEM_ENG', name: 'Cooling, HVAC and Chillers', nameTh: 'ระบบปรับอากาศและชิลเลอร์ในห้องเซิร์ฟเวอร์' },
    { categoryCode: 'STEM_ENG', name: 'Preventive Maintenance and Troubleshooting', nameTh: 'การบำรุงรักษาเชิงป้องกันและการตรวจเช็คปัญหา' },
    // Math topics
    { categoryCode: 'STEM_MATH', name: 'Arithmetic, Percentages and Ratios', nameTh: 'การคำนวณ เปอร์เซ็นต์ และอัตราส่วน' },
    { categoryCode: 'STEM_MATH', name: 'Linear Equations and Formulas', nameTh: 'สมการเชิงเส้นและการย้ายข้างสูตร' },
    { categoryCode: 'STEM_MATH', name: 'Unit Conversions and Interpolation', nameTh: 'การแปลงหน่วยและการประมาณค่า' },
    { categoryCode: 'STEM_MATH', name: 'Statistics and Graph Interpretation', nameTh: 'สถิติพื้นฐานและการอ่านกราฟ' },
    // Logic topics
    { categoryCode: 'LOGIC', name: 'Number Series', nameTh: 'อนุกรมตัวเลข' },
    { categoryCode: 'LOGIC', name: 'Pattern Recognition', nameTh: 'การวิเคราะห์รูปแบบ' },
    { categoryCode: 'LOGIC', name: 'Logical Deduction', nameTh: 'การอนุมานเชิงตรรกะ' },
    { categoryCode: 'LOGIC', name: 'Numerical Reasoning', nameTh: 'การคิดคำนวณเชิงเหตุผล' },
];
