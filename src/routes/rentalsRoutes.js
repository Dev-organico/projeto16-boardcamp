import { Router } from "express";
import { deleteRent, finishRent, insertRent, listRentals } from "../controllers/rentals.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { rentalsSchema } from "../schema/rentalsSchema.js";

const rentalsRouter = Router()

rentalsRouter.get("/rentals",listRentals)
rentalsRouter.post("/rentals",validateSchema(rentalsSchema),insertRent)
rentalsRouter.post("/rentals/:id/return",finishRent)
rentalsRouter.delete("/rentals/:id",deleteRent)

export default rentalsRouter;