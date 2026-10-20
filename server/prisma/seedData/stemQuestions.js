"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stemQuestionsData = void 0;
exports.stemQuestionsData = [
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Force and Motion",
        "questionText": "A server rack weighing 400 kg is pushed across a level computer room floor with an acceleration of 0.5 m/s². Neglecting friction, what is the horizontal force applied?",
        "questionTextTh": "ตู้แร็คเซิร์ฟเวอร์มวล 400 กิโลกรัม ถูกเข็นไปตามพื้นห้องคอมพิวเตอร์ด้วยความเร่ง 0.5 เมตร/วินาที² หากไม่คิดแรงเสียดทาน จงหาแรงในแนวราบที่ใช้เข็นตู้",
        "difficulty": "EASY",
        "formulaUsed": "F = m · a",
        "explanationTh": "จากกฎการเคลื่อนที่ข้อที่ 2 ของนิวตัน F = m · a\nแทนค่า: F = 400 kg × 0.5 m/s² = 200 N\nดังนั้น แรงที่กระทำคือ 200 นิวตัน (Option A ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "200 N",
                "contentTh": "200 นิวตัน",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "400 N",
                "contentTh": "400 นิวตัน",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "800 N",
                "contentTh": "800 นิวตัน",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "100 N",
                "contentTh": "100 นิวตัน",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Work, Energy and Power",
        "questionText": "An electric hoist lifts a 150 kg transformer vertically by 4 meters in 10 seconds. Taking g = 9.8 m/s², what is the mechanical power output?",
        "questionTextTh": "รอกไฟฟ้ายกหม้อแปลงมวล 150 กิโลกรัม ขึ้นในแนวดิ่งเป็นระยะ 4 เมตร ในเวลา 10 วินาที (กำหนด g = 9.8 m/s²) กำลังทางกลที่รอกทำได้คือเท่าใด?",
        "difficulty": "MEDIUM",
        "formulaUsed": "P = W / t = (m · g · h) / t",
        "explanationTh": "งานที่ทำ: W = m · g · h = 150 kg × 9.8 m/s² × 4 m = 5,880 จูล\nกำลัง: P = W / t = 5,880 J / 10 s = 588 วัตต์ (Option B ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "294 W",
                "contentTh": "294 วัตต์",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "588 W",
                "contentTh": "588 วัตต์",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "1,470 W",
                "contentTh": "1,470 วัตต์",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "5,880 W",
                "contentTh": "5,880 วัตต์",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Heat, Cooling and Thermodynamics",
        "questionText": "Water enters a server liquid cooling loop at 18°C and leaves at 26°C with a mass flow rate of 2 kg/s. If the specific heat capacity of water is 4,184 J/(kg·°C), what is the heat absorption rate in kW?",
        "questionTextTh": "น้ำไหลเข้าวงจรระบายความร้อนเซิร์ฟเวอร์ที่อุณหภูมิ 18°C และไหลออกที่ 26°C ด้วยอัตราการไหลเชิงมวล 2 kg/s ถ้าความจุความร้อนจำเพาะของน้ำคือ 4,184 J/(kg·°C) จงหาอัตราการดูดกลืนความร้อนในหน่วย kW",
        "difficulty": "MEDIUM",
        "formulaUsed": "Q = ṁ · c · ΔT",
        "explanationTh": "ผลต่างอุณหภูมิ: ΔT = 26 - 18 = 8°C\nอัตราความร้อน: Q = 2 kg/s × 4,184 J/(kg·°C) × 8°C = 66,944 W = 66.94 kW (Option C ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "33.47 kW",
                "contentTh": "33.47 กิโลวัตต์",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "41.84 kW",
                "contentTh": "41.84 กิโลวัตต์",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "66.94 kW",
                "contentTh": "66.94 กิโลวัตต์",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "83.68 kW",
                "contentTh": "83.68 กิโลวัตต์",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Pressure and Fluid Dynamics",
        "questionText": "Water flows through a horizontal pipe with a cross-sectional area of 0.04 m² at 2 m/s. If the pipe narrows to 0.01 m², what is the water velocity in the narrow section?",
        "questionTextTh": "น้ำไหลผ่านท่อแนวนอนที่มีพื้นที่หน้าตัด 0.04 ตร.ม. ด้วยความเร็ว 2 ม./วิ ถ้าท่อคอดลงเหลือพื้นที่หน้าตัด 0.01 ตร.ม. น้ำจะมีความเร็วเท่าใดในส่วนที่คอด?",
        "difficulty": "EASY",
        "formulaUsed": "A₁ · v₁ = A₂ · v₂ (Continuity Equation)",
        "explanationTh": "จากสมการความต่อเนื่อง: A₁ · v₁ = A₂ · v₂\n0.04 m² × 2 m/s = 0.01 m² × v₂\nv₂ = (0.04 × 2) / 0.01 = 8 m/s (Option D ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "0.5 m/s",
                "contentTh": "0.5 เมตร/วินาที",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "4.0 m/s",
                "contentTh": "4.0 เมตร/วินาที",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "6.0 m/s",
                "contentTh": "6.0 เมตร/วินาที",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "8.0 m/s",
                "contentTh": "8.0 เมตร/วินาที",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Pressure and Fluid Dynamics",
        "questionText": "What is the hydrostatic gauge pressure at the bottom of a 5-meter deep diesel storage tank filled with fuel (density ρ = 850 kg/m³, g = 9.8 m/s²)?",
        "questionTextTh": "ความดันเกจเนื่องจากน้ำหนักของเหลวที่ก้นถังเก็บน้ำมันดีเซลลึก 5 เมตร ซึ่งเต็มไปด้วยน้ำมัน (ความหนาแน่น ρ = 850 kg/m³, g = 9.8 m/s²) มีค่าเท่าใด?",
        "difficulty": "MEDIUM",
        "formulaUsed": "P = ρ · g · h",
        "explanationTh": "P = ρ · g · h = 850 kg/m³ × 9.8 m/s² × 5 m = 41,650 Pa = 41.65 kPa (Option A ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "41.65 kPa",
                "contentTh": "41.65 กิโลปาสกาล",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "49.00 kPa",
                "contentTh": "49.00 กิโลปาสกาล",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "83.30 kPa",
                "contentTh": "83.30 กิโลปาสกาล",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "101.32 kPa",
                "contentTh": "101.32 กิโลปาสกาล",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Basic Electricity and Magnetism",
        "questionText": "According to Faraday’s Law of Electromagnetic Induction, what occurs when a magnetic field passing through a closed coil changes over time?",
        "questionTextTh": "ตามกฎการเหนี่ยวนำแม่เหล็กไฟฟ้าของฟาราเดย์ จะเกิดอะไรขึ้นเมื่อสนามแม่เหล็กที่พุ่งผ่านขดลวดตัวนำปิดมีการเปลี่ยนแปลงตามเวลา?",
        "difficulty": "EASY",
        "formulaUsed": "ε = -N · (dΦ/dt)",
        "explanationTh": "การเปลี่ยนแปลงของฟลักซ์แม่เหล็กตามเวลาจะเหนี่ยวนำให้เกิดแรงเคลื่อนไฟฟ้า (EMF / Induced Voltage) ในขดลวด (Option B ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "The coil completely demagnetizes permanently",
                "th": "ขดลวดสูญเสียอำนาจแม่เหล็กถาวร",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "An electromotive force (EMF) is induced across the coil",
                "th": "เกิดแรงเคลื่อนไฟฟ้าเหนี่ยวนำ (EMF) ขึ้นในขดลวด",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "The resistance of the wire drops to absolute zero",
                "th": "ความต้านทานของเส้นลวดลดลงเป็นศูนย์สัมบูรณ์",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Electrical capacitance disappears completely",
                "th": "ความจุไฟฟ้าในวงจรหายไปโดยสิ้นเชิง",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Heat, Cooling and Thermodynamics",
        "questionText": "Which heat transfer mechanism is primarily responsible for removing heat from server heatsinks via high-velocity air movement created by fans?",
        "questionTextTh": "กลไกการถ่ายโอนความร้อนแบบใดที่เป็นกลไกหลักในการดึงความร้อนออกจากแผงระบายความร้อน (Heatsink) ของเซิร์ฟเวอร์ โดยอาศัยลมความเร็วสูงที่พัดลมสร้างขึ้น?",
        "difficulty": "EASY",
        "formulaUsed": "Convection: q = h · A · (Ts - T∞)",
        "explanationTh": "การถ่ายเทความร้อนจากผิวของแข็งไปยังของไหลที่กำลังเคลื่อนที่เรียกว่า การพาความร้อนแบบบังคับ (Forced Convection) (Option C ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Pure thermal radiation",
                "th": "การแผ่รังสีความร้อนล้วน",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Direct nuclear fission",
                "th": "ปฏิกิริยานิวเคลียร์ฟิชชัน",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Forced convection",
                "th": "การพาความร้อนแบบบังคับ (Forced convection)",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Latent heat vaporization of metal",
                "th": "ความร้อนแฝงของการกลายเป็นไอของโลหะ",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Force and Motion",
        "questionText": "An object is dropped from the top of an 80-meter communications tower. Assuming g = 9.8 m/s² and negligible air resistance, how long does it take to reach the ground?",
        "questionTextTh": "วัตถุชิ้นหนึ่งถูกปล่อยตกอย่างอิสระจากยอดเสาสื่อสารสูง 80 เมตร (กำหนด g = 9.8 m/s² และไม่คิดแรงต้านอากาศ) จะใช้เวลานานเท่าใดจึงจะตกถึงพื้นดิน?",
        "difficulty": "MEDIUM",
        "formulaUsed": "h = 0.5 · g · t²  =>  t = √(2h / g)",
        "explanationTh": "t = √(2 × 80 / 9.8) = √(160 / 9.8) = √16.326 ≈ 4.04 วินาที (Option B ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "2.86 s",
                "contentTh": "2.86 วินาที",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "4.04 s",
                "contentTh": "4.04 วินาที",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "8.16 s",
                "contentTh": "8.16 วินาที",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "16.32 s",
                "contentTh": "16.32 วินาที",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Work, Energy and Power",
        "questionText": "A backup diesel engine consumes 40 liters of fuel in one hour, delivering 150 kWh of mechanical energy. If the energy content of diesel is 36 MJ per liter, what is the engine’s thermal efficiency?",
        "questionTextTh": "เครื่องยนต์ดีเซลสำรองใช้น้ำมัน 40 ลิตรใน 1 ชม. โดยให้พลังงานกล 150 kWh ถ้าน้ำมันดีเซลมีพลังงาน 36 MJ ต่อลิตร ประสิทธิภาพเชิงความร้อนของเครื่องยนต์คือเท่าใด?",
        "difficulty": "HARD",
        "formulaUsed": "Efficiency η = E_out / E_in",
        "explanationTh": "พลังงานเข้า E_in = 40 L × 36 MJ/L = 1,440 MJ\nพลังงานออก E_out = 150 kWh × 3.6 MJ/kWh = 540 MJ\nประสิทธิภาพ η = 540 / 1,440 = 0.375 = 37.5% (Option D ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "25.0%",
                "contentTh": "25.0%",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "30.5%",
                "contentTh": "30.5%",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "33.3%",
                "contentTh": "33.3%",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "37.5%",
                "contentTh": "37.5%",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Basic Electricity and Magnetism",
        "questionText": "A copper conductor has a resistance of 0.8 Ω at 20°C. If its temperature coefficient of resistance α is 0.00393 /°C, what will its resistance be when heated to 70°C inside a crowded server rack?",
        "questionTextTh": "ตัวนำทองแดงมีความต้านทาน 0.8 Ω ที่ 20°C ถ้าสัมประสิทธิ์อุณหภูมิของความต้านทาน α คือ 0.00393 /°C ความต้านทานจะเพิ่มขึ้นเป็นเท่าใดเมื่ออุณหภูมิสูงขึ้นเป็น 70°C?",
        "difficulty": "HARD",
        "formulaUsed": "R_T = R_0 · [1 + α · (T - T_0)]",
        "explanationTh": "ΔT = 70 - 20 = 50°C\nR_T = 0.8 × [1 + 0.00393 × 50] = 0.8 × [1 + 0.1965] = 0.8 × 1.1965 = 0.957 Ω ≈ 0.96 Ω (Option A ถูกต้อง)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "0.96 Ω",
                "contentTh": "0.96 โอห์ม",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "1.24 Ω",
                "contentTh": "1.24 โอห์ม",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "1.50 Ω",
                "contentTh": "1.50 โอห์ม",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "0.82 Ω",
                "contentTh": "0.82 โอห์ม",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "A centrifugal pump delivers a flow of 0.05 m³/s of chilled water. If the water density is 1,000 kg/m³, what is the mass flow rate?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ṁ = ρ · Q = 1000 × 0.05 = 50 kg/s",
        "explanationTh": "วิธีทำและเหตุผล: ṁ = ρ · Q = 1000 × 0.05 = 50 kg/s (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "20 kg/s",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "50 kg/s",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "100 kg/s",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "500 kg/s",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What is the kinetic energy of a 20 kg flywheel rotating at a linear rim speed of 15 m/s?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "KE = 0.5 · m · v² = 0.5 × 20 × 225 = 2,250 J",
        "explanationTh": "วิธีทำและเหตุผล: KE = 0.5 · m · v² = 0.5 × 20 × 225 = 2,250 J (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "2,250 J",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "4,500 J",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "300 J",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "150 J",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "In an ideal refrigeration cycle, which component is responsible for lowering the refrigerant pressure and temperature before entering the evaporator?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Expansion valve (วาล์วขยายตัวหรือวาล์วลดความดัน) ทำหน้าที่ลดแรงดันและอุณหภูมิของสารทำความเย็น",
        "explanationTh": "วิธีทำและเหตุผล: Expansion valve (วาล์วขยายตัวหรือวาล์วลดความดัน) ทำหน้าที่ลดแรงดันและอุณหภูมิของสารทำความเย็น (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Condenser coil",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Compressor cylinder",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Expansion valve",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Cooling tower fan",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What instrument is used to determine the relative humidity by comparing wet-bulb and dry-bulb temperatures?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Psychrometer เป็นเครื่องมือวัดความชื้นที่ประกอบด้วยเทอร์โมมิเตอร์กระเปาะเปียกและกระเปาะแห้ง",
        "explanationTh": "วิธีทำและเหตุผล: Psychrometer เป็นเครื่องมือวัดความชื้นที่ประกอบด้วยเทอร์โมมิเตอร์กระเปาะเปียกและกระเปาะแห้ง (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Anemometer",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Pyrometer",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Manometer",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Psychrometer",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "If atmospheric pressure is 101.3 kPa and a Bourdon tube pressure gauge reads 350 kPa, what is the absolute pressure in the pipe?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "P_abs = P_gauge + P_atm = 350 + 101.3 = 451.3 kPa",
        "explanationTh": "วิธีทำและเหตุผล: P_abs = P_gauge + P_atm = 350 + 101.3 = 451.3 kPa (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "451.3 kPa",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "350.0 kPa",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "248.7 kPa",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "101.3 kPa",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What type of electromagnetic radiation has a wavelength just longer than visible red light and is utilized by thermal imaging cameras to inspect electrical connections?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "กล้องตรวจจับความร้อนตรวจจับรังสีอินฟราเรด (Infrared) ที่แผ่ออกมาจากวัตถุ",
        "explanationTh": "วิธีทำและเหตุผล: กล้องตรวจจับความร้อนตรวจจับรังสีอินฟราเรด (Infrared) ที่แผ่ออกมาจากวัตถุ (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Ultraviolet (UV)",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Infrared (IR)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "X-rays",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Gamma rays",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What happens to the resistance of a pure semiconductor (such as silicon) as its temperature increases?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "สารกึ่งตัวนำมีสัมประสิทธิ์อุณหภูมิแบบติดลบ (Negative Temperature Coefficient - NTC) เมื่อร้อนขึ้นความต้านทานจะลดลง",
        "explanationTh": "วิธีทำและเหตุผล: สารกึ่งตัวนำมีสัมประสิทธิ์อุณหภูมิแบบติดลบ (Negative Temperature Coefficient - NTC) เมื่อร้อนขึ้นความต้านทานจะลดลง (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Resistance increases linearly",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Resistance remains constant",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Resistance decreases",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Resistance drops instantly to zero",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "A closed air container has an initial pressure of 200 kPa at 27°C (300 K). If heated to 127°C (400 K) at constant volume, what is the final pressure?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "กฎของเกย์-ลูสแซก P₁/T₁ = P₂/T₂ => P₂ = 200 × (400/300) = 266.67 kPa",
        "explanationTh": "วิธีทำและเหตุผล: กฎของเกย์-ลูสแซก P₁/T₁ = P₂/T₂ => P₂ = 200 × (400/300) = 266.67 kPa (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "150.0 kPa",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "200.0 kPa",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "250.0 kPa",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "266.7 kPa",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What is the frequency of an electromagnetic light wave traveling in vacuum (c = 3.0 × 10⁸ m/s) with a wavelength of 1,550 nm (used in single-mode fiber)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "f = c / λ = (3.0 × 10⁸ m/s) / (1,550 × 10⁻⁹ m) = 1.935 × 10¹⁴ Hz = 193.5 THz",
        "explanationTh": "วิธีทำและเหตุผล: f = c / λ = (3.0 × 10⁸ m/s) / (1,550 × 10⁻⁹ m) = 1.935 × 10¹⁴ Hz = 193.5 THz (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1.935 × 10¹⁴ Hz (193.5 THz)",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "1.550 × 10¹² Hz",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "3.000 × 10¹⁰ Hz",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "9.800 × 10¹² Hz",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "Which law of thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "กฎข้อที่หนึ่งของอุณหพลศาสตร์คือกฎการอนุรักษ์พลังงาน (Conservation of Energy)",
        "explanationTh": "วิธีทำและเหตุผล: กฎข้อที่หนึ่งของอุณหพลศาสตร์คือกฎการอนุรักษ์พลังงาน (Conservation of Energy) (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Zeroth Law",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "First Law of Thermodynamics",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Second Law of Thermodynamics",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Third Law of Thermodynamics",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What is the buoyant force acting on a completely submerged component having a volume of 0.02 m³ in water (density 1,000 kg/m³, g = 9.8 m/s²)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "F_b = ρ · g · V = 1,000 × 9.8 × 0.02 = 196 N",
        "explanationTh": "วิธีทำและเหตุผล: F_b = ρ · g · V = 1,000 × 9.8 × 0.02 = 196 N (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "98 N",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "150 N",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "196 N",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "392 N",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What sound intensity decibel (dB) increase corresponds to a tenfold (10x) increase in sound power level in a generator test room?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "การเพิ่มขึ้นของกำลังเสียง 10 เท่า คิดเป็น ΔL = 10 · log₁₀(10) = 10 dB",
        "explanationTh": "วิธีทำและเหตุผล: การเพิ่มขึ้นของกำลังเสียง 10 เท่า คิดเป็น ΔL = 10 · log₁₀(10) = 10 dB (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "2 dB",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "3 dB",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "6 dB",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "10 dB",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "If a current of 5 amperes flows through a resistor for 2 minutes (120 seconds), what total electrical charge passes through the wire?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Q = I · t = 5 A × 120 s = 600 C",
        "explanationTh": "วิธีทำและเหตุผล: Q = I · t = 5 A × 120 s = 600 C (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "600 Coulombs",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "10 Coulombs",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "60 Coulombs",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1,200 Coulombs",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "What is the acceleration due to gravity on the surface of the Earth approximately in imperial units?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ค่า g ในระบบอังกฤษมีค่าประมาณ 32.2 ft/s² (หรือ 9.81 m/s²)",
        "explanationTh": "วิธีทำและเหตุผล: ค่า g ในระบบอังกฤษมีค่าประมาณ 32.2 ft/s² (หรือ 9.81 m/s²) (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "9.8 ft/s²",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "32.2 ft/s²",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "64.4 ft/s²",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "100 ft/s²",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_SCIENCE",
        "topicName": "Physical Science and Fluids",
        "questionText": "Which property of a fluid causes friction between adjacent fluid layers during flow inside a chiller pipe?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิทยาศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ความหนืด (Viscosity) คือแรงต้านการไหลภายในเนื้อของไหลที่ทำให้เกิดแรงเสียดทาน",
        "explanationTh": "วิธีทำและเหตุผล: ความหนืด (Viscosity) คือแรงต้านการไหลภายในเนื้อของไหลที่ทำให้เกิดแรงเสียดทาน (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Surface tension",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Capillarity",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Viscosity",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Vapor pressure",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the standard usable host count for an IPv4 subnet with a /26 prefix length (subnet mask 255.255.255.192)?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Prefix /26 มี Host bits = 32 - 26 = 6 bits\nจำนวนโฮสต์ที่ใช้ได้ = 2⁶ - 2 = 64 - 2 = 62 hosts",
        "explanationTh": "คำอธิบาย: Prefix /26 มี Host bits = 32 - 26 = 6 bits\nจำนวนโฮสต์ที่ใช้ได้ = 2⁶ - 2 = 64 - 2 = 62 hosts (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "30 hosts",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "62 hosts",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "64 hosts",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "126 hosts",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "In RAID storage architecture, which level provides block-level striping with distributed parity across a minimum of 3 drives?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "RAID 5 ใช้การกระจายข้อมูลแบบ Striping พร้อม Parity แบบกระจาย โดยต้องใช้ดิสก์อย่างน้อย 3 ลูก",
        "explanationTh": "คำอธิบาย: RAID 5 ใช้การกระจายข้อมูลแบบ Striping พร้อม Parity แบบกระจาย โดยต้องใช้ดิสก์อย่างน้อย 3 ลูก (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "RAID 0",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "RAID 1",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "RAID 5",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "RAID 10",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which optical transceiver form factor supports up to 100 Gbps network connectivity using 4 parallel channels of 25 Gbps?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "QSFP28 (Quad Small Form-factor Pluggable 28) รองรับ 4 ช่องสัญญาณความเร็วช่องละ 25 Gbps รวมเป็น 100 Gbps",
        "explanationTh": "คำอธิบาย: QSFP28 (Quad Small Form-factor Pluggable 28) รองรับ 4 ช่องสัญญาณความเร็วช่องละ 25 Gbps รวมเป็น 100 Gbps (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "SFP",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "SFP+",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "XFP",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "QSFP28",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the standard vertical rack unit height (1U) in inches and millimeters?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "1U = 1.75 นิ้ว หรือ 44.45 มิลลิเมตร เป็นมาตรฐาน EIA-310",
        "explanationTh": "คำอธิบาย: 1U = 1.75 นิ้ว หรือ 44.45 มิลลิเมตร เป็นมาตรฐาน EIA-310 (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1.75 inches (44.45 mm)",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "2.00 inches (50.80 mm)",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "1.50 inches (38.10 mm)",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1.25 inches (31.75 mm)",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which layer of the OSI 7-Layer Reference Model is responsible for end-to-end reliable transmission, flow control, and port addressing (TCP/UDP)?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Layer 4 (Transport Layer) ทำหน้าที่ควบคุมการส่งผ่านข้อมูลที่เชื่อถือได้แบบต้นทางถึงปลายทาง และจัดการพอร์ต TCP/UDP",
        "explanationTh": "คำอธิบาย: Layer 4 (Transport Layer) ทำหน้าที่ควบคุมการส่งผ่านข้อมูลที่เชื่อถือได้แบบต้นทางถึงปลายทาง และจัดการพอร์ต TCP/UDP (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Network Layer",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Transport Layer (Layer 4)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Data Link Layer",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Session Layer",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "In a high-density data center, what is the maximum recommended ambient intake temperature for server equipment according to ASHRAE A1 guidelines?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "มาตรฐาน ASHRAE แนะนำช่วงอุณหภูมิลมเข้าหน้าตู้เซิร์ฟเวอร์ที่เหมาะสม (Recommended) อยู่ระหว่าง 18°C ถึง 27°C",
        "explanationTh": "คำอธิบาย: มาตรฐาน ASHRAE แนะนำช่วงอุณหภูมิลมเข้าหน้าตู้เซิร์ฟเวอร์ที่เหมาะสม (Recommended) อยู่ระหว่าง 18°C ถึง 27°C (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "18°C (64.4°F)",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "22°C (71.6°F)",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "27°C (80.6°F)",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "35°C (95.0°F)",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which protocol operates on TCP port 443 to secure web communications with TLS encryption?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "HTTPS ใช้พอร์ต TCP 443 ในการเข้ารหัสข้อมูลเว็บด้วย TLS/SSL",
        "explanationTh": "คำอธิบาย: HTTPS ใช้พอร์ต TCP 443 ในการเข้ารหัสข้อมูลเว็บด้วย TLS/SSL (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "HTTP",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "SSH",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "FTP",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "HTTPS",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the binary representation of the decimal number 218?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "218 = 128 + 64 + 16 + 8 + 2 = (11011010)₂",
        "explanationTh": "คำอธิบาย: 218 = 128 + 64 + 16 + 8 + 2 = (11011010)₂ (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "11011010",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "11001100",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "10101010",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "11110010",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What network topology connects each server rack switch directly to every spine switch in a high-speed data center fabric?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "สถาปัตยกรรม Spine-and-Leaf ช่วยให้ Latency คงที่สม่ำเสมอในดาต้าเซ็นเตอร์",
        "explanationTh": "คำอธิบาย: สถาปัตยกรรม Spine-and-Leaf ช่วยให้ Latency คงที่สม่ำเสมอในดาต้าเซ็นเตอร์ (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Bus Topology",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Spine-and-Leaf Topology",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Ring Topology",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Token Star",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which type of memory module is non-volatile, retaining stored data even after the computer system loses power?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Flash ROM และ NVMe SSD เป็นหน่วยความจำแบบ Non-volatile ที่ข้อมูลไม่หายเมื่อไฟดับ",
        "explanationTh": "คำอธิบาย: Flash ROM และ NVMe SSD เป็นหน่วยความจำแบบ Non-volatile ที่ข้อมูลไม่หายเมื่อไฟดับ (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "DRAM DDR5",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "SRAM Cache",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "NVMe SSD / Flash ROM",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Registers",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the default subnet mask for an IPv4 Class B network address?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Class B มี Default Mask เป็น 255.255.0.0 หรือ Prefix /16",
        "explanationTh": "คำอธิบาย: Class B มี Default Mask เป็น 255.255.0.0 หรือ Prefix /16 (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "255.0.0.0",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "255.255.255.0",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "255.255.255.252",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "255.255.0.0 (/16)",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What transmission medium provides the lowest latency and highest immunity to electromagnetic interference (EMI)?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "สายใยแก้วนำแสงส่งข้อมูลด้วยลำแสงจึงไม่มีการรบกวนจากคลื่นแม่เหล็กไฟฟ้า (EMI)",
        "explanationTh": "คำอธิบาย: สายใยแก้วนำแสงส่งข้อมูลด้วยลำแสงจึงไม่มีการรบกวนจากคลื่นแม่เหล็กไฟฟ้า (EMI) (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Single-Mode Optical Fiber",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "Shielded Twisted Pair (STP)",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Coaxial Copper Cable",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Unshielded Twisted Pair (UTP)",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "In a virtualized hypervisor environment, what technology allows multiple operating systems to run concurrently on a single physical host?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Type-1 Hypervisor ติดตั้งลงบนฮาร์ดแวร์โดยตรงเพื่อจัดการเครื่องเสมือน (VM)",
        "explanationTh": "คำอธิบาย: Type-1 Hypervisor ติดตั้งลงบนฮาร์ดแวร์โดยตรงเพื่อจัดการเครื่องเสมือน (VM) (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "BIOS Firmware",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Type-1 Bare-metal Hypervisor (e.g. VMware ESXi)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Network Switch ASIC",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "ECC Register",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which data center tier classification level by Uptime Institute guarantees 99.995% availability with fault-tolerant 2(N+1) redundancy?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Tier IV เป็นระดับสูงสุดที่มีความทนทานต่อความผิดพร่อง (Fault-Tolerant) และมี Uptime 99.995%",
        "explanationTh": "คำอธิบาย: Tier IV เป็นระดับสูงสุดที่มีความทนทานต่อความผิดพร่อง (Fault-Tolerant) และมี Uptime 99.995% (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Tier I",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Tier II",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Tier IV",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Tier III",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What protocol is commonly used by network monitoring tools to poll bandwidth utilization and temperature statistics from routers and switches?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "SNMP (Simple Network Management Protocol) พอร์ต UDP 161 ใช้เฝ้าระวังอุปกรณ์เน็ตเวิร์ก",
        "explanationTh": "คำอธิบาย: SNMP (Simple Network Management Protocol) พอร์ต UDP 161 ใช้เฝ้าระวังอุปกรณ์เน็ตเวิร์ก (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "SMTP",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "POP3",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "BGP",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "SNMP (Simple Network Management Protocol)",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "How many total addresses are contained in a /28 IPv4 subnet block?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Prefix /28 มี Host bits = 32 - 28 = 4 bits -> 2⁴ = 16 addresses (ใช้ได้จริง 14 hosts)",
        "explanationTh": "คำอธิบาย: Prefix /28 มี Host bits = 32 - 28 = 4 bits -> 2⁴ = 16 addresses (ใช้ได้จริง 14 hosts) (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "16 addresses",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "8 addresses",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "32 addresses",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "64 addresses",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which storage interface technology provides the lowest access latency by connecting flash SSDs directly to PCIe lanes?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "NVMe เชื่อมต่อกับบัส PCIe โดยตรง ทำให้มีความหน่วงเวลาต่ำมาก",
        "explanationTh": "คำอธิบาย: NVMe เชื่อมต่อกับบัส PCIe โดยตรง ทำให้มีความหน่วงเวลาต่ำมาก (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "SATA III (6 Gbps)",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "NVMe (Non-Volatile Memory Express)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "SCSI Parallel",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "IDE Ribbon",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What type of fiber optic connector is most commonly used in high-density data center MPO/MTP trunk cables for 40G and 100G optics?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "MPO/MTP เชื่อมต่อเส้นใยแก้ว 8, 12 หรือ 24 คอร์พร้อมกันในหัวต่อเดียว",
        "explanationTh": "คำอธิบาย: MPO/MTP เชื่อมต่อเส้นใยแก้ว 8, 12 หรือ 24 คอร์พร้อมกันในหัวต่อเดียว (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "ST Connector",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "SC Simplex",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "MPO / MTP Multi-fiber Connector",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "RJ-11 Connector",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "In computer architecture, what does ECC (Error-Correcting Code) memory accomplish on high-reliability server motherboards?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ECC RAM ตรวจจับและแก้ไขข้อผิดพลาดแบบ single-bit error ได้ทันทีโดยไม่ทำให้เครื่องแครช",
        "explanationTh": "คำอธิบาย: ECC RAM ตรวจจับและแก้ไขข้อผิดพลาดแบบ single-bit error ได้ทันทีโดยไม่ทำให้เครื่องแครช (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Increases clock speed by 50%",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Compresses data on the fly",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Acts as a secondary hard drive",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Detects and corrects single-bit memory errors",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the binary representation of the hexadecimal value 0x3F?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "0x3 = 0011, 0xF = 1111 => 00111111 (เท่ากับ 63 ในฐานสิบ)",
        "explanationTh": "คำอธิบาย: 0x3 = 0011, 0xF = 1111 => 00111111 (เท่ากับ 63 ในฐานสิบ) (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "00111111",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "00110011",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "11110000",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "00011111",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which command-line utility tests the reachability of a host on an Internet Protocol (IP) network using ICMP echo requests?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "คำสั่ง ping ส่งแพ็กเก็ต ICMP Echo Request เพื่อทดสอบการเชื่อมต่อไปยังโฮสต์ปลายทาง",
        "explanationTh": "คำอธิบาย: คำสั่ง ping ส่งแพ็กเก็ต ICMP Echo Request เพื่อทดสอบการเชื่อมต่อไปยังโฮสต์ปลายทาง (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "traceroute",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "ping",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "netstat",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "nslookup",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the purpose of an Out-of-Band (OOB) management interface such as IPMI or iDRAC on a server?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "IPMI/iDRAC มีโปรเซสเซอร์แยกอิสระ สามารถสั่งเปิด-ปิด รีบูต และดูหน้าจอเซิร์ฟเวอร์จากระยะไกลได้",
        "explanationTh": "คำอธิบาย: IPMI/iDRAC มีโปรเซสเซอร์แยกอิสระ สามารถสั่งเปิด-ปิด รีบูต และดูหน้าจอเซิร์ฟเวอร์จากระยะไกลได้ (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Increases network download speed",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Provides graphic acceleration",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Allows remote control of the server even when the OS is crashed or powered down",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Encrypts user passwords",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the IEEE standard specification for Ethernet over twisted pair cable operating at 10 Gigabits per second?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "10GBASE-T เป็นมาตรฐานอีเทอร์เน็ตความเร็ว 10 Gbps บนสายทองแดงคู่ตีเกลียว Cat6A",
        "explanationTh": "คำอธิบาย: 10GBASE-T เป็นมาตรฐานอีเทอร์เน็ตความเร็ว 10 Gbps บนสายทองแดงคู่ตีเกลียว Cat6A (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1000BASE-T",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "100BASE-TX",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "10BASE2",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "10GBASE-T",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "Which database model organizes data into structured tables consisting of rows and columns with defined foreign key constraints?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "RDBMS (เช่น PostgreSQL, MySQL) จัดเก็บข้อมูลเป็นตารางที่มีความสัมพันธ์ระหว่างกัน",
        "explanationTh": "คำอธิบาย: RDBMS (เช่น PostgreSQL, MySQL) จัดเก็บข้อมูลเป็นตารางที่มีความสัมพันธ์ระหว่างกัน (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Relational Database Management System (RDBMS)",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "Key-Value NoSQL Store",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Graph Database",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Document Store",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_TECH",
        "topicName": "Computer Technology and Networks",
        "questionText": "What is the hexadecimal representation of the 8-bit binary number 10101111?",
        "questionTextTh": "เลือกคำตอบทางเทคโนโลยีคอมพิวเตอร์และเครือข่ายที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "1010 = 10 = A, 1111 = 15 = F => 0xAF",
        "explanationTh": "คำอธิบาย: 1010 = 10 = A, 1111 = 15 = F => 0xAF (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "0x9E",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "0xAF",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "0xBF",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "0xA5",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "An electric heating coil connected to a 230 V single-phase AC source draws a current of 10 A. What is its electrical resistance?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "จากกฎของโอห์ม: R = V / I = 230 V / 10 A = 23 Ω",
        "explanationTh": "วิธีทำและเหตุผล: จากกฎของโอห์ม: R = V / I = 230 V / 10 A = 23 Ω (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "2.3 Ω",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "230 Ω",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "23 Ω",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "2,300 Ω",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "In a three-phase balanced electrical system with line voltage V_L = 400 V, line current I_L = 50 A, and a power factor cos(θ) = 0.85, what is the total active real power in kW?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "P = √3 · V_L · I_L · cos(θ) = 1.732 × 400 × 50 × 0.85 = 29,444 W ≈ 29.44 kW",
        "explanationTh": "วิธีทำและเหตุผล: P = √3 · V_L · I_L · cos(θ) = 1.732 × 400 × 50 × 0.85 = 29,444 W ≈ 29.44 kW (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "29.44 kW",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "17.00 kW",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "34.00 kW",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "51.00 kW",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A gearbox reduces rotational speed from 1,800 RPM at the input shaft to 300 RPM at the output shaft. What is the gear reduction ratio?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Gear Ratio = Speed_in / Speed_out = 1,800 / 300 = 6 : 1",
        "explanationTh": "วิธีทำและเหตุผล: Gear Ratio = Speed_in / Speed_out = 1,800 / 300 = 6 : 1 (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "3 : 1",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "6 : 1",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "1 : 6",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "9 : 1",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A UPS system rated at 200 kVA operates at a power factor of 0.9 lagging. What is the maximum real active power capacity it can supply to servers in kW?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Real Power P = kVA × PF = 200 × 0.9 = 180 kW",
        "explanationTh": "วิธีทำและเหตุผล: Real Power P = kVA × PF = 200 × 0.9 = 180 kW (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "222 kW",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "200 kW",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "180 kW",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "160 kW",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What is the total equivalent resistance of three 12 Ω resistors connected in parallel across a power bus?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "1/R_total = 1/12 + 1/12 + 1/12 = 3/12 = 1/4 => R_total = 4 Ω",
        "explanationTh": "วิธีทำและเหตุผล: 1/R_total = 1/12 + 1/12 + 1/12 = 3/12 = 1/4 => R_total = 4 Ω (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "36 Ω",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "12 Ω",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "6 Ω",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "4 Ω",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A 4-pole AC induction motor is powered by a 50 Hz power supply. What is its theoretical synchronous speed in RPM?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "N_sync = (120 · f) / P = (120 × 50) / 4 = 6,000 / 4 = 1,500 RPM",
        "explanationTh": "วิธีทำและเหตุผล: N_sync = (120 · f) / P = (120 × 50) / 4 = 6,000 / 4 = 1,500 RPM (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1,500 RPM",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "3,000 RPM",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "1,800 RPM",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1,000 RPM",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What type of circuit protection device uses a bimetallic strip to protect against sustained overloads and an electromagnet for instant short-circuit tripping?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "MCB แบบ Thermal-Magnetic ใช้แผ่นไบเมทัลตัดเมื่อโหลดเกินสะสม และใช้ขดลวดแม่เหล็กตัดทันทีเมื่อไฟลัดวงจร",
        "explanationTh": "วิธีทำและเหตุผล: MCB แบบ Thermal-Magnetic ใช้แผ่นไบเมทัลตัดเมื่อโหลดเกินสะสม และใช้ขดลวดแม่เหล็กตัดทันทีเมื่อไฟลัดวงจร (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Cartridge glass fuse",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Thermal-Magnetic Miniature Circuit Breaker (MCB)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Static bypass contactor",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Ferrite bead choke",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "In an AC power system, what is the relationship between apparent power (S in kVA), real power (P in kW), and reactive power (Q in kVAR)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "ตามสามเหลี่ยมกำลังไฟฟ้า (Power Triangle): กำลังปรากฏ S² = P² + Q²",
        "explanationTh": "วิธีทำและเหตุผล: ตามสามเหลี่ยมกำลังไฟฟ้า (Power Triangle): กำลังปรากฏ S² = P² + Q² (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "S = P + Q",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "S = P - Q",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "S = √(P² + Q²)",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "S = (P · Q) / 2",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A step-down transformer has 2,400 primary winding turns and 240 secondary turns. If the input primary voltage is 2,400 V, what is the output secondary voltage?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "V_s / V_p = N_s / N_p => V_s = 2,400 × (240 / 2,400) = 240 V",
        "explanationTh": "วิธีทำและเหตุผล: V_s / V_p = N_s / N_p => V_s = 2,400 × (240 / 2,400) = 240 V (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "24 V",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "120 V",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "480 V",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "240 V",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A server rack draws 16 A at 230 V continuously. If electricity costs 4.5 Baht per kWh, what is the cost of running this rack for 30 days (720 hours)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "P = 230 V × 16 A = 3,680 W = 3.68 kW\nพลังงาน = 3.68 kW × 720 h = 2,649.6 kWh\nค่าไฟ = 2,649.6 kWh × 4.5 บาท = 11,923.20 บาท",
        "explanationTh": "วิธีทำและเหตุผล: P = 230 V × 16 A = 3,680 W = 3.68 kW\nพลังงาน = 3.68 kW × 720 h = 2,649.6 kWh\nค่าไฟ = 2,649.6 kWh × 4.5 บาท = 11,923.20 บาท (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "11,923.20 Baht",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "8,240.00 Baht",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "5,184.00 Baht",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "14,500.00 Baht",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What mechanical device converts electrical pulses into precise rotational angle increments, commonly used in automated valve controls and robotics?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Stepper Motor หมุนเป็นสเต็ปตามจำนวนพัลส์สัญญาณไฟฟ้า นิยมใช้ในการควบคุมตำแหน่งที่แม่นยำ",
        "explanationTh": "วิธีทำและเหตุผล: Stepper Motor หมุนเป็นสเต็ปตามจำนวนพัลส์สัญญาณไฟฟ้า นิยมใช้ในการควบคุมตำแหน่งที่แม่นยำ (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Single-phase Induction Motor",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Stepper Motor",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Shaded-pole Fan Motor",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Series DC Universal Motor",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "In a DC circuit, two 12 V batteries with 100 Ah capacity each are connected in series. What is the resulting voltage and total energy capacity?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "ต่อแบบอนุกรม (Series): แรงดันบวกกัน V = 12 + 12 = 24 V แต่พิกัดกระแส Ah คงเดิมที่ 100 Ah",
        "explanationTh": "วิธีทำและเหตุผล: ต่อแบบอนุกรม (Series): แรงดันบวกกัน V = 12 + 12 = 24 V แต่พิกัดกระแส Ah คงเดิมที่ 100 Ah (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "12 V and 200 Ah",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "24 V and 200 Ah",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "24 V and 100 Ah (2,400 Wh)",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "12 V and 100 Ah",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What is the primary function of an automatic transfer switch (ATS) in emergency facility engineering?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "สวิตช์ ATS ทำหน้าที่ตรวจสอบแรงดันไฟฟ้าหลวง และสั่งสตาร์ทพร้อมสลับโหลดไปหาเครื่องกำเนิดไฟฟ้าโดยอัตโนมัติ",
        "explanationTh": "วิธีทำและเหตุผล: สวิตช์ ATS ทำหน้าที่ตรวจสอบแรงดันไฟฟ้าหลวง และสั่งสตาร์ทพร้อมสลับโหลดไปหาเครื่องกำเนิดไฟฟ้าโดยอัตโนมัติ (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Regulates voltage frequency to 60 Hz",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Acts as a surge protector",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Inverts DC battery current to AC",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Switches load from failed utility mains to standby generator",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A hydraulic piston with an area of 0.05 m² exerts a force of 2,500 N. What is the hydraulic pressure inside the fluid cylinder?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "P = F / A = 2,500 N / 0.05 m² = 50,000 Pa = 50 kPa",
        "explanationTh": "วิธีทำและเหตุผล: P = F / A = 2,500 N / 0.05 m² = 50,000 Pa = 50 kPa (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "50,000 Pa (50 kPa)",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "25,000 Pa",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "12,500 Pa",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "125,000 Pa",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What is the purpose of grounding (earthing) the conductive metal chassis of all servers and electrical cabinets?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "การต่อสายดินช่วยให้กระแสไฟฟ้ารั่วไหลลงดินได้อย่างปลอดภัยและทำให้เบรกเกอร์ตัดวงจรทันที",
        "explanationTh": "วิธีทำและเหตุผล: การต่อสายดินช่วยให้กระแสไฟฟ้ารั่วไหลลงดินได้อย่างปลอดภัยและทำให้เบรกเกอร์ตัดวงจรทันที (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Increases computational processing speed",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Prevents shock hazard by providing a low-impedance fault current path to ground",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Saves electricity costs by 20%",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Prevents dust accumulation on the fan",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "If a 100 kVA three-phase transformer has an efficiency of 98% at full load, how much heat power must be dissipated into the transformer room in kW?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "การสูญเสีย P_loss = P_in × (1 - η) = 100 kW × (1 - 0.98) = 2 kW (ซึ่งจะกลายเป็นความร้อนในห้อง)",
        "explanationTh": "วิธีทำและเหตุผล: การสูญเสีย P_loss = P_in × (1 - η) = 100 kW × (1 - 0.98) = 2 kW (ซึ่งจะกลายเป็นความร้อนในห้อง) (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "98 kW",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "5 kW",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "2 kW (assuming PF = 1.0)",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "0.2 kW",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "In mechanical engineering, what is the torque produced by a 50 N force applied perpendicularly at the end of a 0.4-meter wrench?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Torque τ = F · r = 50 N × 0.4 m = 20 N·m",
        "explanationTh": "วิธีทำและเหตุผล: Torque τ = F · r = 50 N × 0.4 m = 20 N·m (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "200 N·m",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "12.5 N·m",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "50 N·m",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "20 N·m",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A capacitor has a capacitance of 100 µF. When connected across a 200 V DC power supply, what total electric charge is stored in the capacitor?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Q = C · V = (100 × 10⁻⁶ F) × 200 V = 0.02 C",
        "explanationTh": "วิธีทำและเหตุผล: Q = C · V = (100 × 10⁻⁶ F) × 200 V = 0.02 C (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "0.02 Coulombs",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "0.005 Coulombs",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "2.0 Coulombs",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "20 Coulombs",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "Which type of UPS topology continuously converts AC utility to DC, and then inverts DC back to clean AC, providing zero transfer time upon outage?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "Online Double Conversion แปลงไฟ AC->DC->AC ตลอดเวลา จึงไม่มีระยะเวลาสลับไฟ (Zero transfer time)",
        "explanationTh": "วิธีทำและเหตุผล: Online Double Conversion แปลงไฟ AC->DC->AC ตลอดเวลา จึงไม่มีระยะเวลาสลับไฟ (Zero transfer time) (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Standby (Offline) UPS",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Online Double Conversion UPS",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Line-Interactive UPS",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Ferroresonant Regulator",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What component in a refrigeration system absorbs heat from the server room air, causing liquid refrigerant to boil into vapor?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "คอยล์เย็น (Evaporator) รับความร้อนจากอากาศในห้องเซิร์ฟเวอร์ ทำให้น้ำยาแอร์เดือดกลายเป็นไอ",
        "explanationTh": "วิธีทำและเหตุผล: คอยล์เย็น (Evaporator) รับความร้อนจากอากาศในห้องเซิร์ฟเวอร์ ทำให้น้ำยาแอร์เดือดกลายเป็นไอ (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Compressor cylinder",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Condenser fan",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Evaporator coil",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "Filter drier",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What electrical quantity is measured by connecting an ohmmeter directly across a component that is completely de-energized?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "การวัดความต้านทานด้วยโอห์มมิเตอร์ต้องตัดกระแสไฟฟ้าออกจากวงจรก่อนเสมอ",
        "explanationTh": "วิธีทำและเหตุผล: การวัดความต้านทานด้วยโอห์มมิเตอร์ต้องตัดกระแสไฟฟ้าออกจากวงจรก่อนเสมอ (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Voltage (V)",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Current (A)",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "Power (W)",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Resistance (Ω)",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A lever has an effort arm of 1.5 meters and a load arm of 0.3 meters. What is the theoretical mechanical advantage (MA) of this lever?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "MA = Effort Arm / Load Arm = 1.5 m / 0.3 m = 5.0",
        "explanationTh": "วิธีทำและเหตุผล: MA = Effort Arm / Load Arm = 1.5 m / 0.3 m = 5.0 (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "5.0",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "0.2",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "4.5",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1.8",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What is the primary cause of galvanic corrosion in liquid cooling plumbing?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "การสัมผัสกันของโลหะต่างชนิด (เช่น ทองแดงกับอะลูมิเนียม) ในน้ำยาหล่อเย็นจะเกิดปฏิกิริยากัดกร่อนทางเคมีไฟฟ้า",
        "explanationTh": "วิธีทำและเหตุผล: การสัมผัสกันของโลหะต่างชนิด (เช่น ทองแดงกับอะลูมิเนียม) ในน้ำยาหล่อเย็นจะเกิดปฏิกิริยากัดกร่อนทางเคมีไฟฟ้า (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "Excessive air circulation in the room",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "Direct contact between two dissimilar metals in the presence of an electrolyte",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "Freezing temperatures in winter",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "Low electrical resistance in copper",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "A 3-phase induction motor has a full load current of 30 A. According to engineering practice, what is the typical recommended circuit breaker rating (125-150% of FLA)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "พิกัดเบรกเกอร์ป้องกันมอเตอร์มักเลือกที่ 125% - 150% ของกระแสโหลดเต็มพิกัด (30 × 1.25 = 37.5A ถึง 45A)",
        "explanationTh": "วิธีทำและเหตุผล: พิกัดเบรกเกอร์ป้องกันมอเตอร์มักเลือกที่ 125% - 150% ของกระแสโหลดเต็มพิกัด (30 × 1.25 = 37.5A ถึง 45A) (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "20 A",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "30 A",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "40 A to 45 A",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "100 A",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_ENG",
        "topicName": "Electrical and Mechanical Engineering",
        "questionText": "What happens to the total capacitance when two 50 µF capacitors are connected in parallel?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางวิศวกรรมที่ถูกต้อง",
        "difficulty": "HARD",
        "formulaUsed": "ตัวเก็บประจุต่อขนานกัน ค่าความจุจะบวกกัน: C_total = C₁ + C₂ = 50 + 50 = 100 µF",
        "explanationTh": "วิธีทำและเหตุผล: ตัวเก็บประจุต่อขนานกัน ค่าความจุจะบวกกัน: C_total = C₁ + C₂ = 50 + 50 = 100 µF (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "25 µF",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "50 µF",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "75 µF",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "100 µF",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A data center has a total facility power consumption of 1,200 kW, while its IT server equipment draws 960 kW. What is its Power Usage Effectiveness (PUE)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "PUE = Total Facility Power / IT Equipment Power = 1,200 kW / 960 kW = 1.25",
        "explanationTh": "วิธีทำและเหตุผล: PUE = Total Facility Power / IT Equipment Power = 1,200 kW / 960 kW = 1.25 (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1.25",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "1.45",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "0.80",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1.15",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "Solve for x in the linear algebraic equation: 4x - 18 = 2x + 14",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "4x - 2x = 14 + 18 => 2x = 32 => x = 16",
        "explanationTh": "วิธีทำและเหตุผล: 4x - 2x = 14 + 18 => 2x = 32 => x = 16 (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "x = 8",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "x = 16",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "x = 32",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "x = -16",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A server rack cabinet has a rectangular base with a width of 0.6 meters and a depth of 1.2 meters. What is the total footprint area occupied by 20 identical server racks?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "พื้นที่ต่อแร็ค = 0.6 × 1.2 = 0.72 m²\nพื้นที่ 20 แร็ค = 20 × 0.72 = 14.4 m²",
        "explanationTh": "วิธีทำและเหตุผล: พื้นที่ต่อแร็ค = 0.6 × 1.2 = 0.72 m²\nพื้นที่ 20 แร็ค = 20 × 0.72 = 14.4 m² (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "7.2 m²",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "24.0 m²",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "14.4 m²",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "18.8 m²",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "If 1 inch is equal to exactly 25.4 mm, how many millimeters are there in a standard 19-inch server rack width?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "19 inches × 25.4 mm/inch = 482.6 mm",
        "explanationTh": "วิธีทำและเหตุผล: 19 inches × 25.4 mm/inch = 482.6 mm (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "450.0 mm",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "475.2 mm",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "500.0 mm",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "482.6 mm",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A cooling water storage tank holds 5,000 liters. If water is drained at a constant rate of 125 liters per minute, how many minutes will it take to empty the tank completely?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "เวลา = 5,000 L / 125 L/min = 40 minutes",
        "explanationTh": "วิธีทำและเหตุผล: เวลา = 5,000 L / 125 L/min = 40 minutes (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "40 minutes",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "25 minutes",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "50 minutes",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "60 minutes",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "The average temperature of 5 sensors in a cold aisle is recorded as: 21°C, 22°C, 20°C, 25°C, and 22°C. What is the mean (average) temperature?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Mean = (21 + 22 + 20 + 25 + 22) / 5 = 110 / 5 = 22.0°C",
        "explanationTh": "วิธีทำและเหตุผล: Mean = (21 + 22 + 20 + 25 + 22) / 5 = 110 / 5 = 22.0°C (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "21.5°C",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "22.0°C",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "22.5°C",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "23.0°C",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A fuel tank is 35% full and contains 700 liters of diesel. What is the total maximum capacity of the tank when full?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ความจุรวม = 700 / 0.35 = 2,000 ลิตร",
        "explanationTh": "วิธีทำและเหตุผล: ความจุรวม = 700 / 0.35 = 2,000 ลิตร (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1,500 liters",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "1,800 liters",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "2,000 liters",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "2,400 liters",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "What is the hypotenuse length of a right-angled triangle cable tray support bracket with legs of 9 cm and 12 cm?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "จากทฤษฎีบทพีทาโกรัส: c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm",
        "explanationTh": "วิธีทำและเหตุผล: จากทฤษฎีบทพีทาโกรัส: c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "21 cm",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "18 cm",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "13 cm",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "15 cm",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "In a batch of 500 network patch cables, quality control inspectors found that 15 cables were defective. What is the defect rate percentage?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Defect Rate = (15 / 500) × 100% = 3.0%",
        "explanationTh": "วิธีทำและเหตุผล: Defect Rate = (15 / 500) × 100% = 3.0% (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "3.0%",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "1.5%",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "5.0%",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "0.3%",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "Convert a temperature of 77° Fahrenheit to Celsius using the conversion formula: C = (F - 32) × 5/9.",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "C = (77 - 32) × 5/9 = 45 × 5/9 = 25°C",
        "explanationTh": "วิธีทำและเหตุผล: C = (77 - 32) × 5/9 = 45 × 5/9 = 25°C (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "20°C",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "25°C",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "30°C",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "35°C",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "If the ratio of technicians to engineers in a facility is 5 : 2 and there are 14 engineers, how many technicians are employed?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "จำนวนช่างเทคนิค = (14 / 2) × 5 = 7 × 5 = 35 คน",
        "explanationTh": "วิธีทำและเหตุผล: จำนวนช่างเทคนิค = (14 / 2) × 5 = 7 × 5 = 35 คน (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "28 technicians",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "30 technicians",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "35 technicians",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "45 technicians",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "Solve the quadratic equation: x² - 7x + 12 = 0",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "(x - 3)(x - 4) = 0 => x = 3 หรือ x = 4",
        "explanationTh": "วิธีทำและเหตุผล: (x - 3)(x - 4) = 0 => x = 3 หรือ x = 4 (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "x = 2, x = 6",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "x = -3, x = -4",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "x = 1, x = 12",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "x = 3, x = 4",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A cylindrical water tank has an internal radius of 2 meters and a height of 5 meters. Using π ≈ 3.1416, what is its internal volume in cubic meters (m³)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "V = π · r² · h = 3.1416 × (2)² × 5 = 3.1416 × 4 × 5 = 62.83 m³",
        "explanationTh": "วิธีทำและเหตุผล: V = π · r² · h = 3.1416 × (2)² × 5 = 3.1416 × 4 × 5 = 62.83 m³ (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "62.83 m³",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "31.42 m²",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "125.66 m³",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "50.00 m³",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "The price of an electrical transformer increased from 160,000 Baht to 184,000 Baht. What was the percentage increase?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "เพิ่มขึ้น = (184,000 - 160,000) / 160,000 × 100% = 24,000 / 160,000 = 15.0%",
        "explanationTh": "วิธีทำและเหตุผล: เพิ่มขึ้น = (184,000 - 160,000) / 160,000 × 100% = 24,000 / 160,000 = 15.0% (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "12.5%",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "15.0%",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "18.0%",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "24.0%",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "If 6 technicians can wire 18 server racks in 4 days, how many server racks can 8 technicians wire in 6 days at the same work rate?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "อัตราการทำงานต่อคนต่อวัน = 18 / (6 × 4) = 18 / 24 = 0.75 ตู้/คน-วัน\nงาน = 8 คน × 6 วัน × 0.75 = 36 ตู้",
        "explanationTh": "วิธีทำและเหตุผล: อัตราการทำงานต่อคนต่อวัน = 18 / (6 × 4) = 18 / 24 = 0.75 ตู้/คน-วัน\nงาน = 8 คน × 6 วัน × 0.75 = 36 ตู้ (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "24 racks",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "30 racks",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "36 racks",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "48 racks",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "What is the median of the following set of server rack power readings (kW): 4.2, 5.1, 3.8, 6.4, 4.9, 5.8, 4.5?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "เรียงลำดับจากน้อยไปมาก: 3.8, 4.2, 4.5, [4.9], 5.1, 5.8, 6.4\nค่ามัธยฐาน (ตัวที่ 4) คือ 4.9 kW",
        "explanationTh": "วิธีทำและเหตุผล: เรียงลำดับจากน้อยไปมาก: 3.8, 4.2, 4.5, [4.9], 5.1, 5.8, 6.4\nค่ามัธยฐาน (ตัวที่ 4) คือ 4.9 kW (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "4.5 kW",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "4.8 kW",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "5.1 kW",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "4.9 kW",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A server hard drive array transfers data at 250 MB/s. How many seconds will it take to transfer a 75 GB database file (1 GB = 1,000 MB)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "75 GB = 75,000 MB\nเวลา = 75,000 MB / 250 MB/s = 300 seconds",
        "explanationTh": "วิธีทำและเหตุผล: 75 GB = 75,000 MB\nเวลา = 75,000 MB / 250 MB/s = 300 seconds (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "300 seconds (5 minutes)",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "150 seconds",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "600 seconds",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "450 seconds",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "What is the probability of rolling a sum of 7 using two standard six-sided dice?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "ผลรวมที่เป็น 7 มี 6 วิธี: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) จากทั้งหมด 36 วิธี -> 6/36 = 1/6",
        "explanationTh": "วิธีทำและเหตุผล: ผลรวมที่เป็น 7 มี 6 วิธี: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) จากทั้งหมด 36 วิธี -> 6/36 = 1/6 (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1 / 12",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "1 / 6 (16.67%)",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "7 / 36",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "1 / 4",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "If y varies directly with x, and y = 45 when x = 9, what is the value of y when x = 16?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "y = k · x => k = 45 / 9 = 5\nเมื่อ x = 16 => y = 5 × 16 = 80",
        "explanationTh": "วิธีทำและเหตุผล: y = k · x => k = 45 / 9 = 5\nเมื่อ x = 16 => y = 5 × 16 = 80 (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "64",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "75",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "80",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "90",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A rectangular air duct has a cross-section of 60 cm by 40 cm. What is its cross-sectional area in square meters (m²)?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Area = 0.6 m × 0.4 m = 0.24 m²",
        "explanationTh": "วิธีทำและเหตุผล: Area = 0.6 m × 0.4 m = 0.24 m² (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "2.40 m²",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "0.024 m²",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "0.12 m²",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "0.24 m²",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "What is the simple interest earned on an investment of 500,000 Baht at an annual interest rate of 4% over 3 years?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Interest I = P · r · t = 500,000 × 0.04 × 3 = 60,000 บาท",
        "explanationTh": "วิธีทำและเหตุผล: Interest I = P · r · t = 500,000 × 0.04 × 3 = 60,000 บาท (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "60,000 Baht",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "20,000 Baht",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "40,000 Baht",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "75,000 Baht",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "Simplify the algebraic expression: (3x²y³) · (4x⁴y)",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "3 × 4 = 12, x^(2+4) = x⁶, y^(3+1) = y⁴ => 12x⁶y⁴",
        "explanationTh": "วิธีทำและเหตุผล: 3 × 4 = 12, x^(2+4) = x⁶, y^(3+1) = y⁴ => 12x⁶y⁴ (คำตอบที่ถูกต้องคือข้อ B)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "7x⁶y⁴",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "12x⁶y⁴",
                "isCorrect": true
            },
            {
                "optionKey": "C",
                "contentEn": "12x⁸y³",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "7x⁸y⁴",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "A circle has a diameter of 14 meters. Using π ≈ 22/7, what is its circumference?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "Circumference = π · d = (22/7) × 14 = 44 m",
        "explanationTh": "วิธีทำและเหตุผล: Circumference = π · d = (22/7) × 14 = 44 m (คำตอบที่ถูกต้องคือข้อ C)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "28 meters",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "88 meters",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "44 meters",
                "isCorrect": true
            },
            {
                "optionKey": "D",
                "contentEn": "154 meters",
                "isCorrect": false
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "Evaluate the expression: 15 + 5 × (8 - 3)² / 5",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "8 - 3 = 5; 5² = 25; 5 × 25 = 125; 125 / 5 = 25; 15 + 25 = 40",
        "explanationTh": "วิธีทำและเหตุผล: 8 - 3 = 5; 5² = 25; 5 × 25 = 125; 125 / 5 = 25; 15 + 25 = 40 (คำตอบที่ถูกต้องคือข้อ D)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "100",
                "isCorrect": false
            },
            {
                "optionKey": "B",
                "contentEn": "25",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "60",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "40",
                "isCorrect": true
            }
        ]
    },
    {
        "categoryCode": "STEM_MATH",
        "topicName": "Mathematics and Calculation",
        "questionText": "If log₁₀(x) = 3, what is the value of x?",
        "questionTextTh": "คำนวณและเลือกคำตอบทางคณิตศาสตร์ที่ถูกต้อง",
        "difficulty": "MEDIUM",
        "formulaUsed": "x = 10³ = 1,000",
        "explanationTh": "วิธีทำและเหตุผล: x = 10³ = 1,000 (คำตอบที่ถูกต้องคือข้อ A)",
        "options": [
            {
                "optionKey": "A",
                "contentEn": "1,000",
                "isCorrect": true
            },
            {
                "optionKey": "B",
                "contentEn": "30",
                "isCorrect": false
            },
            {
                "optionKey": "C",
                "contentEn": "100",
                "isCorrect": false
            },
            {
                "optionKey": "D",
                "contentEn": "300",
                "isCorrect": false
            }
        ]
    }
];
