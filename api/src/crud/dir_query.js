const express = require("express");
const cors = require("cors");
const app = express();
const router = express.Router();

module.exports = router;

app.use(express.json());
app.use(cors());

const env = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[env];
const knex = require("knex")(config);

router.get('/', async (req, res) => {//returns all the devices
  dirQuery = req.query.directorate;
  console.log(dirQuery)
  try {
    let deviceList = await knex.from('inventory_ledger')
      .select('*')
      .whereILike('directorate', dirQuery);
    res.status(200).send(deviceList);

  } catch (e) {
    console.log('Error in fetching devices:', e);
  }
})