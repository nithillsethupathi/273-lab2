import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../client'

export default async function getShopByName(req: NextApiRequest, res: NextApiResponse){
            if(req.method !== 'GET'){
                res.status(500).json({message: 'get request expected'});
            }
            const shopName = await prisma.shop.findUnique({
                where: {
                    name: String(req.query.name)
                }
            });
            res.json(shopName)
}