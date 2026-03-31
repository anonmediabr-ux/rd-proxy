const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5yZC5zZXJ2aWNlcyIsInN1YiI6IlJDR2RWQ0xVbDF1cGdoRjdkWXM5a1AtS3V6R2tfLTNVUVFwNUdIaTdkd01AY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vYXBwLnJkc3RhdGlvbi5jb20uYnIvYXBpL3YyLyIsImFwcF9uYW1lIjoiQW5vbU1lZGlhIExQIEludGVncmF0aW9uIiwiZXhwIjoxNzc1MDA1MzIzLCJpYXQiOjE3NzQ5MTg5MjMsInNjb3BlIjoiIn0.PwIlfRonYGfN3AAShVej4ttsCFPmnHB8IXEBsVvzwr-YYlBYvN6ldlWR5AWBEWS3ReKaUsnIs6jNi0R6jNXm26HSqHckOnk_mbajk5jh-TF_veE5TXzy3eeQg1JMW2uoILPPLahOD368kPujpoUgeBuZ0WRhqeoB6E47CJ-nk_gprfgYHCjeut97V2D85cQlIrWDi5ypAnkkVB71QChkLuQpcGyIAbxskt0u0X9s8D7ybZ6XYfO2_L_l7lPy3mSMYG9rrmV5fFG4z6vbQs7_Hb9slCJuA0qMVkC0HBhdEFofWtpKpoDvfl7-vZXDtijeSkxy0cf86jOK2GVMign-Rg";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { nome, email, telefone, faturamento, nicho, segmento } = req.body;

    // 1. Cria contato via v2
    const contatoRes = await fetch("https://api.rd.services/crm/v2/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          name: nome,
          emails: [{ address: email }],
          phones: [{ number: telefone }]
        }
      })
    });
    const contatoData = await contatoRes.json();
    const contatoId = contatoData?.data?.id;

    // 2. Cria deal via v2 com contact_ids
    const dealRes = await fetch("https://api.rd.services/crm/v2/deals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        data: {
          name: nome,
          pipeline_id: "6734f0e858b0a0001e9f4d68",
          stage_id: "6734f0e858b0a0001e9f4d6a",
          contact_ids: contatoId ? [contatoId] : [],
          custom_fields: {
            "673cdc1cac052c0013cc821a": faturamento || "",
            "689933711797fb00177b3cd1": nicho || "",
            "67460b890127e40013c0bcc7": segmento || "Gastronomia",
            "67460dbb096b0300132ae559": "Proprietário"
          }
        }
      })
    });

    const deal = await dealRes.json();
    return res.status(200).json({ contatoId, contatoData, deal });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
