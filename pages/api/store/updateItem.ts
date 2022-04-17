import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'

export default async function createItem(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== 'PUT'){
        res.status(500).json({message: 'Post request expected'});
    }
    const shop = await prisma.store.update({
        where: {
            productId: req.body.productId,
        },
        data: {
            title: req.body.title,
            email: req.body.email,
            image: req.body.image,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description

        }
    })
    
    return res.status(200).json(shop);
}