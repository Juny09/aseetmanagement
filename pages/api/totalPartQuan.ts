// pages/api/combinedApi.js

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Fetch all parts
      const parts = await prisma.part.findMany();
      
      // Calculate the total quantity of parts
      const totalPartQuantity = parts.reduce((total, part) => total + parseInt(part.quantity), 0);

      res.status(200).json({ totalPartQuantity });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
