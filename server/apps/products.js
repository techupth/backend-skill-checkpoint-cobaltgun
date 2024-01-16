import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const questionRouter = Router();

questionRouter.get("/", async (req, res) => {
  const collection = db.collection("Question");
  const question = await collection.find({}).limit(10).toArray();

  return res.json({ data: question });
});

questionRouter.post("/", async (req, res) => {
  const collection = db.collection("Question");
  const foodData = {
    ...req.body,
  };
  await collection.insertOne(foodData);

  return res.json({
    message: "Question has been created successfully",
  });
});

questionRouter.get("/:questionId", async (req, res) => {
  const collection = db.collection("Question");
  const questionId = new ObjectId(req.params.questionId);

  const question = await collection.findOne({ _id: questionId });

  return res.json({
    data: question,
  });
});

questionRouter.put("/:questionId", async (req, res) => {
  const collection = db.collection("Question");
  const questionId = new ObjectId(req.params.questionId);

  const newQuestionData = { ...req.body };
  await collection.updateOne(
    {
      _id: questionId,
    },
    { $set: newQuestionData }
  );
  return res.json({
    message: "Question has been updated successfully",
  });
});

questionRouter.delete("/:questionId", async (req, res) => {
  const collection = db.collection("Question");
  const questionId = new ObjectId(req.params.questionId);

  await collection.deleteOne({ _id: questionId });
  return res.json({
    message: "Question has been deleted successfully",
  });
});

export default questionRouter;
