export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Code não encontrado" });

  try {
    const response = await fetch("https://api.rd.services/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: "56c1973f-7ddf-49f2-96f1-528290448dbb",
        client_secret: "11a744f13b9d42d8baaad83ea4bc9e4e",
        code: code
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
