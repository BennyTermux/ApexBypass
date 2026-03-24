import express from 'express';
import { bypassLink } from './bypassEngine';
import { apiRoutes } from './apiRoutes';
import { startUpdater } from './intelligence/updater';
import { initRedis } from './storage';

const app = express();
app.use(express.json());

app.use('/api', apiRoutes);

app.post('/bypass', async (req, res) => {
  try {
    const { url } = req.body;
    const direct = await bypassLink(url);
    res.json({ success: true, directUrl: direct, latency: Date.now() - (req.body.timestamp || 0) });
  } catch (e) {
    res.status(500).json({ success: false, error: (e as Error).message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`ApexBypass Core running on port ${PORT}`);
  initRedis();
  startUpdater();
});
