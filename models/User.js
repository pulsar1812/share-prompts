import { model, models, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new Schema(
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
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    throw err
  }
})

// Compare password method
UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (err) {
    throw err
  }
}

const User = models.User || model('User', UserSchema)
export default User
