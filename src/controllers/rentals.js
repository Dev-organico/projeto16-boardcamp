import { db } from "../config/database.js"



export async function listRentals(req, res) {
    try {
        const rentals = await db.query(`
        SELECT *
        FROM rentals
        JOIN customers
            ON rentals.customerId = customers.id
        JOIN games
            ON rentals.gameId = games.id
        
        `)

        res.send(rentals.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function insertRent(req, res) {
    return ('oi')
}


export async function finishRent(req, res) {
    return ('oi')
}


export async function deleteRent(req, res) {
    return ('oi')
}
