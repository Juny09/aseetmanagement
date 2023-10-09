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
    subtype,
    manufacturer,
    modelnum,
    serialnum,
    controlsys,
    connection,
    selectedPartIds,
    partid,
    status,
    abrand,
   } = req.body;

  try {
    const selectedParts = await prisma.part.findMany({
      where: {
        idp: {
          in: selectedPartIds,
        },
      },
    });
    // CREATE
    await prisma.asset.create({
      data: {
        type,
        subtype,
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
