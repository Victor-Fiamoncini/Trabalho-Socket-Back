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
      console.log(`REP: Você está conectado, seu ID é: ${client.id}`)

      client.emit(
        'connected',
        `REP: Você está conectado, seu ID é: ${client.id}`
      )

      client.on('newMessage', ({ name, content }: DTOMessage) => {
        const delay = this.getRandomNumber(1000, 10000)

        setTimeout(() => {
          console.log(`Delay de resposta de ${delay}`)

          client.broadcast.emit('broadcastMessage', { name, content })
          client.emit(
            'singleMessage',
            `REP: Mensagem recebida, delay de ${delay}`
          )
        }, delay)
      })

      client.on('disconnect', () => console.log('REP: Você foi desconectado'))
    })
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
}
