import express from 'express'

// contollers for basic route:
import controller from '@controllers/playground/index'

const router = express.Router() // creating router

/// setting up further route for basic route
router.get('/:id', controller.getPlayground)

router.post('/', controller.createPlayground)

export default router
