import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  order: number;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "اسم التصنيف مطلوب"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "معرف التصنيف (slug) مطلوب"],
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 1,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Category: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);
