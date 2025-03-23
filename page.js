import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 4000;

// Replace with your Notion API key
const NOTION_API_KEY = 'secret_7CQMiRICnGUqslPXXTx2fkamkPzel2k3DFpZiqDpICH';

app.use(json());
app.use(cors());

// Define the route with a dynamic pageid parameter
app.get('/notion/:pageid', async (req, res) => {
  const pageid = req.params.pageid;

  const response = await fetch(`https://api.notion.com/v1/pages/${pageid}`, {
    method: 'get',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2021-08-16'
    }
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
