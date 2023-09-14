import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const iotId = req.query.id
  const {
    devname,
    devid,
    devtype,
    deveui,
    brandId,
  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const iot = await prisma.iot.delete({
            where: { id: Number(iotId) },
        })
        res.json(iot)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const iot = await prisma.iot.update({
        where: { id: Number(iotId) },
        data: {
          devname,
          devid,
          devtype,
          deveui,
          brandId,
        }
      })
      res.status(200).json({ message: 'iot updated' })
    } 
    else {
        console.log("iot could not be modified")
        res.status(400).json({ message: "iot could not be modified" })
    }
}
