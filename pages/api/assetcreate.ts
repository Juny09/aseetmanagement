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
    type,
    manufacturer,
    modelnum,
    serialnum,
    controlsys,
    connection,
    partid,
    status,
    abrand,
   } = req.body;

  try {
    // CREATE
    await prisma.asset.create({
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
      },
    });
    res.status(200).json({ message: 'asset created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
