import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  rollNo: {           // ✅ Correct casing
    type: String,
    required: true    // ✅ Spelling fixed
  },
  phone: String,
  branch: String
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
