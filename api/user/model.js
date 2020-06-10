import mongoose, { Schema } from 'mongoose'

const Event = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 30
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 50
    },
    startDate: Date,
    endDate: Date
  },
  { timestamps: false, versionKey: false }
)

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 15
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minlength: 2,
      maxlength: 15
    },
    email: { type: String, trim: true, unique: true, required: true },
    phoneNumber: { type: String, trim: true, unique: true, required: true },
    events: [Event]
  },
  {
    timestamps: false,
    versionKey: false
  }
)

userSchema.path('email').validate(function (email) {
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, `Invalid email format`)

const model = mongoose.model('User', userSchema)
export default model
