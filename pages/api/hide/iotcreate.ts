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
    devname,
    devid,
    devtype,
    deveui,
    brandId,
    meterId,
    communiId,
  } = req.body;

  try {
    // CREATE
    await prisma.iot.create({
      data: {
        devname,
        devid,
        devtype,
        deveui,
        brandId,
        meterId,
        communiId,
      },
    });
    res.status(200).json({ message: 'iot created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
