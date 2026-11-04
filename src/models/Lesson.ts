import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILessonDocument extends Document {
  title: string;
  slug: string;
  description: string;
  category: "wudu" | "salah";
  introduction: string;
  coverImage: string;
  status: "draft" | "published";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const LessonSchema = new Schema<ILessonDocument>(
  {
    title: {
      type: String,
      required: [true, "عنوان الدرس مطلوب"],
      trim: true,
      maxlength: [200, "عنوان الدرس يجب ألا يتجاوز 200 حرف"],
    },
    slug: {
      type: String,
      required: [true, "معرف الرابط (slug) مطلوب"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, "وصف الدرس مطلوب"],
      trim: true,
      maxlength: [1000, "الوصف يجب ألا يتجاوز 1000 حرف"],
    },
    category: {
      type: String,
      required: [true, "تصنيف الدرس مطلوب"],
      enum: {
        values: ["wudu", "salah"],
        message: "التصنيف يجب أن يكون wudu أو salah",
      },
      index: true,
    },
    introduction: {
      type: String,
      required: [true, "مقدمة الدرس مطلوبة"],
      trim: true,
    },
    coverImage: {
      type: String,
      required: [true, "صورة الغلاف مطلوبة"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["draft", "published"],
        message: "حالة الدرس إما draft أو published",
      },
      default: "published",
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 1,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for optimal querying of published lessons by category
LessonSchema.index({ category: 1, status: 1, order: 1 });

export const Lesson: Model<ILessonDocument> =
  mongoose.models.Lesson || mongoose.model<ILessonDocument>("Lesson", LessonSchema);
