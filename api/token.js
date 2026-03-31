export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { code } = req.query;

  const params = new URLSearchParams();
  params.append("client_id", "56c1973f-7ddf-49f2-96f1-528290448dbb");
  params.append("client_secret", "11a744f13b9d42d8baaad83ea4bc9e4e");
  params.append("code", code);
  params.append("redirect_uri", "https://rd-proxy.vercel.app/api/callback");
  params.append("grant_type", "authorization_code");

  const response = await fetch("https://api.rd.services/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await response.json();
  return res.status(200).json(data);
}
