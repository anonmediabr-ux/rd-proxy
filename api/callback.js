export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).json({ error: "Code não encontrado" });

  // Mostra o code na tela sem trocar ainda
  return res.status(200).send(`
    <html>
      <body>
        <h2>Code recebido!</h2>
        <p>Cole esse code abaixo e clique em Trocar:</p>
        <input id="code" value="${code}" style="width:100%;padding:10px" readonly />
        <br/><br/>
        <button onclick="trocar()">Trocar por Token</button>
        <pre id="result"></pre>
        <script>
          async function trocar() {
            const code = document.getElementById('code').value;
            const res = await fetch('/api/token?code=' + code);
            const data = await res.json();
            document.getElementById('result').innerText = JSON.stringify(data, null, 2);
          }
        </script>
      </body>
    </html>
  `);
}
