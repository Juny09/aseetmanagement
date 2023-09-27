// pages/api/combinedApi.js

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

      // Query the database to get the count of unique asset types
      const assetTypes = await prisma.asset.findMany({
        distinct: ['type'], // This will return unique asset types
      });

      // Calculate the total count of unique asset types
      const totalAssetTypes = assetTypes.length;

      // Query the database to get the count of unique asset brands
      const assetBrand = await prisma.asset.findMany({
        distinct: ['abrand'], // This will return unique asset brands
      });

      // Calculate the total count of unique asset brands
      const totalBrandCount = assetBrand.length;

      // Query the database to get the count of unique asset parts
      const assetPart = await prisma.part.findMany({
        distinct: ['id'], // This will return unique asset parts
      });

      // Calculate the total count of unique asset parts
      const totalPartCount = assetPart.length;

      // Query the database to get the count of assets with a specific status (change 'status' to your actual field name)
      const assetStatusCount = await prisma.asset.count({
        where: {
          status: 'In Service', // Change to the specific status you want to count
        },
      });

      res.status(200).json({
        totalAssetCount,
        totalAssetTypes,
        totalBrandCount,
        totalPartCount,
        assetStatusCount,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
