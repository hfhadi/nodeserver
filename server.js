
import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;

// Replace with your Notion API key and database ID
// karabala notion db
const NOTION_API_KEY = 'secret_qC28KRlsKIdNPpySs0NKAW9y2YFvhqRhn64DKJRY2UU';
const NOTION_DATABASE_ID = 'ff9ca896efcb45c99509c50fe4e23f64c';

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
