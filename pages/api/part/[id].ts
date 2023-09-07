import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const partId = req.query.id
  const {name, idp, quantity, description, id} = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const part = await prisma.part.delete({
            where: { id: Number(partId) }
        })
        res.json(part)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const part = await prisma.part.update({
        where: { id: Number(partId) },
        data: {
          name,
          idp, 
          quantity, 
          description
        }
      })
      res.status(200).json({ message: 'part updated' })
    } 
    else {
        console.log("part could not be modified")
        res.status(400).json({ message: "part could not be modified" })
    }
}
