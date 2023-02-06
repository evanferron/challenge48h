import { Router } from 'express';
import { v4 as uuid } from "uuid";
// import userPostgresRepository from '../database/repositories/userPostgresRepository.js';
import client from "../database/database.js";
const router = Router();

router.get('/', async (req, res, next) => {
    const response = await client.query(`SELECT * FROM "OrderArticleLink"`)
    res.json(response.rows);
});

router.post('/add', async (req, res, next) => {
    const { articleID, bagID, numberOfArticles, color, size } = req.body

    //TODO : Hash password
    console.log(articleID, bagID, numberOfArticles, color, size)

    const text = `INSERT INTO "BagArticleLink"(articleID, bagID, numberOfArticles, color, size) VALUES($1, $2, $3, $4, $5)`;

    const values = [uuid(), articleID, bagID, numberOfArticles, color, size];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })

})

router.delete("/:id", async (req,res,next) =>{
    const {articleID,bagID} = req.body

    console.log(articleID, bagID)

    const text = `DELETE FROM "BagArticleLink" WHERE articleID=$1 AND bagID=$2`

    const values = [uuid(), articleID, bagID];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "delete" })
            console.log(res.rows[0])
        }
    })
})

router.post("/order", async (req,res,next) =>{
    const {id,createAt,updateAt}= req.body

    console.log(id, createAt, updateAt)

    const text = `INSERT INTO "Order"(id,createAt,updateAt) VALUES($1,$2,$3)`;
    //const text = `UPDATE "Order" SET createAt = $2, updateAt=$3 WHERE id = $1`
    const values = [uuid(), id, createAt, updateAt]
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })
})