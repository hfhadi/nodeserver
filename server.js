
import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;


// Replace with your Notion API key and database ID
// karabala notion db

const NOTION_API_KEY = 'secret_qC28KRlsKIdNPpySs0NKAW9y2YFvhqRhn64DKJRY2UU';
const NOTION_DATABASE_ID = 'ff9ca896efcb45c99509c50fe4e23f64';

app.use(json());
app.use(cors());

// Endpoint to query the Notion database
app.post('/notion/query', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Endpoint to retrieve a Notion page by its ID
app.get('/notion/page/:pageid', async (req, res) => {
  try {
    const pageid = req.params.pageid;

    const response = await fetch(`https://api.notion.com/v1/pages/${pageid}`, {
      method: 'GET',
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
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Notion proxy server listening at http://localhost:${port}`);
});
