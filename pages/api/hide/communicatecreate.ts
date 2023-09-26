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
    commid,
    protocol,
    medium,
    ip,
    baudrate,
    stopbit,
    parity,
  } = req.body;

  try {
    // CREATE
    await prisma.communi.create({
      data: {
        commid,
        protocol,
        medium,
        ip,
        baudrate,
        stopbit,
        parity,
      },
    });
    res.status(200).json({ message: 'Communication created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
