/**
 * Vercel Serverless Function — Steam API 代理
 * 访问：/api/steam?url=ENCODED_STEAM_URL
 */
export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: 'Missing ?url=' });

  try {
    const resp = await fetch(url);
    const data = await resp.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
