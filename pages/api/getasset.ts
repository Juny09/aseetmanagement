// pages/api/parts.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handlers(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if (req.method === 'GET') {
      try {
        const assets = await prisma.asset.findMany();
        res.status(200).json(assets);
      } catch (error) {
        console.error('Error fetching assets data:', error);
        res.status(500).json({ error: 'Error fetching assets data' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }
  