import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../client'
import { getSession } from 'next-auth/react'

export default async function getItem(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'get request expected' })
  }
  const fav = await prisma.store.findMany({
    where: {
        email: String(session?.user?.email),
      },
    })
    res.json(fav)
    res.end()
  }