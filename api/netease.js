/**
 * Vercel Serverless Function — 网易云 API 代理
 * 访问：/api/netease?path=/user/record&uid=xxx&type=1
 * 转发到上游网易云 API 服务
 */
const UPSTREAM = process.env.NETEASE_API || 'https://netease-api.example.vercel.app';

export default async function handler(req, res) {
  const path = req.query.path || '/user/record';
  const queryString = new URL(req.url, 'http://localhost').searchParams;
  queryString.delete('path');
  const qs = queryString.toString();
  const targetUrl = `${UPSTREAM}${path}${qs ? '?' + qs : ''}`;

  try {
    const resp = await fetch(targetUrl);
    const data = await resp.text();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(resp.status).send(data);
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}
