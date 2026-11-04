import { connectToDatabase } from "@/lib/mongodb";
import { Lesson, LessonStep, Hadith, Category } from "@/models";
import { wuduLessonData } from "./wudu-data";
import { salahLessonData } from "./salah-data";
import { hadithsData } from "./hadith-data";
import { categoriesData } from "./category-data";

export async function runDatabaseSeed(): Promise<{
  categoriesCount: number;
  lessonsCount: number;
  stepsCount: number;
  hadithsCount: number;
}> {
  console.log("🌱 بدء عملية تهيئة وغرس البيانات التعليمية (Database Seeding)...");
  await connectToDatabase();

  // 1. Seed Categories
  let categoriesCount = 0;
  for (const cat of categoriesData) {
    await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    );
    categoriesCount++;
  }
  console.log(`✅ تم تجهيز ${categoriesCount} تصنيفات بنجاح.`);

  // 2. Seed Wudu Lesson & Steps
  const { steps: wuduSteps, ...wuduLessonCore } = wuduLessonData;
  const wuduLessonDoc = await Lesson.findOneAndUpdate(
    { slug: wuduLessonCore.slug },
    { $set: wuduLessonCore },
    { upsert: true, new: true }
  );

  let stepsCount = 0;
  for (const step of wuduSteps) {
    await LessonStep.findOneAndUpdate(
      { lessonId: wuduLessonDoc._id, slug: step.slug },
      {
        $set: {
          ...step,
          lessonId: wuduLessonDoc._id,
        },
      },
      { upsert: true, new: true }
    );
    stepsCount++;
  }

  // 3. Seed Salah Lesson & Steps
  const { steps: salahSteps, ...salahLessonCore } = salahLessonData;
  const salahLessonDoc = await Lesson.findOneAndUpdate(
    { slug: salahLessonCore.slug },
    { $set: salahLessonCore },
    { upsert: true, new: true }
  );

  for (const step of salahSteps) {
    await LessonStep.findOneAndUpdate(
      { lessonId: salahLessonDoc._id, slug: step.slug },
      {
        $set: {
          ...step,
          lessonId: salahLessonDoc._id,
        },
      },
      { upsert: true, new: true }
    );
    stepsCount++;
  }
  console.log(`✅ تم تجهيز 2 درسين تعليميين و ${stepsCount} خطوة تعليمية مصورة.`);

  // 4. Seed Verified Hadiths
  let hadithsCount = 0;
  for (const hadith of hadithsData) {
    await Hadith.findOneAndUpdate(
      { hadithNumber: hadith.hadithNumber, collection: hadith.collection },
      { $set: hadith },
      { upsert: true, new: true }
    );
    hadithsCount++;
  }
  console.log(`✅ تم تجهيز وتوثيق ${hadithsCount} أحاديث نبوية شريفة.`);

  console.log("✨ تمت تهيئة قاعدة البيانات بنجاح تام وبشكل متكرر وآمن (Idempotent).");

  return {
    categoriesCount,
    lessonsCount: 2,
    stepsCount,
    hadithsCount,
  };
}
