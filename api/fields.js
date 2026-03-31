export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  
  const response = await fetch(`https://crm.rdstation.com/api/v1/custom_fields?token=69caff506e1ed50013a5b86d`);
  const data = await response.json();
  return res.status(200).json(data);
}
