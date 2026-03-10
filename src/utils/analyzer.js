import Tesseract from 'tesseract.js';

/**
 * Rules mapping dictionary
 * Each rule contains regex patterns to match against, and details for the dashboard
 */
const SCAM_HEURISTICS = [
  {
    id: "H_EMAIL",
    type: "Suspicious Email Domain",
    patterns: [/@[a-zA-Z0-9-]+\.(gmail|yahoo|hotmail|outlook|live)\.com/i, /@email\.com/i],
    rule: "Uses a free, generic email provider instead of a corporate domain. Legitimate companies usually have dedicated domains (e.g., careers@company.com).",
    severity: 30 // deduction weight
  },
  {
    id: "H_PAYMENT",
    type: "Payment Request",
    patterns: [
      /(registration|processing|application|training|onboarding) fee/i, 
      /pay (now|first|upfront)/i,
      /security deposit/i,
      /(requires|transfer|send) (payment|money)/i,
      /\$(100|200|300|400|500) fee/i
    ],
    rule: "Asks for payment. Legitimate internships pay YOU, or at least do not charge you money to apply, register, or train.",
    severity: 50 // Critical red flag
  },
  {
    id: "H_GUARANTEE",
    type: "Guaranteed Placement",
    patterns: [
      /100% (job|placement) guarantee/i,
      /guaranteed (job|hire|placement|internship)/i,
      /no (interview|experience) (required|needed)/i,
    ],
    rule: "Promises guaranteed outcomes. Real opportunities require interviews and evaluation of skills.",
    severity: 20
  },
  {
    id: "H_URGENCY",
    type: "Manufactured Urgency",
    patterns: [
      /(urgent|immediate) (hiring|requirement)/i,
      /apply (within 24 hours|today only)/i,
      /(last|final) (chance|warning)/i,
      /limited seats available/i
    ],
    rule: "Creates artificial pressure to bypass your critical thinking.",
    severity: 15
  },
  {
    id: "H_TOO_GOOD",
    type: "Unrealistic Compensation",
    patterns: [
      /earn \$[0-9]+ (per day|daily|easy)/i,
      /work from home.{0,20}\$[0-9]+ (per hour|a day)/i,
      /get rich/i
    ],
    rule: "Promises unrealistically high pay for minimal or unspecialized work.",
    severity: 25
  }
];

export async function analyzePoster(imageFile) {
  try {
    // 1. Run OCR to extract text
    const { data: { text, confidence } } = await Tesseract.recognize(
      imageFile,
      'eng',
      { logger: m => console.log('OCR Progress:', m.status, Math.round(m.progress * 100)) } // could bubble this up to UI later
    );

    console.log("Extracted Text:", text);

    // 2. Run Heuristics Engine
    const flags = [];
    let score = 100; // Start with perfect score

    // Clean up text a bit for easier regex matching (replace multiple spaces/newlines)
    const normalizedText = text.replace(/\s+/g, ' ').toLowerCase();

    SCAM_HEURISTICS.forEach(heuristic => {
      // Check if any specific patterns in this rule match the text
      const isMatch = heuristic.patterns.some(pattern => pattern.test(normalizedText));
      
      if (isMatch) {
        flags.push({
          type: heuristic.type,
          rule: heuristic.rule
        });
        score -= heuristic.severity;
      }
    });

    // Floor score at 0
    score = Math.max(0, score);

    return {
      success: true,
      extractedText: text,
      confidence: Math.round(confidence),
      flags: flags,
      score: score,
      verdict: score >= 70 ? 'Real' : 'Fake',
    };

  } catch (error) {
    console.error("Text Extraction Failed:", error);
    return {
      success: false,
      error: "Failed to read text from image. Please try a clearer image.",
    };
  }
}
