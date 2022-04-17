import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'
import { getMaxListeners } from "process";

export default async function deleteCart(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'DELETE'){
        res.status(500).json({message: 'DELETE request expected'});
    }
    const shopFav = req.body.id
    const shop = await prisma.cart.delete({
        where: {
            id: String(shopFav)
        }
    })
    
    return res.status(200).json(shop);
}