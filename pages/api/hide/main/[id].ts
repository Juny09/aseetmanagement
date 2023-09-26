import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mainId = req.query.id
  const {

  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const main = await prisma.main.delete({
            where: { id: Number(mainId) },
        })
        res.json(main)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const main = await prisma.main.update({
        where: { id: Number(mainId) },
        data: {
          assetId,
          iotId,
          spaceId,
          statusId,
        }
      })
      res.status(200).json({ message: 'main updated' })
    } 
    else {
        console.log("main could not be modified")
        res.status(400).json({ message: "main could not be modified" })
    }
}
