import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'O servidor está vivo!!!' })
})

export default router
