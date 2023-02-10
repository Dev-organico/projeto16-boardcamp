import { Router } from 'express'
import { getCustomer, insertCustomer, listCustomers, updateCustomer } from '../controllers/customers.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { customersSchema } from '../schema/customersSchema.js'

const customerRouter = Router()

customerRouter.get("/customers",listCustomers)
customerRouter.get("/customers/:id",getCustomer)
customerRouter.post("/customers",validateSchema(customersSchema),insertCustomer)
customerRouter.put("/customers/:id",validateSchema(customersSchema),updateCustomer)

export default customerRouter;
