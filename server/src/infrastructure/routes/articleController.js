import { Router } from 'express';
import { v4 as uuid } from "uuid";
import client from "../database/database.js";
const router = Router();

// Get article
router.get('/all', async (req, res, next) => {
    //TODO change this
    const response = await client.query(`SELECT * FROM "Article"`)
    res.json(response.rows);
});

// Get article by id
router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    const response = await client.query(`SELECT * FROM "Article" WHERE id = $1`, [id])
    res.json(response.rows[0]);
}
);

// Get article by shopID
router.get('/shop/:id', async (req, res, next) => {
    const { id } = req.params;
    const response = await client.query(`SELECT * FROM "Article" WHERE shopID = $1`, [id])
    res.json(response.rows);
});

//TODO: Check if admin is logged in
// Create article
router.post('/new', async (req, res, next) => {
    const { name, price, description, urlimg, shopID, type } = req.body
    
    console.log(name, price, description, urlimg, shopID, type)
    
    //FIXME Bug with urlimg 
    const text = `INSERT INTO "Article" (id, name, price, description, urlimg, shopID, type) VALUES($1, $2, $3, $4, $5, $6, $7)`;

    const values = [uuid(), name, price, description, urlimg, shopID, type];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })
})


//TODO: Check if admin is logged in
// Delete article
router.delete('/:id', async (req, res, next) => {
    const { id } = req.params;
    const response = await client.query(`DELETE FROM "Article" WHERE id = $1`, [id])
    res.json({ message: "deleted" })
})


//TODO: Check if admin is logged in
// Update article
router.put('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, price, description, urlimg, shopID, type } = req.body
    const response = await client.query(`UPDATE "Article" SET name = $1, price = $2, description = $3, urlimg = $4, shopID = $5, type = $6 WHERE id = $7`, [name, price, description, urlimg, shopID, type, id])
    res.json({ message: "updated" })
})


export default router;