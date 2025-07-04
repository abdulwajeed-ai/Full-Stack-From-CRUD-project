import express from "express";
import Student from "../model/student.js"; // added `.js` if using ESM

const router = express.Router();

// CREATE
router.post("/create", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student created", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ (by roll no)
router.get("/read/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOne({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE (by roll no)
router.put("/update/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { rollNo: req.params.rollNo },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE (by roll no)
router.delete("/delete/:rollNo", async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
    if (!student) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
