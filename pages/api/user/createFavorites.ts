import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'

export default async function createFavorites(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        res.status(500).json({message: 'Post request expected'});
    }
    const shopFav = JSON.parse(JSON.stringify(req.body));
    const shop = await prisma.favorites.create({
        data: shopFav
    })
    
    return res.status(200).json(shop);
}