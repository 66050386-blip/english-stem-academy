/**
 * SuperMemo 2 (SM-2) Algorithm implementation for Spaced Repetition
 * Quality ratings:
 * 0: Complete blackout
 * 1: Incorrect response; but upon seeing correct answer, remembered
 * 2: Incorrect response; where the correct one seemed easy to recall
 * 3: Correct response recalled with serious difficulty
 * 4: Correct response after hesitation
 * 5: Perfect recall
 */

export interface SM2Input {
  rating: number; // 0 to 5
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
}

export interface SM2Result {
  repetitions: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewDate: Date;
}

export function calculateSM2({
  rating,
  repetitions,
  easeFactor,
  intervalDays,
}: SM2Input): SM2Result {
  // Ensure rating is clamped between 0 and 5
  const q = Math.max(0, Math.min(5, rating));

  let nextRepetitions = repetitions;
  let nextInterval = intervalDays;
  let nextEF = easeFactor;

  if (q >= 3) {
    // Correct response
    if (nextRepetitions === 0) {
      nextInterval = 1;
    } else if (nextRepetitions === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(nextInterval * nextEF);
    }
    nextRepetitions += 1;
  } else {
    // Incorrect response, reset streak
    nextRepetitions = 0;
    nextInterval = 1;
  }

  // Calculate new Ease Factor
  nextEF = nextEF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (nextEF < 1.3) {
    nextEF = 1.3;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + nextInterval);

  return {
    repetitions: nextRepetitions,
    easeFactor: parseFloat(nextEF.toFixed(2)),
    intervalDays: nextInterval,
    nextReviewDate,
  };
}
