import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meterId = req.query.id
  const {

    metername,
    meterid,
    metertype,
    panel,
    manufacturer,
    model,
    serialnum,
    commissiondate,
    voltage,
    ratio,
    description,
  } = req.body
    // DELETE
    if (req.method === 'DELETE') {
        const meter = await prisma.meter.delete({
            where: { id: Number(meterId) },
        })
        res.json(meter)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const meter = await prisma.meter.update({
        where: { id: Number(meterId) },
        data: {
          metername,
          meterid,
          metertype,
          panel,
          manufacturer,
          model,
          serialnum,
          commissiondate,
          voltage,
          ratio,
          description,
        }
      })
      res.status(200).json({ message: 'meter updated' })
    } 
    else {
        console.log("meter could not be modified")
        res.status(400).json({ message: "meter could not be modified" })
    }
}
