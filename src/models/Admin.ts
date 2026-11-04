import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAdminDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "super_admin" | "editor";
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema = new Schema<IAdminDocument>(
  {
    name: {
      type: String,
      required: [true, "اسم المسؤول مطلوب"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "البريد الإلكتروني مطلوب"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: [true, "كلمة المرور المشفرة مطلوبة"],
    },
    role: {
      type: String,
      enum: ["super_admin", "editor"],
      default: "editor",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin: Model<IAdminDocument> =
  mongoose.models.Admin || mongoose.model<IAdminDocument>("Admin", AdminSchema);
