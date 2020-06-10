import { Router } from 'express'
import {
  getAllUsers,
  createUser,
  createUserEvent,
  getSingleUser
} from './controller'

const router = new Router()

router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
router.post('/', createUser)
router.put('/:id', createUserEvent)
export default router
