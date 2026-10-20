"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const categories_1 = require("./seedData/categories");
const achievements_1 = require("./seedData/achievements");
const lessons_1 = require("./seedData/lessons");
const vocabularies_1 = require("./seedData/vocabularies");
const toeicQuestions_1 = require("./seedData/toeicQuestions");
const stemQuestions_1 = require("./seedData/stemQuestions");
const logicQuestions_1 = require("./seedData/logicQuestions");
const personalityQuestions_1 = require("./seedData/personalityQuestions");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('=======================================================');
    console.log('  STARTING SEED: English & STEM Learning Academy');
    console.log('=======================================================');
    // 1. Seed Categories
    console.log('-> Seeding Categories...');
    for (const cat of categories_1.categoriesData) {
        await prisma.category.upsert({
            where: { code: cat.code },
            create: {
                code: cat.code,
                name: cat.name,
                nameTh: cat.nameTh,
                section: cat.section,
            },
            update: {
                name: cat.name,
                nameTh: cat.nameTh,
                section: cat.section,
            },
        });
    }
    console.log(`✓ Seeded ${categories_1.categoriesData.length} Categories.`);
    // 2. Seed Topics
    console.log('-> Seeding Topics...');
    for (const top of categories_1.topicsData) {
        const cat = await prisma.category.findUnique({ where: { code: top.categoryCode } });
        if (cat) {
            const existing = await prisma.topic.findFirst({
                where: { categoryId: cat.id, name: top.name },
            });
            if (!existing) {
                await prisma.topic.create({
                    data: {
                        categoryId: cat.id,
                        name: top.name,
                        nameTh: top.nameTh,
                    },
                });
            }
        }
    }
    console.log(`✓ Seeded Topics.`);
    // 3. Seed Achievements
    console.log('-> Seeding Achievements...');
    for (const ach of achievements_1.achievementsData) {
        await prisma.achievement.upsert({
            where: { code: ach.code },
            create: ach,
            update: ach,
        });
    }
    console.log(`✓ Seeded ${achievements_1.achievementsData.length} Achievements.`);
    // 4. Seed Courses, Modules, Lessons & Contents
    console.log('-> Seeding Courses & Curriculum...');
    let totalLessonsCount = 0;
    for (let cIdx = 0; cIdx < lessons_1.coursesData.length; cIdx++) {
        const cData = lessons_1.coursesData[cIdx];
        let course = await prisma.course.findFirst({ where: { title: cData.title } });
        if (!course) {
            course = await prisma.course.create({
                data: {
                    title: cData.title,
                    titleTh: cData.titleTh,
                    description: cData.description,
                    category: cData.category,
                    level: cData.level,
                    orderIndex: cIdx,
                    isPublished: true,
                },
            });
        }
        for (let mIdx = 0; mIdx < cData.modules.length; mIdx++) {
            const mData = cData.modules[mIdx];
            let moduleItem = await prisma.module.findFirst({
                where: { courseId: course.id, title: mData.title },
            });
            if (!moduleItem) {
                moduleItem = await prisma.module.create({
                    data: {
                        courseId: course.id,
                        title: mData.title,
                        titleTh: mData.titleTh,
                        description: mData.description,
                        orderIndex: mIdx,
                    },
                });
            }
            for (let lIdx = 0; lIdx < mData.lessons.length; lIdx++) {
                const lData = mData.lessons[lIdx];
                totalLessonsCount++;
                let lesson = await prisma.lesson.findFirst({
                    where: { moduleId: moduleItem.id, title: lData.title },
                });
                if (!lesson) {
                    lesson = await prisma.lesson.create({
                        data: {
                            moduleId: moduleItem.id,
                            title: lData.title,
                            titleTh: lData.titleTh,
                            type: lData.type,
                            durationMin: lData.durationMin,
                            xpReward: lData.xpReward,
                            orderIndex: lIdx,
                            isPublished: true,
                        },
                    });
                    // Insert lesson contents
                    for (let cntIdx = 0; cntIdx < lData.contents.length; cntIdx++) {
                        const cnt = lData.contents[cntIdx];
                        await prisma.lessonContent.create({
                            data: {
                                lessonId: lesson.id,
                                sectionType: cnt.sectionType,
                                title: cnt.title,
                                titleTh: cnt.titleTh,
                                body: cnt.body,
                                bodyTh: cnt.bodyTh,
                                orderIndex: cntIdx,
                            },
                        });
                    }
                }
            }
        }
    }
    console.log(`✓ Seeded Courses with ${totalLessonsCount} Lessons.`);
    // 5. Seed Vocabularies
    console.log('-> Seeding Vocabularies (300+ items)...');
    let vocabCount = 0;
    for (const v of vocabularies_1.vocabulariesData) {
        await prisma.vocabulary.upsert({
            where: { word: v.word },
            create: {
                word: v.word,
                ipa: v.ipa,
                partOfSpeech: v.partOfSpeech,
                meaningTh: v.meaningTh,
                meaningEn: v.meaningEn,
                level: v.level,
                category: v.category,
                exampleEn: v.exampleEn,
                exampleTh: v.exampleTh,
            },
            update: {
                ipa: v.ipa,
                partOfSpeech: v.partOfSpeech,
                meaningTh: v.meaningTh,
                meaningEn: v.meaningEn,
                level: v.level,
                category: v.category,
                exampleEn: v.exampleEn,
                exampleTh: v.exampleTh,
            },
        });
        vocabCount++;
    }
    console.log(`✓ Seeded ${vocabCount} Vocabulary entries.`);
    // 6. Seed TOEIC Questions (100+ items)
    console.log('-> Seeding TOEIC Practice Questions (100+ items)...');
    let toeicCount = 0;
    for (const tq of toeicQuestions_1.toeicQuestionsData) {
        const cat = await prisma.category.findUnique({ where: { code: tq.categoryCode } });
        if (!cat)
            continue;
        let groupId = null;
        if (tq.contextEn) {
            const group = await prisma.questionGroup.create({
                data: {
                    contextType: tq.contextType || 'READING_PASSAGE',
                    contentEn: tq.contextEn,
                    contentTh: tq.contextTh || null,
                },
            });
            groupId = group.id;
        }
        const createdQ = await prisma.question.create({
            data: {
                categoryId: cat.id,
                groupId,
                questionText: tq.questionText,
                questionTextTh: tq.questionTextTh,
                difficulty: tq.difficulty || 'MEDIUM',
                errorType: tq.errorType || 'COMPREHENSION',
                explanationTh: tq.explanationTh,
                isPublished: true,
                options: {
                    create: tq.options.map((opt, oIdx) => ({
                        optionKey: opt.optionKey,
                        contentEn: opt.contentEn,
                        contentTh: opt.contentTh || null,
                        isCorrect: opt.isCorrect,
                        orderIndex: oIdx,
                    })),
                },
            },
        });
        toeicCount++;
    }
    console.log(`✓ Seeded ${toeicCount} TOEIC questions.`);
    // 7. Seed STEM Questions (100 items)
    console.log('-> Seeding STEM Questions (100 items)...');
    let stemCount = 0;
    for (const sq of stemQuestions_1.stemQuestionsData) {
        const cat = await prisma.category.findUnique({ where: { code: sq.categoryCode } });
        if (!cat)
            continue;
        let topicId = null;
        if (sq.topicName) {
            const topic = await prisma.topic.findFirst({
                where: { categoryId: cat.id, name: sq.topicName },
            });
            if (topic)
                topicId = topic.id;
        }
        await prisma.question.create({
            data: {
                categoryId: cat.id,
                topicId,
                questionText: sq.questionText,
                questionTextTh: sq.questionTextTh,
                difficulty: sq.difficulty || 'MEDIUM',
                formulaUsed: sq.formulaUsed,
                explanationTh: sq.explanationTh,
                errorType: 'CALCULATION',
                isPublished: true,
                options: {
                    create: sq.options.map((opt, oIdx) => ({
                        optionKey: opt.optionKey,
                        contentEn: opt.contentEn,
                        contentTh: opt.contentTh || null,
                        isCorrect: opt.isCorrect,
                        orderIndex: oIdx,
                    })),
                },
            },
        });
        stemCount++;
    }
    console.log(`✓ Seeded ${stemCount} STEM questions.`);
    // 8. Seed Logic Questions (50 items)
    console.log('-> Seeding Logic Questions (50 items)...');
    let logicCount = 0;
    const logicCat = await prisma.category.findUnique({ where: { code: 'LOGIC' } });
    if (logicCat) {
        for (const lq of logicQuestions_1.logicQuestionsData) {
            let topicId = null;
            if (lq.topicName) {
                const top = await prisma.topic.findFirst({
                    where: { categoryId: logicCat.id, name: lq.topicName },
                });
                if (top)
                    topicId = top.id;
            }
            await prisma.question.create({
                data: {
                    categoryId: logicCat.id,
                    topicId,
                    questionText: lq.questionText,
                    questionTextTh: lq.questionTextTh,
                    difficulty: lq.difficulty || 'MEDIUM',
                    explanationTh: lq.explanationTh,
                    errorType: 'REASONING',
                    isPublished: true,
                    options: {
                        create: lq.options.map((opt, oIdx) => ({
                            optionKey: opt.optionKey,
                            contentEn: opt.contentEn,
                            contentTh: opt.contentTh || null,
                            isCorrect: opt.isCorrect,
                            orderIndex: oIdx,
                        })),
                    },
                },
            });
            logicCount++;
        }
    }
    console.log(`✓ Seeded ${logicCount} Logic questions.`);
    // 9. Seed Personality Questions (50 items)
    console.log('-> Seeding Personality Questions (50 items)...');
    for (const pq of personalityQuestions_1.personalityQuestionsData) {
        await prisma.personalityQuestion.create({
            data: {
                dimension: pq.dimension,
                statementEn: pq.statementEn,
                statementTh: pq.statementTh,
                orderIndex: pq.orderIndex,
            },
        });
    }
    console.log(`✓ Seeded ${personalityQuestions_1.personalityQuestionsData.length} Personality questions.`);
    // 10. Seed Default Admin & Student Users
    console.log('-> Seeding Default Users (Admin & Student)...');
    const salt = await bcryptjs_1.default.genSalt(10);
    const adminHash = await bcryptjs_1.default.hash('1234', salt);
    const studentHash = await bcryptjs_1.default.hash('1234', salt);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@academy.local' },
        create: {
            email: 'admin@academy.local',
            name: 'System Administrator',
            passwordHash: adminHash,
            role: 'ADMIN',
            profile: {
                create: {
                    englishLevel: 'B2',
                    targetTrack: 'DATA_CENTER',
                    dailyGoalMinutes: 60,
                    bio: 'Data Center Operations Lead & Academy Administrator',
                },
            },
            statistics: {
                create: {
                    xp: 1500,
                    level: 15,
                    vocabMastered: 120,
                    lessonsCompleted: 25,
                    quizzesTaken: 30,
                    examsTaken: 5,
                },
            },
            streak: {
                create: {
                    currentStreak: 14,
                    longestStreak: 21,
                    lastActivityDate: new Date().toISOString().split('T')[0],
                },
            },
        },
        update: {
            passwordHash: adminHash,
            role: 'ADMIN',
        },
    });
    const student = await prisma.user.upsert({
        where: { email: 'student@academy.local' },
        create: {
            email: 'student@academy.local',
            name: 'Somchai Jaidee (ช่างเทคนิค)',
            passwordHash: studentHash,
            role: 'STUDENT',
            profile: {
                create: {
                    englishLevel: 'A2',
                    targetTrack: 'DATA_CENTER',
                    dailyGoalMinutes: 30,
                    bio: 'กำลังเตรียมสอบเพื่อเข้าทำงานในตำแหน่ง Data Center Facility Technician',
                },
            },
            statistics: {
                create: {
                    xp: 280,
                    level: 3,
                    vocabMastered: 24,
                    lessonsCompleted: 4,
                    quizzesTaken: 6,
                    examsTaken: 2,
                },
            },
            streak: {
                create: {
                    currentStreak: 3,
                    longestStreak: 5,
                    lastActivityDate: new Date().toISOString().split('T')[0],
                },
            },
        },
        update: {
            passwordHash: studentHash,
            role: 'STUDENT',
        },
    });
    // Assign initial unlocked achievement to student
    const welcomeAch = await prisma.achievement.findUnique({ where: { code: 'FIRST_LOGIN' } });
    if (welcomeAch) {
        await prisma.userAchievement.upsert({
            where: {
                userId_achievementId: {
                    userId: student.id,
                    achievementId: welcomeAch.id,
                },
            },
            create: {
                userId: student.id,
                achievementId: welcomeAch.id,
            },
            update: {},
        });
    }
    console.log('=======================================================');
    console.log('  DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('  Admin Account:   admin@academy.local (or "admin") / 1234');
    console.log('  Student Account: student@academy.local (or "student") / 1234');
    console.log('=======================================================');
}
main()
    .catch((e) => {
    console.error('Seed execution error:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
