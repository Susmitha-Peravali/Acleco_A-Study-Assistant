require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const generateRouter = require('./routes/generate');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/generate', generateRouter);

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Start ───────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🟢  Study Assistant server running on http://localhost:${PORT}`);
  console.log(`    Model: ${process.env.MODEL_NAME || 'gemini-2.5-flash'}\n`);
});
// Force restart
