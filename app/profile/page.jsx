'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import Profile from '@/components/Profile'

const MyProfile = () => {
  const [posts, setPosts] = useState([])

  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await res.json()

      setPosts(data)
    }

    if (session?.user.id) fetchPosts()
  }, [])

  const handleEdit = () => {}

  const handleDelete = async () => {}

  return (
    <Profile
      name='My'
      desc='Welcome to your profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
