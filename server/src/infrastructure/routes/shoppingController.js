import { Router } from 'express';
import { v4 as uuid } from "uuid";
import client from "../database/database.js";

const router = Router();

// Add Shop
router.post('/', async (req, res, next) => {
    const { name, address } = req.body

    const text = `INSERT INTO "Shop"(id, name, address) VALUES($1, $2, $3)`;

    const values = [uuid(), name, address];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })
})

// delete shop
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    
    const text = `DELETE FROM "Shop" WHERE id = $1`;
    const values = [id];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "deleted" })
            console.log(res.rows[0])
        }
    })
})

// Create order
router.post('/order', async (req, res, next) => {
    const { userID, shopID, articleID, quantity } = req.body

    const text = `INSERT INTO "Order"(id, userID, shopID, articleID, quantity) VALUES($1, $2, $3, $4, $5)`;

    const values = [uuid(), userID, shopID, articleID, quantity];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })
})

export default router;