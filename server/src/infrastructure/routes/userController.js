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

// Create user
router.post('/', async (req, res, next) => {
    const { email, password, name, address } = req.body

    //TODO : Hash password
    console.log(email, password, name, address)

    const text = `INSERT INTO "User"(id, passwordhash, name, email, address) VALUES($1, $2, $3, $4, $5)`;

    const values = [uuid(), password, name, email, address];
    await client.query(text, values, (err) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json({ message: "created" })
            console.log(res.rows[0])
        }
    })
})

// Login user
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    const text = `SELECT * FROM "User" WHERE email = $1 AND passwordhash = $2`;

    const values = [email, password];
    await client.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            res.json(result.rows[0])
            console.log(result.rows[0])
        }
    })
})

// Logout user
router.post('/logout', async (req, res, next) => {
    const { email, password } = req.body;

    const text = `SELECT * FROM "User" WHERE email = $1 AND passwordhash = $2`;

    const values = [email, password];
    await client.query(text, values, (err, result) => {
        if (err) {
            console.log(err.stack)
        } else {
            //TODO: Logout user
            res.json(result.rows[0])
            console.log(result.rows[0])
        }
    })
})

export default router;
