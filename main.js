import express, { json } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000; // You can change the port if needed

// Replace with your Notion API key and database ID
//const NOTION_API_KEY = 'secret_qC28KRlsKIdNPpySs0NKAW9y2YFvhqRhn64DKJRY2UU';
//const NOTION_DATABASE_ID = '82566198aca9482c87ff3e2bdb7f484c';
// need to change the key and id
app.use(json());
app.use(cors());

// Endpoint to query the Notion database
app.post('/notion/query/:queryid/:notionkey', async (req, res) => {

 const queryid = req.params.queryid;
 const notionkey = req.params.notionkey;
  try {
    const response = await fetch(`https://api.notion.com/v1/databases/${queryid}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionkey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-08-16',
        'Access-Control-Allow-Origin':'*'
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
app.get('/notion/page/:pageid/:notionkey', async (req, res) => {
  try {
    const pageid = req.params.pageid;
    const notionkey = req.params.notionkey;
    const response = await fetch(`https://api.notion.com/v1/pages/${pageid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${notionkey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-08-16',
         'Access-Control-Allow-Origin':'*'
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
