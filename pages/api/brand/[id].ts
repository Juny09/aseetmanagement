import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const brandId = req.query.id
  const {
    id,
    name,
    bid,

  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const brand = await prisma.brand.delete({
            where: { id: Number(brandId) },
        })
        res.json(brand)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const brand = await prisma.brand.update({
        where: { id: Number(brandId) },
        data: {
          id,
          name,
          bid,
        }
      })
      res.status(200).json({ message: 'brand updated' })
    } 
    else {
        console.log("brand could not be modified")
        res.status(400).json({ message: "brand could not be modified" })
    }
}
