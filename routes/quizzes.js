router.post('/', authMiddleware, async (req, res) => {
  const quiz = new Quiz({
    title: req.body.title,
    questions: req.body.questions,
    createdBy: req.user._id
  });
  await quiz.save();
  res.status(201).json(quiz);
});