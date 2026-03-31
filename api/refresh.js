export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const response = await fetch("https://api.rd.services/auth/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: "56c1973f-7ddf-49f2-96f1-528290448dbb",
      client_secret: "11a744f13b9d42d8baaad83ea4bc9e4e",
      refresh_token: "9Cl6jG0hZz9BdCsFeVm8oEjDj57bgPaN89ZSgeIFBo4"
    })
  });

  const data = await response.json();
  return res.status(200).json(data);
}
```

Depois do deploy, acessa no browser:
```
https://rd-proxy.vercel.app/api/refresh
