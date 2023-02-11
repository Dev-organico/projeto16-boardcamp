import { db } from "../config/database.js"



export async function listCustomers(req, res) {
    try {
        const customers = await db.query(`SELECT * FROM customers`)

        res.send(customers.rows)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getCustomer(req, res) {
    const { id } = req.params
    try {
        const customer = await db.query(`SELECT * FROM customers WHERE id = $1`, [id])

        if (customer.rows.length === 0) return res.sendStatus(404)

        res.send(customer.rows[0])

    } catch (error) {
        res.status(500).send(error.message)
    }

}


export async function insertCustomer(req, res) {
    const {
        name,
        phone,
        cpf,
        birthday } = req.body

    try {

        const exist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf])

        if (exist.rows.length > 0) return res.sendStatus(409)

        const singleCustomer = await db.query(`INSERT INTO customers (name,phone,cpf,birthday) VALUES ($1,$2,$3,$4);`, [name, phone, cpf, birthday])

        console.log(singleCustomer)

        res.sendStatus(201)


    } catch (error) {
        res.status(500).send(error.message)
    }
}


export async function updateCustomer(req, res) {
    const {
        name,
        phone,
        cpf,
        birthday } = req.body

    const { id } = req.params

    try {

        const exist = await db.query(`SELECT * FROM customers WHERE cpf = $1 `, [cpf])

        if (exist.rows.length > 0) {
            if (exist.rows[0].id !== id) {
                return res.sendStatus(409)
            }
        }

        const updatedCustomer = await db.query(`UPDATE customers SET name = $1 ,phone = $2 ,birthday = $3 WHERE id = $4;`, [name, phone, birthday, id])

        console.log(updateCustomer)

        res.sendStatus(200)


    } catch (error) {
        res.status(500).send(error.message)
    }
}

