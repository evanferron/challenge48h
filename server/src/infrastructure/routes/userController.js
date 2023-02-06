import { Router } from 'express';
import { v4 as uuid } from "uuid";
// import userPostgresRepository from '../database/repositories/userPostgresRepository.js';
import client from "../database/database.js";
const router = Router();

// Get user
router.get('/', async (req, res, next) => {
    //TODO change this
    const response = await client.query(`SELECT * FROM "User"`)
    res.json(response.rows);
});

router.post('/create', async (req, res, next) => {
    const { email, password, name } = req.body

    //TODO : Hash password
    console.log(email, password, name)

    const text = `INSERT INTO "User"(id, passwordhash, name, email) VALUES($1, $2, $3, $4)`;

    const values = [uuid(), password, name, email];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })

})

router.post('/login', async (req, res, next) => {
    const { email, password, name } = req.body

    //TODO : Hash password
    console.log(email, password, name)

    //const text = `INSERT INTO "User"(id, passwordhash, name, email) VALUES($1, $2, $3, $4)`;

    const values = [uuid(), password, name, email];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })

})

router.post('/logout', async (req, res, next) => {
    const { email, password, name } = req.body

    //TODO : Hash password
    console.log(email, password, name)

    //???
    //const text = `INSERT INTO "User"(id, passwordhash, name, email) VALUES($1, $2, $3, $4)`;

    const values = [uuid(), password, name, email];
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
