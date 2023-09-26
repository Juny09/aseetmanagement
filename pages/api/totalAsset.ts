// pages/api/totalAssetCount.js

import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Fetch the total count of assets
      const totalAssetCount = await prisma.asset.count();
      res.status(200).json({ totalAssetCount });
    } catch (error) {
      console.error('Error fetching total asset count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
