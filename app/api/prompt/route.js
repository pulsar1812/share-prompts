import { connectToDB } from '@/utils/database'
import Prompt from '@/models/Prompt'

export const GET = async (req, res) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    console.log(prompts[0]._id.populate('creator'))

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err) {
    return new Response('Failed to fetch all prompts', { status: 500 })
  }
}
