import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'

export default async function createOrderNumber(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'POST'){
        res.status(500).json({message: 'Post request expected'});
    }
    const shop = await prisma.orderNumber.create({})
    return res.status(200).json(shop);
}