import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const communiId = req.query.id
  const {
    commid,
    protocol,
    medium,
    ip,
    baudrate,
    stopbit,
    parity,
  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const communi = await prisma.communi.delete({
            where: { id: Number(communiId) },
        })
        res.json(communi)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const communi = await prisma.communi.update({
        where: { id: Number(communiId) },
        data: {
          commid,
          protocol,
          medium,
          ip,
          baudrate,
          stopbit,
          parity,
        }
      })
      res.status(200).json({ message: 'communi updated' })
    } 
    else {
        console.log("communi could not be modified")
        res.status(400).json({ message: "communi could not be modified" })
    }
}
