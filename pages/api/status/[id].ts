import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const statusId = req.query.id
  const {
    id,
    mstatus, 
    category, 
    from, 
    to, 
    performby, 
    attach, 
    estimateddate,
    warrantyinfo, 
    comment,
    partId,
  } = req.body

    // Check if the partId exists in the Part table
    const existingPart = await prisma.part.findUnique({
      where: { id: partId },
    });

    if (!existingPart) {
      // If the Part does not exist, return an error response
      return res.status(404).json({ message: 'Part not found' });
    }
    
    // DELETE
    if (req.method === 'DELETE') {
        const status = await prisma.status.delete({
            where: { id: Number(statusId) },
        })
        res.json(status)
    } 
    // UPDATE
    else if (req.method === 'PUT') {
      const status = await prisma.status.update({
        where: { id: Number(statusId) },
        data: {
          mstatus, 
          category, 
          from, 
          to, 
          performby, 
          attach, 
          estimateddate,
          warrantyinfo, 
          comment,
          partId,
        }
      })
      res.status(200).json({ message: 'status updated' })
    } 
    else {
        console.log("status could not be modified")
        res.status(400).json({ message: "status could not be modified" })
    }
}
