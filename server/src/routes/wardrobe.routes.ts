import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

export const wardrobeRouter = Router();

export interface WardrobeItemCatalog {
  id: string;
  name: string;
  nameTh: string;
  category: 'head' | 'armor' | 'weapon' | 'shoes';
  price: number; // in gems or coins (0 = free)
  currency?: 'gems' | 'coins'; // default 'gems'
  requiredLevel: number;
  descriptionTh: string;
  icon: string;
  badge?: string;
}

export interface TopupPackage {
  id: string;
  nameTh: string;
  coins: number;
  priceThb: number;
  bonusGems: number;
  vip: boolean;
  vipDays: number;
  icon: string;
  badge?: string;
}

export const TOPUP_PACKAGES: TopupPackage[] = [
  {
    id: 'COIN_STARTER',
    nameTh: 'ถุงเหรียญทองมังกรเพลิงเริ่มต้น',
    coins: 500,
    priceThb: 99,
    bonusGems: 100,
    vip: false,
    vipDays: 0,
    icon: '🪙',
    badge: 'Popular',
  },
  {
    id: 'COIN_WARRIOR',
    nameTh: 'หีบสมบัติขุนพลมังกรเพลิง (ยอดนิยม)',
    coins: 1200,
    priceThb: 199,
    bonusGems: 300,
    vip: true,
    vipDays: 30,
    icon: '🔥',
    badge: 'Best Value • รับยศ VIP ฟรี!',
  },
  {
    id: 'COIN_LEGEND',
    nameTh: 'คลังสมบัติราชันมังกรจักรพรรดิ (ครบเซ็ต)',
    coins: 2500,
    priceThb: 399,
    bonusGems: 800,
    vip: true,
    vipDays: 365,
    icon: '👑',
    badge: 'Super VIP • ปลดล็อกทุกบทเรียน!',
  },
  {
    id: 'COIN_SUPREME',
    nameTh: 'มหาคลังเทวะมังกรสุริยันต์ Ultimate Master',
    coins: 6000,
    priceThb: 799,
    bonusGems: 2500,
    vip: true,
    vipDays: 999,
    icon: '🐉',
    badge: 'God Tier VIP • สิทธิ์ตลอดชีพ',
  },
];

export const SCB_BANK_INFO = {
  bankName: 'ธนาคารไทยพาณิชย์',
  bankNameEn: 'Siam Commercial Bank (SCB)',
  bankCode: '014',
  accountNumber: '4150431812',
  formattedAccount: '415-043181-2',
  accountNameTh: 'English & STEM Academy (บัญชีรับชำระค่าธรรมเนียมการศึกษา)',
  scbEasyDeepLink: 'scbeasy://',
  scbEasyWebUrl: 'https://www.scbeasy.com/',
  scbDirectUrl: 'https://www.scb.co.th/th/personal-banking/digital-banking/scb-easy.html',
};

