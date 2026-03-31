export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Code não encontrado" });

  const response = await fetch("https://api.rd.services/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "56c1973f-7ddf-49f2-96f1-528290448dbb",
      client_secret: "11a744f13b9d42d8baaad83ea4bc9e4e",
      code,
    })
  });

  const data = await response.json();
  
  // Mostra os tokens na tela
  return res.status(200).json(data);
}
```

Depois do deploy, acessa essa URL no browser pra autorizar:
```
https://api.rd.services/auth/dialog?client_id=56c1973f-7ddf-49f2-96f1-528290448dbb&redirect_uri=https://rd-proxy.vercel.app/api/callback
