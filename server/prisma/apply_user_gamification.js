"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('-> Applying gamification, wardrobe, and level 0 data...');
    const allWardrobeItems = [
        'NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS',
        'SAFETY_HELMET', 'TECH_HEADSET', 'CYBER_VISOR', 'GOLD_CROWN',
        'SAFETY_VEST', 'SAMURAI_ROBE', 'LAB_COAT', 'CYBER_ARMOR',
        'TITANIUM_WRENCH', 'PLASMA_BLADE', 'FIBER_WAND', 'GOLD_RAPIER',
        'SAFETY_BOOTS', 'CYBER_HOVER'
    ];
    // 1. Update Admin (Full God Mode, Level 15, 9999 Gems, All Outfits)
    const admin = await prisma.user.findUnique({
        where: { email: 'admin@academy.local' },
        include: { profile: true, statistics: true },
    });
    if (admin) {
        await prisma.userStatistic.upsert({
            where: { userId: admin.id },
            create: {
                userId: admin.id,
                xp: 4500,
                level: 15,
                gems: 9999,
                rankTitle: 'Chief Architect (Admin)',
                rankTitleTh: 'ผู้บริหารสถาปัตยกรรมดาต้าเซ็นเตอร์ (Admin)',
                vocabMastered: 120,
                lessonsCompleted: 25,
            },
            update: {
                xp: 4500,
                level: 15,
                gems: 9999,
                rankTitle: 'Chief Architect (Admin)',
                rankTitleTh: 'ผู้บริหารสถาปัตยกรรมดาต้าเซ็นเตอร์ (Admin)',
            },
        });
        await prisma.userProfile.upsert({
            where: { userId: admin.id },
            create: {
                userId: admin.id,
                englishLevel: 'B2',
                targetTrack: 'DATA_CENTER',
                equippedHead: 'GOLD_CROWN',
                equippedArmor: 'CYBER_ARMOR',
                equippedWeapon: 'PLASMA_BLADE',
                equippedShoes: 'CYBER_HOVER',
                unlockedItems: JSON.stringify(allWardrobeItems),
            },
            update: {
                equippedHead: 'GOLD_CROWN',
                equippedArmor: 'CYBER_ARMOR',
                equippedWeapon: 'PLASMA_BLADE',
                equippedShoes: 'CYBER_HOVER',
                unlockedItems: JSON.stringify(allWardrobeItems),
            },
        });
        console.log('✓ Admin updated with God Mode (Level 15, 9999 Gems, all gear unlocked).');
    }
    // 2. Update Student (Starts at Level 0, 0 XP, 50 Gems, Intern Trainee rank)
    const student = await prisma.user.findUnique({
        where: { email: 'student@academy.local' },
        include: { profile: true, statistics: true },
    });
    if (student) {
        await prisma.userStatistic.upsert({
            where: { userId: student.id },
            create: {
                userId: student.id,
                xp: 0,
                level: 0,
                gems: 50,
                rankTitle: 'Intern Trainee',
                rankTitleTh: 'เด็กฝึกงานเทคนิค',
                vocabMastered: 0,
                lessonsCompleted: 0,
            },
            update: {
                xp: 0,
                level: 0,
                gems: 50,
                rankTitle: 'Intern Trainee',
                rankTitleTh: 'เด็กฝึกงานเทคนิค',
                vocabMastered: 0,
                lessonsCompleted: 0,
            },
        });
        await prisma.userProfile.upsert({
            where: { userId: student.id },
            create: {
                userId: student.id,
                englishLevel: 'A1',
                targetTrack: 'DATA_CENTER',
                equippedHead: 'NONE',
                equippedArmor: 'DEFAULT',
                equippedWeapon: 'STEEL_KATANA',
                equippedShoes: 'SNEAKERS',
                unlockedItems: JSON.stringify(['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS']),
            },
            update: {
                equippedHead: 'NONE',
                equippedArmor: 'DEFAULT',
                equippedWeapon: 'STEEL_KATANA',
                equippedShoes: 'SNEAKERS',
                unlockedItems: JSON.stringify(['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS']),
            },
        });
        console.log('✓ Student updated: Starts at Level 0 (0 XP, 50 Gems, Intern Trainee).');
    }
    console.log('Done!');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
