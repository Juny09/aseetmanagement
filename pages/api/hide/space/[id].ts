import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const spaceId = req.query.id
  const {
    lid,
    country,
    state,
    area,
    building,
    floor,
    zone,
    dimensions,
    areasq,
    occupancy,
    spacetype,
    purposeusage,
  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const space = await prisma.space.delete({
            where: { id: Number(spaceId) },
        })
        res.json(space)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const space = await prisma.space.update({
        where: { id: Number(spaceId) },
        data: {
          lid,
          country,
          state,
          area,
          building,
          floor,
          zone,
          dimensions,
          areasq,
          occupancy,
          spacetype,
          purposeusage
          
        }
      })
      res.status(200).json({ message: 'space updated' })
    } 
    else {
        console.log("space could not be modified")
        res.status(400).json({ message: "space could not be modified" })
    }
}
