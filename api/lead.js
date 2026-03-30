export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const response = await fetch("https://crm.rdstation.com/api/v1/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": "69caff506e1ed50013a5b86d"
      },
      body: JSON.stringify({
        deal: {
          name: req.body.nome,
          contacts: [{
            name: req.body.nome,
            emails: [{ email: req.body.email }],
            phones: [{ phone: req.body.telefone }]
          }],
          deal_custom_fields: [
            { custom_field_id: "segmento", value: req.body.segmento },
            { custom_field_id: "faturamento", value: req.body.faturamento },
            { custom_field_id: "nicho", value: req.body.nicho }
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
