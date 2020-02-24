import express, { Application } from 'express'
import { createServer, Server as HttpServer } from 'http'
import io, { Server as WsServer, Socket } from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import { resolve } from 'path'

import routes from './routes'
import { Message } from './types'

/**
 * App
 */
export default class App {
  public app: Application
  public io: WsServer
  public http: HttpServer

  public constructor() {
    config({ path: resolve(__dirname, '..', '.env') })

    this.app = express()
    this.http = createServer(this.app)
    this.io = io(this.http)

    this.middlewares()
    this.socket()
  }

  private middlewares(): void {
    const { CLIENT_HOST } = process.env

    this.app.use(
      cors({
        credentials: true,
        origin: CLIENT_HOST || 'http://localhost:3000',
      })
    )
    this.app.use(morgan('dev'))
    this.app.use(routes)
  }

  private socket(): void {
    this.io.on('connection', (client: Socket) => {
      console.log('O cliente connectou')

      client.on('connected', (message: string) => {
        console.log(message)
      })

      client.on('message', ({ name, content }: Message) => {
        console.log(name, content)

        client.broadcast.emit('message', { name, content })
      })

      client.on('disconnect', () => console.log('O cliente desconectou'))
    })
  }
}
