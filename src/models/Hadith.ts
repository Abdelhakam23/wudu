import mongoose, { Schema, Model } from "mongoose";

export interface IHadithSchema {
  arabicText: string;
  narrator: string;
  collection: string;
  book?: string;
  chapter?: string;
  hadithNumber?: string;
  grading?: string;
  topic: "wudu" | "salah" | "general_purification";
  explanation?: string;
  sourceUrl?: string;
  verificationStatus: "verified" | "pending_review";
  createdAt?: Date;
  updatedAt?: Date;
}

const HadithSchema = new Schema<IHadithSchema>(
  {
    arabicText: {
      type: String,
      required: [true, "نص الحديث الشريف مطلوب"],
      trim: true,
    },
    narrator: {
      type: String,
      required: [true, "اسم الراوي (الصحابي) مطلوب"],
      trim: true,
      index: true,
    },
    collection: {
      type: String,
      required: [true, "المصدر / التخريج مطلوب"],
      trim: true,
      index: true,
    },
    book: {
      type: String,
      trim: true,
    },
    chapter: {
      type: String,
      trim: true,
    },
    hadithNumber: {
      type: String,
      trim: true,
    },
    grading: {
      type: String,
      trim: true,
      default: "صحيح",
    },
    topic: {
      type: String,
      required: true,
      enum: {
        values: ["wudu", "salah", "general_purification"],
        message: "موضوع الحديث يجب أن يكون wudu أو salah أو general_purification",
      },
      index: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
    sourceUrl: {
      type: String,
      trim: true,
    },
    verificationStatus: {
      type: String,
      required: true,
      enum: {
        values: ["verified", "pending_review"],
        message: "حالة التوثيق إما verified أو pending_review",
      },
      default: "verified",
      index: true,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

// Compound index for filtering verified hadiths by topic and collection
HadithSchema.index({ verificationStatus: 1, topic: 1, collection: 1 });
// Full-text search index on Arabic text and narrator
HadithSchema.index({ arabicText: "text", narrator: "text", explanation: "text" });

export const Hadith: Model<IHadithSchema> =
  mongoose.models.Hadith || mongoose.model<IHadithSchema>("Hadith", HadithSchema);
