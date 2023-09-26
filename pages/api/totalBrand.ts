// // pages/api/totalAssetCount.js

// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '../../lib/prisma';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === 'GET') {
//     try {
//       // Fetch the total count of assets
//       const totalBrandCount = await prisma.brand.count();
//       res.status(200).json({ totalBrandCount });
//     } catch (error) {
//       console.error('Error fetching total brand count:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
