import { Router } from 'express';
import { v4 as uuid } from "uuid";
import client from "../database/database.js";

const router = Router();

// get all commands
router.get('/', async (req, res, next) => {
    const response = await client.query(`SELECT * FROM "Command"`)
    res.json(response.rows);
});

// get command by id
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const response = await client.query(`SELECT * FROM "Command" WHERE id = $1`, [id])
    res.json(response.rows);
});

export default router;