import { db } from "../config/database.js"
import dayjs from "dayjs"


export async function listRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT *
        FROM rentals
        JSON_BUILD_OBJECT('id',customers.id,'name',customers.name) AS customer,
        JSON_BUILD_OBJECT('id',games.id,'name',games.name) AS game,
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

        const stockTotal = await db.query(`SELECT games."stockTotal" FROM games WHERE id = $1` , [gameId])

        const pricePerDay = await db.query(`SELECT games."pricePerDay" FROM games WHERE id = $1` , [gameId])

        const originalPrice = pricePerDay.rows[0]*daysRented

        if(numberGames.rows[0] > stockTotal.rows[0]) return res.sendStatus(400)

        const newRent = await db.query(`
        INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7)`,[customerId,gameId,today,daysRented,null,originalPrice,null])

        console.log(newRent)




    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function finishRent(req, res) {
    return ('oi')
}


export async function deleteRent(req, res) {
    return ('oi')
}
