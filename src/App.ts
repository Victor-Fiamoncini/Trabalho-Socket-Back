import express, { Application } from 'express'
import { createServer, Server as HttpServer } from 'http'
import io, { Server as WsServer, Socket } from 'socket.io'
import cors from 'cors'
import morgan from 'morgan'
import { config } from 'dotenv'
import { resolve } from 'path'

import routes from './routes'

import { DTOMessage } from './types'

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
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(routes)
  }

  private socket(): void {
    this.io.on('connection', (client: Socket) => {
      client.emit(
        'connected',
        `REP: Você está conectado, seu ID é: ${client.id}`
      )

      client.on('newMessage', ({ name, content }: DTOMessage) => {
        client.broadcast.emit('broadcastMessage', { name, content })
      })

      client.on('newMessageRecall', () => {
        client.emit('singleMessage', 'REP: Mensagem recebida')
      })

      client.on('disconnect', () => {
        client.emit('disconnected', 'REP: Você foi desconectado')
      })
    })
  }
}
