import { mongoose } from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      trim: true,
    },
    companyName: {
      type: String,
      default: 'Unknown Company',
    },
    // Verification Results
    verification: {
      scrapedEmails: [String],
      mxValid: {
        type: Boolean,
        default: false,
      },
      status: {
        type: String,
        enum: ['Verified', 'Invalid Domain', 'No MX Record'],
        default: 'Verified',
      },
    },
    // Gemini AI Deal Scoring
    aiAnalysis: {
      dealScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        required: true,
      },
      summary: String,
      strengths: [String],
      coldPitch: String,
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model('Lead', leadSchema);