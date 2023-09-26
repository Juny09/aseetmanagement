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
   } = req.body;

  try {
    // CREATE
    await prisma.meter.create({
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
      },
    });
    res.status(200).json({ message: 'meter created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
