
const QuizSession = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  useEffect(() => {
    socket.on('newQuestion', (question) => {
      setCurrentQuestion(question);
    });
  }, []);
  return (
    <div>
      <h3>{currentQuestion?.text}</h3>
      {currentQuestion?.options.map((option, i) => (
        <button key={i} onClick={() => handleAnswer(i)}>{option}</button>
      ))}
    </div>
  );
};


module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('startQuiz', (quizId) => {
      const quiz = getQuiz(quizId);
      quiz.questions.forEach((question, index) => {
        setTimeout(() => {
          socket.emit('newQuestion', question);
        }, index * 20000); // Her soru 20 saniye
      });
    });
  });
};