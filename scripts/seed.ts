import { runDatabaseSeed } from "../src/lib/seed/runner";
import mongoose from "mongoose";

async function main() {
  try {
    await runDatabaseSeed();
    console.log("🎉 Seeding finished successfully.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed with error:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

main();
