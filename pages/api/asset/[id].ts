import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const assetId = req.query.id
  const {
    type,
    manufacturer,
    modelnum,
    serialnum,
    controlsys,
    connection,
    partid,
    status,
    abrand,
  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const asset = await prisma.asset.delete({
            where: { id: Number(assetId) },
        })
        res.json(asset)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const asset = await prisma.asset.update({
        where: { id: Number(assetId) },
        data: {
          type,
          manufacturer,
          modelnum,
          serialnum,
          controlsys,
          connection,
          partid,
          status,
          abrand,
        }
      })
      res.status(200).json({ message: 'asset updated' })
    } 
    else {
        console.log("asset could not be modified")
        res.status(400).json({ message: "asset could not be modified" })
    }
}
