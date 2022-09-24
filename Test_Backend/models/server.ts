import express, { Application } from "express";
import cors from "cors";
import routes from "../routes/routes";
import morgan from "morgan";
import mongoose from "mongoose";
import { config } from '../db/config'
class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        persons: '/api/persons'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        this.dbConnection();
        this.middlewares();
        this.routes();

    }
    async dbConnection() {
        try {
            await mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' }).then(() => { console.log('conected to mongodb') }).catch((error) => console.log(error))
        } catch (error: any) {
            throw new Error(error);
        }
    }
    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //MORGAN
        this.app.use(morgan('dev'));
        //Carpeta publica
        this.app.use(express.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.persons, routes.personRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('SERVIDOR EN LINEA PUERTO: ' + this.port);
        });
    }
}

export default Server;