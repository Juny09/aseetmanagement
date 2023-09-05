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
    ename,
    ide,
    type,
    subtype,
    manufacturer,
    modelnum,
    serialnum,
    datepurc,
    install,
    controlsys,
    commission,
    datasheet,
    connection,
    foundation,
    mechanical,
    electrical,
    ratedeffiency,
    deviceassociation,
    generalnote,
   } = req.body;

  try {
    // CREATE
    await prisma.asset.create({
      data: {
        ename,
        ide,
        type,
        subtype,
        manufacturer,
        modelnum,
        serialnum,
        datepurc,
        install,
        controlsys,
        commission,
        datasheet,
        connection,
        foundation,
        mechanical,
        electrical,
        ratedeffiency,
        deviceassociation,
        generalnote,
      },
    });
    res.status(200).json({ message: 'asset created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
