import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'
import { getSession } from "next-auth/react"

  
export default async function getFavorites(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
            if (req.method !== 'GET') {
                res.status(500).json({ message: 'get request expected' });
            }
            const fav = await prisma.favorites.findMany({
                where: {
                    email: String(req.query.email)
                }
            });
            res.json(fav)
            res.end()
        }