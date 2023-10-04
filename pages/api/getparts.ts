// pages/api/parts.js
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const parts = await prisma.part.findMany();
      res.status(200).json(parts);
    } catch (error) {
      console.error('Error fetching parts data:', error);
      res.status(500).json({ error: 'Error fetching parts data' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