export const WARDROBE_CATALOG: WardrobeItemCatalog[] = [
  // 1. Headgear
  {
    id: 'NONE',
    name: 'Natural Feeler & Headband',
    nameTh: 'หนวดกุ้งธรรมชาติ (ไม่มีหมวก)',
    category: 'head',
    price: 0,
    currency: 'gems',
    requiredLevel: 0,
    descriptionTh: 'หนวดสีแดงคู่ทรงเสน่ห์ พร้อมลุยทุกสถานการณ์',
    icon: '🦞',
  },
  {
    id: 'SAFETY_HELMET',
    name: 'Data Center Safety Helmet',
    nameTh: 'หมวกเซฟตี้วิศวกร Data Center',
    category: 'head',
    price: 100,
    currency: 'gems',
    requiredLevel: 1,
    descriptionTh: 'หมวกนิรภัยสีเหลืองนีออนสะท้อนแสง ป้องกันไฟฟ้าสถิตและแรงกระแทก',
    icon: '🪖',
    badge: 'Popular',
  },
  {
    id: 'TECH_HEADSET',
    name: 'Tactical Radio Headset',
    nameTh: 'หูฟังช่างเทคนิคสื่อสาร Tactical',
    category: 'head',
    price: 150,
    currency: 'gems',
    requiredLevel: 2,
    descriptionTh: 'หูฟังตัดเสียงรบกวนในห้อง Server Hall พร้อมไมค์บูมสั่งการ',
    icon: '🎧',
  },
  {
    id: 'CYBER_VISOR',
    name: 'Optical Scanner Cyber Visor',
    nameTh: 'แว่นไซเบอร์สแกนเนอร์ระบบเซิร์ฟเวอร์',
    category: 'head',
    price: 250,
    currency: 'gems',
    requiredLevel: 3,
    descriptionTh: 'แว่น HUD อัจฉริยะวิเคราะห์อุณหภูมิและพอร์ตเครือข่ายแบบเรียลไทม์',
    icon: '🥽',
    badge: 'Epic',
  },
  {
    id: 'GOLD_CROWN',
    name: 'Imperial Golden Crown',
    nameTh: 'มงกุฎทองคำจักรพรรดิประดับเพชร',
    category: 'head',
    price: 500,
    currency: 'gems',
    requiredLevel: 5,
    descriptionTh: 'มงกุฎทองคำแท้สำหรับวิศวกรระดับตำนานผู้นำสถาบัน',
    icon: '👑',
    badge: 'Legendary',
  },
  {
    id: 'DRAGON_HELM',
    name: 'Ancient Dragon Flame Helm',
    nameTh: 'หมวกเกราะมังกรเพลิงบรรพกาล',
    category: 'head',
    price: 300,
    currency: 'coins',
    requiredLevel: 0,
    descriptionTh: 'หมวกเกราะมังกรเพลิงพร้อมเขามังกรทองคู่และหงอนเพลิงสุริยันต์ รับยศ VIP ทันที!',
    icon: '🐲',
    badge: 'VIP Dragon',
  },

  // 2. Armor / Outfits
  {
    id: 'DEFAULT',
    name: 'Lobster Warrior Shell',
    nameTh: 'เกราะเปลือกกุ้งนักดาบดั้งเดิม',
    category: 'armor',
    price: 0,
    currency: 'gems',
    requiredLevel: 0,
    descriptionTh: 'เปลือกไคตินสีแดงเพลิงสุดแกร่งตามธรรมชาติ',
    icon: '🦞',
  },
  {
    id: 'SAFETY_VEST',
    name: 'High-Vis Facility Safety Vest',
    nameTh: 'เสื้อสะท้อนแสงช่างดาต้าเซ็นเตอร์',
    category: 'armor',
    price: 120,
    currency: 'gems',
    requiredLevel: 1,
    descriptionTh: 'เสื้อกั๊กนิรภัยสีส้มสะท้อนแสงมาตรฐานความปลอดภัยสากล',
    icon: '🦺',
    badge: 'Popular',
  },
  {
    id: 'SAMURAI_ROBE',
    name: 'Indigo Shinobi Samurai Robe',
    nameTh: 'ชุดกิโมโนฮากามะนักดาบซามูไร',
    category: 'armor',
    price: 200,
    currency: 'gems',
    requiredLevel: 2,
    descriptionTh: 'ชุดคลุมนักรบโบราณสีกรมท่า เพิ่มความพริ้วไหวในการฟันดาบ',
    icon: '🥋',
  },
  {
    id: 'LAB_COAT',
    name: 'Cleanroom Server Lab Coat',
    nameTh: 'เสื้อกาวน์วิศวกรห้อง Cleanroom Lab',
    category: 'armor',
    price: 300,
    currency: 'gems',
    requiredLevel: 3,
    descriptionTh: 'ชุดคลุมสีขาวป้องกันอนุภาคฝุ่นในห้องเซิร์ฟเวอร์ Tier IV',
    icon: '🥼',
    badge: 'Epic',
  },
  {
    id: 'CYBER_ARMOR',
    name: 'Titanium Cybernetic Body Armor',
    nameTh: 'เกราะอกไทเทเนียมไซเบอร์เนติก',
    category: 'armor',
    price: 500,
    currency: 'gems',
    requiredLevel: 5,
    descriptionTh: 'เกราะอกเหล็กกล้าผสมคาร์บอนไฟเบอร์เรืองแสงนีออน',
    icon: '🛡️',
    badge: 'Legendary',
  },
  {
    id: 'DRAGON_ARMOR',
    name: 'Crimson Dragon Flame Armor',
    nameTh: 'เกราะมังกรเพลิงบรรพกาล',
    category: 'armor',
    price: 500,
    currency: 'coins',
    requiredLevel: 0,
    descriptionTh: 'เกราะเกล็ดมังกรเพลิงสีแดงประกายทอง ลายไฟเรืองรองสุดเกรงขาม รับยศ VIP ทันที!',
    icon: '🐉',
    badge: 'VIP Dragon',
  },

  // 3. Weapons
  {
    id: 'STEEL_KATANA',
    name: 'Gleaming Steel Katana',
    nameTh: 'ดาบซามูไรเหล็กกล้าเงาวับ',
    category: 'weapon',
    price: 0,
    currency: 'gems',
    requiredLevel: 0,
    descriptionTh: 'ดาบคาตานะคู่กายประจำตัวน้องกุ้ง คมกริบพร้อมตัดทุกอุปสรรค',
    icon: '⚔️',
  },
  {
    id: 'TITANIUM_WRENCH',
    name: 'Digital Multimeter & Tech Wrench',
    nameTh: 'ประแจวัดไฟฟ้าดิจิทัลช่างดาต้าเซ็นเตอร์',
    category: 'weapon',
    price: 120,
    currency: 'gems',
    requiredLevel: 1,
    descriptionTh: 'เครื่องมือช่างอัจฉริยะ ขันน็อตแร็กและวัดแรงดันไฟฟ้าในตัวเดียว',
    icon: '🔧',
  },
  {
    id: 'PLASMA_BLADE',
    name: 'Neon Blue Plasma Blade',
    nameTh: 'ดาบเลเซอร์พลาสมานีออนสีฟ้า',
    category: 'weapon',
    price: 250,
    currency: 'gems',
    requiredLevel: 2,
    descriptionTh: 'ดาบลำแสงพลาสมาเรืองแสง ตัดสายเคเบิลหรือคลื่นสัญญาณรบกวนได้ทันที',
    icon: '⚡',
    badge: 'Epic',
  },
  {
    id: 'FIBER_WAND',
    name: '800Gbps Optical Fiber Wand',
    nameTh: 'คทาไฟเบอร์ออปติกความเร็วแสง',
    category: 'weapon',
    price: 350,
    currency: 'gems',
    requiredLevel: 3,
    descriptionTh: 'คทาส่งสัญญาณเลเซอร์ Single-mode เชื่อมต่อเครือข่ายความเร็วสูง',
    icon: '🥢',
  },
  {
    id: 'GOLD_RAPIER',
    name: 'Diamond Encrusted Golden Rapier',
    nameTh: 'ดาบเรเปียร์ทองคำประดับเพชร',
    category: 'weapon',
    price: 600,
    currency: 'gems',
    requiredLevel: 5,
    descriptionTh: 'ดาบเรเปียร์ทองคำฝังเพชรระยิบระยับ อาวุธระดับแชมเปียนสูงสุด',
    icon: '🪄',
    badge: 'Legendary',
  },
  {
    id: 'DRAGON_BLADE',
    name: 'World-Cleaving Dragon Flame Katana',
    nameTh: 'ดาบมังกรเพลิงผ่าพิภพ',
    category: 'weapon',
    price: 600,
    currency: 'coins',
    requiredLevel: 0,
    descriptionTh: 'ดาบคาตานะมังกรเพลิงบรรพกาล คมดาบเปลวไฟผ่าพิภพ ฟันเป็นมังกรเพลิง รับยศ VIP ทันที!',
    icon: '🔥',
    badge: 'VIP Dragon',
  },

  // 4. Shoes
  {
    id: 'SNEAKERS',
    name: 'Classic Blue & White Sneakers',
    nameTh: 'สนีกเกอร์น้ำเงิน-ขาวคลาสสิก',
    category: 'shoes',
    price: 0,
    currency: 'gems',
    requiredLevel: 0,
    descriptionTh: 'รองเท้าผ้าใบคู่เก่ง นุ่มสบายคล่องตัวทุกการเดิน',
    icon: '👟',
  },
  {
    id: 'SAFETY_BOOTS',
    name: 'Steel-Toe Electrical Safety Boots',
    nameTh: 'รองเท้าเซฟตี้หัวเหล็กช่างเทคนิค',
    category: 'shoes',
    price: 100,
    currency: 'gems',
    requiredLevel: 1,
    descriptionTh: 'รองเท้าบูตกันน้ำมัน ป้องกันกระแสไฟฟ้ารั่ว 1,000V และของตกทับเท้า',
    icon: '🥾',
  },
  {
    id: 'CYBER_HOVER',
    name: 'Jet-Powered Cyber Hover Boots',
    nameTh: 'รองเท้าโฮเวอร์บอร์ดไอพ่นพลังงานสูง',
    category: 'shoes',
    price: 400,
    currency: 'gems',
    requiredLevel: 4,
    descriptionTh: 'รองเท้าบินลอยตัว เคลื่อนที่ตรวจเช็คอุปกรณ์ตามตู้แร็กได้อย่างรวดเร็ว',
    icon: '🚀',
    badge: 'Legendary',
  },
  {
    id: 'DRAGON_BOOTS',
    name: 'Blazing Dragon Talon Boots',
    nameTh: 'รองเท้ากรงเล็บมังกรเพลิง',
    category: 'shoes',
    price: 300,
    currency: 'coins',
    requiredLevel: 0,
    descriptionTh: 'รองเท้าบูตกรงเล็บมังกรทอง พร้อมเอฟเฟกต์รอยก้าวเพลิงผลาญ รับยศ VIP ทันที!',
    icon: '🐾',
    badge: 'VIP Dragon',
  },
];

