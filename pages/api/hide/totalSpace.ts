// pages/api/totalSpaceCount.js

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Fetch the total count of Space
      const totalSpaceCount = await prisma.space.count();
      res.status(200).json({ totalSpaceCount });
    } catch (error) {
      console.error('Error fetching total Iot count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
