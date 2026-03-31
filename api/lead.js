export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { nome, email, telefone, faturamento, nicho, segmento } = req.body;

    // 1. Cria contato
    const contatoRes = await fetch(`https://crm.rdstation.com/api/v1/contacts?token=69caff506e1ed50013a5b86d`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contact: {
          name: nome,
          emails: [{ email }],
          phones: [{ phone: telefone }]
        }
      })
    });
    const contatoData = await contatoRes.json();
    const contatoId = contatoData?.contact?._id || contatoData?._id;

    // 2. Cria deal
    const dealRes = await fetch(`https://crm.rdstation.com/api/v1/deals?token=69caff506e1ed50013a5b86d`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        deal: {
          name: nome,
          deal_pipeline_id: "6734f0e858b0a0001e9f4d68",
          deal_stage_id: "6734f0e858b0a0001e9f4d6a",
          deal_custom_fields: [
            { custom_field_id: "673cdc1cac052c0013cc821a", value: faturamento || "" },
            { custom_field_id: "689933711797fb00177b3cd1", value: nicho || "" },
            { custom_field_id: "67460b890127e40013c0bcc7", value: segmento || "Gastronomia" },
            { custom_field_id: "67460dbb096b0300132ae559", value: "Proprietário" }
          ]
        }
      })
    });
    const deal = await dealRes.json();
    const dealId = deal?._id || deal?.id;

    // 3. Associa contato ao deal via PUT
    if (contatoId && dealId) {
      await fetch(`https://crm.rdstation.com/api/v1/deals/${dealId}?token=69caff506e1ed50013a5b86d`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deal: {
            contacts_ids: [contatoId]
          }
        })
      });
    }

    return res.status(200).json({ contatoId, dealId, deal });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
