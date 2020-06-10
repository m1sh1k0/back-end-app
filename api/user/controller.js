import mongoose from 'mongoose'
import User from './model'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.aggregate([
      {
        $addFields: {
          nextEventDate: { $min: '$events.startDate' },
          eventsCount: { $size: '$events' }
        }
      }
    ])
    return res.status(200).json(users)
  } catch (err) {
    return next(err)
  }
}
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(req.params.id) }
      },
      {
        $addFields: {
          nextEventDate: { $min: '$events.startDate' },
          eventsCount: { $size: '$events' }
        }
      }
    ])
    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}

export const createUser = async (req, res, next) => {
  const { body } = req

  try {
    const user = await User.create(body)
    return res.status(201).json(user)
  } catch (err) {
    return next(err)
  }
}

export const createUserEvent = async (req, res, next) => {
  const { body } = req
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: { events: body }
      },
      { new: true }
    )
    return res.status(200).json(user)
  } catch (err) {
    return next(err)
  }
}
