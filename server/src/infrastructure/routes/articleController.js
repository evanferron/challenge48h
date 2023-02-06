import { Router } from 'express';
import { v4 as uuid } from "uuid";
// import userPostgresRepository from '../database/repositories/userPostgresRepository.js';
import client from "../database/database.js";
const router = Router();

router.get('/all', async (req, res, next) => {
    const response = await client.query(`SELECT * FROM "OrderArticleLink"`)
    res.json(response.rows);
});

router.get('/:categorie', async (req, res, next) => {
    const response = await client.query(`SELECT * FROM "OrderArticleLink" INNER JOIN Article ORDER BY type`)
    //const response = await client.query(`SELECT type FROM "OrderArticleLink" INNER JOIN Article`)
    res.json(response.rows);
});

router.get('/:shopId', async (req, res, next) => {
    const response = await client.query(`SELECT id FROM "Shop"`)
    res.json(response.rows);
});

router.post("/new", async (req,res,next) =>{
    const {id,name,price,description,urlmg,shopID,type}= req.body

    console.log(id,name,price,description,urlmg,shopID,type)

    const text = `INSERT INTO "Article"(id,name,price,description,urlmg,shopID,type) VALUES($1,$2,$3,$4,$5,$6,$7)`;
    const values = [uuid(), id,name,price,description,urlmg,shopID,type]
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "Insert" })
            console.log(res.rows[0])
        }
    })
})

router.delete("/:id", async (req,res,next) =>{
    const {articleID,bagID} = req.body

    console.log(articleID)

    const text = `DELETE FROM "Article" WHERE articleID=$1`

    const values = [uuid(), articleID];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "delete" })
            console.log(res.rows[0])
        }
    })
})