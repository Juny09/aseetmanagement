import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { 
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
   } = req.body;

  try {
    // CREATE
    await prisma.space.create({
      data: {
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
      },
    });
    res.status(200).json({ message: 'Space created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
