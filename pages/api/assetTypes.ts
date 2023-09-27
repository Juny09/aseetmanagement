import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Query the database to get the count of unique asset types
      const assetTypes = await prisma.asset.findMany({
        distinct: ['type'], // This will return unique asset types
      });

      // Calculate the total count of unique asset types
      const totalAssetTypes = assetTypes.length;

      res.status(200).json({
        totalTypeCount: totalAssetTypes,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
