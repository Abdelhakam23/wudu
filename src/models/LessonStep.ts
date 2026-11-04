import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IReferenceSubdocument {
  title: string;
  source: string;
  url?: string;
}

export interface ILessonStepDocument extends Document {
  lessonId: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  detailedExplanation: string;
  image: string;
  imageAlt: string;
  order: number;
  classification: "obligatory" | "sunnah" | "recommended" | "educational";
  notes: string[];
  references: IReferenceSubdocument[];
  recitationArabic?: string;
  recitationTranslation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ReferenceSchema = new Schema<IReferenceSubdocument>(
  {
    title: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    url: { type: String, trim: true },
  },
  { _id: false }
);

const LessonStepSchema = new Schema<ILessonStepDocument>(
  {
    lessonId: {
      type: Schema.Types.ObjectId,
      ref: "Lesson",
      required: [true, "معرف الدرس التابع مطلوب"],
      index: true,
    },
    title: {
      type: String,
      required: [true, "عنوان الخطوة مطلوب"],
      trim: true,
      maxlength: [200, "عنوان الخطوة يجب ألا يتجاوز 200 حرف"],
    },
    slug: {
      type: String,
      required: [true, "معرف الخطوة (slug) مطلوب"],
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "الوصف المختصر مطلوب"],
      trim: true,
    },
    detailedExplanation: {
      type: String,
      required: [true, "الشرح التفصيلي مطلوب"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "رابط الصورة التعليمية مطلوب"],
      trim: true,
    },
    imageAlt: {
      type: String,
      required: [true, "النص البديل للصورة مطلوب"],
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      index: true,
    },
    classification: {
      type: String,
      required: true,
      enum: {
        values: ["obligatory", "sunnah", "recommended", "educational"],
        message: "حكم الخطوة غير صالح",
      },
      default: "sunnah",
      index: true,
    },
    notes: {
      type: [String],
      default: [],
    },
    references: {
      type: [ReferenceSchema],
      default: [],
    },
    recitationArabic: {
      type: String,
      trim: true,
    },
    recitationTranslation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for querying steps of a lesson in correct order
LessonStepSchema.index({ lessonId: 1, order: 1 });
LessonStepSchema.index({ lessonId: 1, slug: 1 }, { unique: true });

export const LessonStep: Model<ILessonStepDocument> =
  mongoose.models.LessonStep ||
  mongoose.model<ILessonStepDocument>("LessonStep", LessonStepSchema);
