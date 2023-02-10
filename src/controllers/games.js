import { db } from "../config/database.js"



export async function listGames(req, res) {
    try {
        const games = await db.query(`SELECT * FROM games`)

        res.send(games.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function insertGames(req, res) {

    const {
        name,
        image,
        stockTotal,
        pricePerDay } = req.body

    try {

        const exist = await db.query(`SELECT * FROM games WHERE name = $1`,[name])

        if(exist.rows.length > 0) return res.sendStatus(409)

        const singleGame = await db.query(`INSERT INTO games (name,image,"stockTotal","pricePerDay") VALUES ($1,$2,$3,$4);`,[name,image,stockTotal,pricePerDay])

        console.log(singleGame)

        res.sendStatus(201)


    } catch (error) {
        res.status(500).send(error.message)
    }
}