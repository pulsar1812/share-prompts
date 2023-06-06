import { model, models, Schema } from 'mongoose'

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Email is required'],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
      ],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

export default models.User || model('User', userSchema)