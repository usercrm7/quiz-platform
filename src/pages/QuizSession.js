import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const QuizSession = ({ quizId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const socket = io('http://localhost:5000'); // Backend URL

  useEffect(() => {
    // Quiz oturumuna katıl
    socket.emit('joinQuiz', quizId);

    // Yeni soru geldiğinde
    socket.on('newQuestion', (question) => {
      setCurrentQuestion(question);
    });

    // Skor güncellemesi
    socket.on('scoreUpdate', (scores) => {
      setLeaderboard(scores);
    });

    return () => {
      socket.disconnect(); // Component kaldırıldığında bağlantıyı kes
    };
  }, [quizId]);

  const handleAnswer = (selectedOption) => {
    socket.emit('submitAnswer', {
      quizId,
      questionIndex: currentQuestion.index,
      answer: selectedOption
    });
  };

  return (
    <div>
      <h2>{currentQuestion?.text}</h2>
      {currentQuestion?.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
      <h3>Skor Tablosu</h3>
      {leaderboard.map((user, index) => (
        <div key={user.id}>{index + 1}. {user.name}: {user.score}</div>
      ))}
    </div>
  );
};

export default QuizSession;

/*
// Backend'de soru başına 20 saniye
const startQuestion = (quizId, questionIndex) => {
  io.to(quizId).emit('newQuestion', questions[questionIndex]);
  setTimeout(() => endQuestion(quizId), 20000);
};*/