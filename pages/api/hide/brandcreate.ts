// import type { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '../../lib/prisma';

// type Data = {
//   message: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   const {name,bid} = req.body;

//   try {
//     // CREATE
//     await prisma.brand.create({
//       data: {
//         name,
//         bid,
//       },
//     });
//     res.status(200).json({ message: 'brand created' });
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json({ message: error.message });
//   }
// }
