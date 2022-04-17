import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../client'

export default async function getAllItems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(500).json({ message: 'get request expected' })
  }
  const fav = await prisma.store.findMany()
    res.json(fav)
    res.end()
  }