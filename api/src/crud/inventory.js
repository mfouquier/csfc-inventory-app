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

router.get("/", async (req, res) => {
    try{
        let inventoryList = await knex 
            .select("*").from("inventory_ledger");
        res.status(200).send(inventoryList)
    } catch(err){
        console.log("Error fetching requests: "(err));
    }
})

router.post('/', async(req, res) => {
    try {
        await knex('inventory_ledger').insert({
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'directorate': req.body.directorate,
            'position': req.body.position,
            'laptop_sn': req.body.laptop_sn,
            'laptop_name': req.body.laptop_name,
            'router_sn': req.body.router_sn
        })

        let responseString = "Item added to database";
        res.status(201).send(responseString)
        
    } catch (error) {
       console.log('Error in posting new inventory', error) 
    }
})

router.delete('/:id', async(req, res) => {
    try {
        await knex('inventory_ledger')
        .where('id', req.params.id)
        .del()
        .then(res.send('Successfully Deleted'))
    } catch (err) {
        console.log('Error in Deleting Object', err)
    }
})

router.patch('/:id', async(req, res) => {
    console.log(req.params.id, req.body)
    try {
        let updatedObject = {
            'id': req.body.id,
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'directorate': req.body.directorate,
            'position': req.body.position,
            'laptop_sn': req.body.laptop_sn,
            'laptop_name': req.body.laptop_name,
            'router_sn': req.body.router_sn
        }
        let updatedEntry = await knex('inventory_ledger').where('id', req.params.id).update(updatedObject);
        res.status(200).send('Entry Updated!');
    } catch (error) {
        console.log('Error Updating Entry', error)
    }
})
