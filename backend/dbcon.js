import mongoose from "mongoose";

function connectToDB() {
  console.log("Connecting to MongoDB...");

  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to Database'))
    .catch((error) => {
      console.error("❌ Database connection error:", error);
    });
}

export default connectToDB;
