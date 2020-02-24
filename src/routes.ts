import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) =>
  res.send('O servidor está vivo!!!')
)

export default Router
