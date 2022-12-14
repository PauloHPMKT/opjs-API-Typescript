import express from 'express';
import path from 'node:path';
import http  from 'node:http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { router } from './router';

const app = express();
const server = http.createServer(app)
export const io = new Server(server)


//mongo db conection - stabelishing connection api when database is up
mongoose.connect('mongodb://localhost:27017/db-opjs')
	.then(() => {

		io.on('connect', () => {
			console.log('Conectado');
		})
		//habilitando cors
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*')
			res.setHeader('Access-Control-Allow-Methods', '*')
			res.setHeader('Access-Control-Allow-Headers', '*')

			next()
		})
		app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))
		app.use(express.json())
		app.use(router);

		const PORT = 3008

		server.listen(PORT, () => {
			console.log(`Server is running on port http://localhost:${PORT}`)
		})
	})
	.catch(() => console.log('error conection'))
