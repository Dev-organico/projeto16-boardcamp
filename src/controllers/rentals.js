import { db } from "../config/database.js"
import dayjs from "dayjs"


export async function listRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT
        rentals.*,
        JSON_BUILD_OBJECT('id',customers.id,'name',customers.name) AS customer,
        JSON_BUILD_OBJECT('id',games.id,'name',games.name) AS game
        FROM rentals
        JOIN customers
            ON rentals."customerId" = customers.id
        JOIN games
            ON rentals."gameId" = games.id
        `)

        res.send(rentals.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function insertRent(req, res) {

    const { customerId,gameId,daysRented} = req.body

    const today = dayjs().format("YYYY-MM-DD")

    try {
        const customerExists = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId])

        if(customerExists.rows.length === 0) return res.sendStatus(400)

        const gameExists = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId])

        if(gameExists.rows.length === 0) return res.sendStatus(400)

        const numberGames = await db.query(`SELECT * FROM rentals WHERE "gameId" = $1 `, [gameId])

        const stockTotal = gameExists.rows[0].stockTotal

        const pricePerDay = gameExists.rows[0].pricePerDay

        const originalPrice = pricePerDay*daysRented

        if(numberGames.rows.length === stockTotal) return res.sendStatus(400)

        const newRent = await db.query(`
        INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,[customerId,gameId,today,daysRented,null,originalPrice,null])

        res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function finishRent(req, res) {

    const {id} = req.params

    const today = dayjs()

    try {
        const rent = await db.query(`SELECT * rentals WHERE id = $1`, [id])

        if (rent.rows.length === 0) return res.sendStatus(404)

        if(rent.rows[0].returnDate !== null) return res.sendStatus(400)

        const expireDate = dayjs(rent.rows[0].rentDate).add(rent.rows[0].daysRented,'day')

        let delayFee = 0

        const overDays = dayjs().diff(expireDate,'day')

        if(overDays > 0) delayFee = overDays * (rent.rows[0].originalPrice/rent.rows[0].daysRented)

        await db.query(`UPDATE rentals SET ("returnDate","delayFee") VALUE ($1,$2) WHERE id = $3`,[today,delayFee,id])

        res.sendStatus(200)

    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function deleteRent(req, res) {
    
    const {id} = req.params
    try {

        const rent = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id])

        if (rent.rows.length === 0) return res.sendStatus(404)

        if(rent.rows[0].returnDate === null) return res.sendStatus(400)

        await db.query(`DELETE FROM rentals WHERE id = $1`, [id])

        res.sendStatus(200)

    } catch (error) {
        res.status(500).send(error.message)
    }
}
