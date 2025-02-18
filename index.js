require('dotenv').config();

const mongoose = require('./mongodb');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
const routes = require('./routes'); // Importer les routes centralisées


app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Centralisation des routes via routes.js
// routes(app);
app.use('/api',routes);


app.listen(port, () => {
  console.log(`Example app listening on port localhost:${port}`)
});
      
