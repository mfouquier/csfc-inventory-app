const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const path = require('path');
module.exports = router;
const PORT = process.env.PORT || 8082;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)


const inventory_route = require('./crud/inventory')

app.use('/inventory', inventory_route)

app.listen(PORT, () => {
    console.log(`Inventory application listening on ${PORT}`);
})

app.get('/', (req, res) => {
    res.status(200).send("It's working")
})