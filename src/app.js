import express from "express";
import cors from "cors";
import gameRouter from "./routes/gameRoutes.js";
import customerRouter from "./routes/customersRoutes.js";
import rentalsRouter from "./routes/rentalsRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());


app.use([gameRouter,customerRouter,rentalsRouter])




const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
