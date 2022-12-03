import express from 'express'
import playgroundRouter from '@routes/playground'

const router = express.Router()

router.use('/playground', playgroundRouter)

export default router