export function calculateRankAndLevel(xp: number): {
  level: number;
  rankTitle: string;
  rankTitleTh: string;
  nextLevelXp: number;
} {
  if (xp >= 5000) {
    const extraLevels = Math.floor((xp - 5000) / 500);
    return {
      level: Math.min(20, 6 + extraLevels),
      rankTitle: 'Chief Data Center Architect',
      rankTitleTh: 'ผู้บริหารสถาปัตยกรรมดาต้าเซ็นเตอร์',
      nextLevelXp: 10000,
    };
  } else if (xp >= 2000) {
    return {
      level: 5,
      rankTitle: 'Site Reliability Lead',
      rankTitleTh: 'หัวหน้าทีมวิศวกรรมปฏิบัติการ',
      nextLevelXp: 5000,
    };
  } else if (xp >= 1000) {
    return {
      level: 4,
      rankTitle: 'Senior Operations Engineer',
      rankTitleTh: 'วิศวกรอาวุโสดาต้าเซ็นเตอร์',
      nextLevelXp: 2000,
    };
  } else if (xp >= 500) {
    return {
      level: 3,
      rankTitle: 'Critical Infrastructure Specialist',
      rankTitleTh: 'ผู้เชี่ยวชาญระบบไฟฟ้า-ทำความเย็น',
      nextLevelXp: 1000,
    };
  } else if (xp >= 250) {
    return {
      level: 2,
      rankTitle: 'Facility Specialist',
      rankTitleTh: 'เจ้าหน้าที่ปฏิบัติการดาต้าเซ็นเตอร์',
      nextLevelXp: 500,
    };
  } else if (xp >= 100) {
    return {
      level: 1,
      rankTitle: 'Junior Technician',
      rankTitleTh: 'ช่างเทคนิคฝึกหัด',
      nextLevelXp: 250,
    };
  } else {
    // 0 - 99 XP: Student starts at Level 0!
    return {
      level: 0,
      rankTitle: 'Intern Trainee',
      rankTitleTh: 'เด็กฝึกงานเทคนิค',
      nextLevelXp: 100,
    };
  }
}

