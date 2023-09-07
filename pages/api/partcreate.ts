import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, idp, quantity, description } = req.body;

  try {
    // CREATE
    await prisma.part.create({
      data: {
        name,
        idp,
        quantity,
        description,
      },
    });
    res.status(200).json({ message: 'part created' });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}
