import { Router } from 'express'
import { gameSchema } from '../schema/gameSchema.js'
import { validateSchema } from '../middlewares/validateSchema.js'
import { insertGames, listGames } from '../controllers/games.js'


const gameRouter = Router()

gameRouter.get("/games",listGames)
gameRouter.post("/games",validateSchema(gameSchema), insertGames)

export default gameRouter