// 1. Get Wardrobe State & Shop Catalog
wardrobeRouter.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    let unlockedItems: string[] = ['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS'];
    try {
      if (user.profile?.unlockedItems) {
        unlockedItems = JSON.parse(user.profile.unlockedItems);
      }
    } catch {}

    // If Admin, all items are considered unlocked!
    if (user.role === 'ADMIN') {
      unlockedItems = WARDROBE_CATALOG.map((i) => i.id);
    }

    const stats = user.statistics || {
      xp: 0,
      level: 0,
      gems: 50,
      coins: 0,
      isVip: false,
      rankTitle: 'Intern Trainee',
      rankTitleTh: 'เด็กฝึกงานเทคนิค',
    };

    const isVip = Boolean(stats.isVip || user.role === 'ADMIN');
    const rankInfo = calculateRankAndLevel(stats.xp);

    res.json({
      success: true,
      data: {
        catalog: WARDROBE_CATALOG,
        topupPackages: TOPUP_PACKAGES,
        bankInfo: SCB_BANK_INFO,
        level: stats.level,
        gems: stats.gems,
        coins: stats.coins ?? 0,
        isVip,
        xp: stats.xp,
        equipped: {
          head: user.profile?.equippedHead || 'NONE',
          armor: user.profile?.equippedArmor || 'DEFAULT',
          weapon: user.profile?.equippedWeapon || 'STEEL_KATANA',
          shoes: user.profile?.equippedShoes || 'SNEAKERS',
        },
        unlockedItems,
        claimedDailyToday: user.streak?.lastClaimDate === new Date().toISOString().split('T')[0],
        balance: {
          xp: stats.xp,
          level: stats.level,
          gems: stats.gems,
          coins: stats.coins ?? 0,
          isVip,
          rankTitle: isVip ? 'VIP Dragon Knight (นักรบมังกรกิตติมศักดิ์)' : (stats.rankTitle || rankInfo.rankTitle),
          rankTitleTh: isVip ? 'นักรบมังกรเพลิงระดับ VIP 👑' : (stats.rankTitleTh || rankInfo.rankTitleTh),
          nextLevelXp: rankInfo.nextLevelXp,
        },
        streak: user.streak?.currentStreak || 1,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error('Error fetching wardrobe:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch wardrobe data' });
  }
});

