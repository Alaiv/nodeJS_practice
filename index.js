import App from './src/App.js'
import userRouter from "./src/user-router.js";
import toJson from "./src/middlewares/toJson.js";
import bodyParse from "./src/middlewares/bodyParse.js";
import urlParser from "./src/middlewares/urlParser.js";
import mongoose from 'mongoose';

const PORT = 5000;
const DB = 'mongodb+srv://user:user@cluster0.p1b1c6p.mongodb.net/?retryWrites=true&w=majority';


const app = new App()

app.use(toJson);
app.use(bodyParse)
app.use(urlParser('http://localhost:5000'));
app.addRouter(userRouter);

const start = async () => {
    try {
        await mongoose.connect(DB);
        app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();