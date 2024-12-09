
import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;

// Replace with your Notion API key and database ID
const NOTION_API_KEY = 'secret_7CQMiRICnGUqslPXXTx2fkamkPzel2k3DFpZiqDpICH';
const NOTION_DATABASE_ID = '82566198aca9482c87ff3e2bdb7f484c';

app.use(json());
app.use(cors());

app.post('/notion', async (req, res) => {
  const response = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-08-16'
    },
    body: JSON.stringify(req.body)
  });

  if (!response.ok) {
    res.status(response.status).send(response.statusText);
    return;
  }

  const data = await response.json();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Notion proxy server listening at http://localhost:${port}`);
});