// 2. Buy item with Gems or Gold Coins
wardrobeRouter.post('/buy', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { itemId } = req.body;
    if (!itemId) {
      res.status(400).json({ success: false, error: 'Item ID is required' });
      return;
    }

    const item = WARDROBE_CATALOG.find((i) => i.id === itemId);
    if (!item) {
      res.status(404).json({ success: false, error: 'Item not found in catalog' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: { profile: true, statistics: true },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    let unlockedItems: string[] = ['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS'];
    try {
      if (user.profile?.unlockedItems) {
        unlockedItems = JSON.parse(user.profile.unlockedItems);
      }
    } catch {}

    if (unlockedItems.includes(itemId)) {
      res.status(400).json({ success: false, error: 'คุณมีไอเทมนี้อยู่ในตู้เสื้อผ้าแล้ว' });
      return;
    }

    const userLevel = user.statistics?.level ?? 0;
    const userGems = user.statistics?.gems ?? 0;
    const userCoins = user.statistics?.coins ?? 0;
    const isCoinItem = item.currency === 'coins';

    // Check level requirement (admins bypass, coin items bypass level restriction)
    if (user.role !== 'ADMIN' && !isCoinItem && userLevel < item.requiredLevel) {
      res.status(403).json({
        success: false,
        error: `ต้องการเลเวล ${item.requiredLevel} ขึ้นไปเพื่อปลดล็อกไอเทมนี้ (เลเวลปัจจุบันของคุณ: ${userLevel})`,
      });
      return;
    }

    // Check balance
    if (user.role !== 'ADMIN') {
      if (isCoinItem) {
        if (userCoins < item.price) {
          res.status(400).json({
            success: false,
            error: `เหรียญทองไม่เพียงพอ! ต้องการ ${item.price} 🪙 (คุณมี ${userCoins} 🪙) กรุณาเติมเหรียญทอง`,
          });
          return;
        }
      } else {
        if (userGems < item.price) {
          res.status(400).json({
            success: false,
            error: `อัญมณีไม่เพียงพอ! ต้องการ ${item.price} 💎 (คุณมี ${userGems} 💎)`,
          });
          return;
        }
      }
    }

    // Deduct currency and unlock item
    let newGems = userGems;
    let newCoins = userCoins;
    let grantVip = user.statistics?.isVip ?? false;

    if (user.role !== 'ADMIN') {
      if (isCoinItem) {
        newCoins = userCoins - item.price;
      } else {
        newGems = userGems - item.price;
      }
    }

    // Purchasing Dragon VIP item grants VIP status!
    if (isCoinItem || item.badge?.includes('VIP')) {
      grantVip = true;
    }

    unlockedItems.push(itemId);

    await prisma.$transaction([
      prisma.userStatistic.update({
        where: { userId: user.id },
        data: {
          gems: newGems,
          coins: newCoins,
          isVip: grantVip,
        },
      }),
      prisma.userProfile.update({
        where: { userId: user.id },
        data: { unlockedItems: JSON.stringify(unlockedItems) },
      }),
    ]);

    const vipMessage = grantVip && !user.statistics?.isVip ? ' 👑 พร้อมรับยศ VIP Dragon Knight และปลดล็อกทุกบทเรียน!' : '';

    res.json({
      success: true,
      message: `ซื้อ ${item.nameTh} สำเร็จแล้ว!${vipMessage}`,
      gems: newGems,
      coins: newCoins,
      isVip: grantVip,
      unlockedItems,
      purchasedItem: item,
      data: {
        gems: newGems,
        coins: newCoins,
        isVip: grantVip,
        unlockedItems,
        purchasedItem: item,
      },
    });
  } catch (error: any) {
    console.error('Error buying item:', error);
    res.status(500).json({ success: false, error: 'Failed to purchase item' });
  }
});

// 2.5 Simulated Top-up Endpoint (Purchase Gold Coins & VIP Status)
wardrobeRouter.post('/topup', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { packageId, paymentMethod, transferRef } = req.body;
    if (!packageId) {
      res.status(400).json({ success: false, error: 'Package ID is required' });
      return;
    }

    const pkg = TOPUP_PACKAGES.find((p) => p.id === packageId);
    if (!pkg) {
      res.status(404).json({ success: false, error: 'ไม่พบแพ็กเกจเติมเหรียญที่ระบุ' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: { statistics: true },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const currentCoins = user.statistics?.coins ?? 0;
    const currentGems = user.statistics?.gems ?? 50;
    const newCoins = currentCoins + pkg.coins;
    const newGems = currentGems + pkg.bonusGems;
    const grantVip = pkg.vip || (user.statistics?.isVip ?? false);

    await prisma.userStatistic.update({
      where: { userId: user.id },
      data: {
        coins: newCoins,
        gems: newGems,
        isVip: grantVip,
      },
    });

    res.json({
      success: true,
      message: `เติมเงินสำเร็จผ่าน ${SCB_BANK_INFO.bankName} (${SCB_BANK_INFO.formattedAccount})! ได้รับ ${pkg.coins} 🪙 และโบนัส ${pkg.bonusGems} 💎${
        pkg.vip ? ' พร้อมเปิดใช้งานยศ VIP Dragon Knight ปลดล็อกทุกบทเรียน!' : ''
      }`,
      data: {
        coins: newCoins,
        gems: newGems,
        isVip: grantVip,
        package: pkg,
        bankInfo: SCB_BANK_INFO,
        paymentMethod: paymentMethod || 'SCB_DIRECT_EASY',
        transferRef: transferRef || `SCB-${Date.now()}`,
      },
    });
  } catch (error: any) {
    console.error('Error processing topup:', error);
    res.status(500).json({ success: false, error: 'Failed to process topup' });
  }
});

// 3. Equip item
wardrobeRouter.post('/equip', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { category, itemId } = req.body;
    if (!category || !itemId) {
      res.status(400).json({ success: false, error: 'Category and Item ID are required' });
      return;
    }

    const item = WARDROBE_CATALOG.find((i) => i.id === itemId && i.category === category);
    if (!item) {
      res.status(404).json({ success: false, error: 'Invalid item for this slot' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: { profile: true },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    let unlockedItems: string[] = ['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS'];
    try {
      if (user.profile?.unlockedItems) {
        unlockedItems = JSON.parse(user.profile.unlockedItems);
      }
    } catch {}

    // Check ownership (admins can equip any item)
    if (user.role !== 'ADMIN' && !unlockedItems.includes(itemId)) {
      res.status(403).json({ success: false, error: 'คุณยังไม่ได้ปลดล็อกไอเทมนี้' });
      return;
    }

    const updateData: any = {};
    if (category === 'head') updateData.equippedHead = itemId;
    if (category === 'armor') updateData.equippedArmor = itemId;
    if (category === 'weapon') updateData.equippedWeapon = itemId;
    if (category === 'shoes') updateData.equippedShoes = itemId;

    const updatedProfile = await prisma.userProfile.update({
      where: { userId: user.id },
      data: updateData,
    });

    const equipped = {
      head: updatedProfile.equippedHead,
      armor: updatedProfile.equippedArmor,
      weapon: updatedProfile.equippedWeapon,
      shoes: updatedProfile.equippedShoes,
    };

    res.json({
      success: true,
      message: `สวมใส่ ${item.nameTh} เรียบร้อยแล้ว!`,
      equipped,
      data: {
        equipped,
      },
    });
  } catch (error: any) {
    console.error('Error equipping item:', error);
    res.status(500).json({ success: false, error: 'Failed to equip item' });
  }
});

// 4. Daily Claim Bonus (+20 Gems, +30 XP) - Allowed strictly ONCE per day
wardrobeRouter.post('/claim-daily', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: { statistics: true, streak: true },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (user.streak?.lastClaimDate === todayStr) {
      res.status(400).json({
        success: false,
        error: 'คุณได้รับรางวัลประจำวันของวันนี้แล้ว (รับได้วันละ 1 ครั้งเท่านั้น กรุณากลับมาใหม่พรุ่งนี้!)',
        alreadyClaimed: true,
      });
      return;
    }

    const stats = user.statistics || { xp: 0, level: 0, gems: 50 };
    const newXp = stats.xp + 30;
    const newGems = stats.gems + 20;
    const rankInfo = calculateRankAndLevel(newXp);

    await prisma.$transaction([
      prisma.userStatistic.update({
        where: { userId: user.id },
        data: {
          xp: newXp,
          level: user.role === 'ADMIN' ? stats.level : rankInfo.level,
          gems: newGems,
          rankTitle: rankInfo.rankTitle,
          rankTitleTh: rankInfo.rankTitleTh,
        },
      }),
      prisma.dailyStreak.upsert({
        where: { userId: user.id },
        create: {
          userId: user.id,
          currentStreak: 1,
          longestStreak: 1,
          lastActivityDate: todayStr,
          lastClaimDate: todayStr,
        },
        update: {
          lastClaimDate: todayStr,
        },
      }),
    ]);

    res.json({
      success: true,
      message: '🎉 เช็คอินรับรางวัลประจำวันสำเร็จ! ได้รับ +30 XP และ +20 💎',
      xp: newXp,
      level: rankInfo.level,
      gems: newGems,
      rankTitle: rankInfo.rankTitle,
      rankTitleTh: rankInfo.rankTitleTh,
      claimedDailyToday: true,
      data: {
        xp: newXp,
        level: rankInfo.level,
        gems: newGems,
        rankTitle: rankInfo.rankTitle,
        rankTitleTh: rankInfo.rankTitleTh,
        claimedDailyToday: true,
      },
    });
  } catch (error: any) {
    console.error('Error claiming daily bonus:', error);
    res.status(500).json({ success: false, error: 'Failed to claim daily reward' });
  }
});

// 5. Admin God Mode: Adjust XP, Gems, Level, Unlock All, or Reset Student
wardrobeRouter.post('/admin/adjust', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (req.user!.role !== 'ADMIN') {
      res.status(403).json({ success: false, error: 'เฉพาะแอดมินเท่านั้นที่ใช้งานคำสั่งนี้ได้' });
      return;
    }

    const { targetUserId, addXp, setLevel, addGems, addCoins, setVip, unlockAll, resetToLevelZero } = req.body;

    // Default to the admin themselves if no targetUserId provided
    const targetId = targetUserId || req.user!.userId;

    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
      include: { profile: true, statistics: true },
    });

    if (!targetUser) {
      res.status(404).json({ success: false, error: 'Target user not found' });
      return;
    }

    if (resetToLevelZero) {
      await prisma.userStatistic.update({
        where: { userId: targetId },
        data: {
          xp: 0,
          level: 0,
          gems: 50,
          coins: 0,
          isVip: false,
          rankTitle: 'Intern Trainee',
          rankTitleTh: 'เด็กฝึกงานเทคนิค',
        },
      });

      await prisma.userProfile.update({
        where: { userId: targetId },
        data: {
          equippedHead: 'NONE',
          equippedArmor: 'DEFAULT',
          equippedWeapon: 'STEEL_KATANA',
          equippedShoes: 'SNEAKERS',
          unlockedItems: JSON.stringify(['NONE', 'DEFAULT', 'STEEL_KATANA', 'SNEAKERS']),
        },
      });

      await prisma.dailyStreak.updateMany({
        where: { userId: targetId },
        data: {
          lastClaimDate: null,
        },
      });

      res.json({
        success: true,
        message: 'รีเซ็ตผู้ใช้กลับสู่ Level 0 (Intern Trainee, 0 XP, 50 Gems, 0 Coins) เรียบร้อยแล้ว',
      });
      return;
    }

    const currentXp = targetUser.statistics?.xp ?? 0;
    const currentGems = targetUser.statistics?.gems ?? 50;
    const currentCoins = targetUser.statistics?.coins ?? 0;
    const currentVip = targetUser.statistics?.isVip ?? false;

    const newXp = addXp !== undefined ? Math.max(0, currentXp + Number(addXp)) : currentXp;
    const newGems = addGems !== undefined ? Math.max(0, currentGems + Number(addGems)) : currentGems;
    const newCoins = addCoins !== undefined ? Math.max(0, currentCoins + Number(addCoins)) : currentCoins;
    const newVip = setVip !== undefined ? Boolean(setVip) : currentVip;
    const rankInfo = calculateRankAndLevel(newXp);
    const newLevel = setLevel !== undefined ? Number(setLevel) : rankInfo.level;

    await prisma.userStatistic.update({
      where: { userId: targetId },
      data: {
        xp: newXp,
        level: newLevel,
        gems: newGems,
        coins: newCoins,
        isVip: newVip,
        rankTitle: newVip ? 'VIP Dragon Knight' : rankInfo.rankTitle,
        rankTitleTh: newVip ? 'นักรบมังกรเพลิงระดับ VIP 👑' : rankInfo.rankTitleTh,
      },
    });

    if (unlockAll) {
      const allItemIds = WARDROBE_CATALOG.map((i) => i.id);
      await prisma.userProfile.update({
        where: { userId: targetId },
        data: { unlockedItems: JSON.stringify(allItemIds) },
      });
    }

    res.json({
      success: true,
      message: 'อัปเดตสถิติและโหมดแอดมินสำเร็จ!',
      data: {
        xp: newXp,
        level: newLevel,
        gems: newGems,
        coins: newCoins,
        isVip: newVip,
        rankTitle: newVip ? 'VIP Dragon Knight' : rankInfo.rankTitle,
        rankTitleTh: newVip ? 'นักรบมังกรเพลิงระดับ VIP 👑' : rankInfo.rankTitleTh,
        allUnlocked: !!unlockAll,
      },
    });
  } catch (error: any) {
    console.error('Admin adjust error:', error);
    res.status(500).json({ success: false, error: 'Failed to adjust gamification stats' });
  }
});
