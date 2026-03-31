export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { nome, email, telefone, empresa, faturamento, nicho, segmento } = req.body;

    const response = await fetch(`https://crm.rdstation.com/api/v1/deals?token=69caff506e1ed50013a5b86d`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deal: {
          name: nome,
          contacts_attributes: [{
            name: nome,
            emails: [{ email }],
            phones: [{ phone: telefone }]
          }],
          deal_custom_fields_attributes: [
            { value: segmento || "" },
            { value: faturamento || "" },
            { value: nicho || "" }
          ]
        }
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
