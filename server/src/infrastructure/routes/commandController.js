import { Router } from 'express';
import { v4 as uuid } from "uuid";
// import userPostgresRepository from '../database/repositories/userPostgresRepository.js';
import client from "../database/database.js";
const router = Router();

router.get('/all', async (req, res, next) => {
    const response = await client.query(`SELECT * FROM "BagArticleLink"`)
    res.json(response.rows);
});

router.get('/:id', async (req, res, next) => {
    const response = await client.query(`SELECT articleID,bagID FROM "BagArticleLink"`)
    res.json(response.rows);
});