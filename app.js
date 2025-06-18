require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');
const quizRoutes = require('./routes/quizRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/quizzes', quizRoutes);

// MongoDB Bağlantısı
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB bağlandı!'))
  .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

// Middleware'ler
app.use(express.json());
app.use(cors());


// Sunucuyu Başlat
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Sunucu ${port} portunda çalışıyor!`));