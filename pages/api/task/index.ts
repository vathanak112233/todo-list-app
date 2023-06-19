import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { verifyJwt } from '../../../lib/jwt';

export default async function handler(req, res) {
    const { method, headers } = req;
    const accessToken = headers.authorization;

    switch (method) {
        case 'GET':
            try {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return res.status(401).json({ error: 'unauthorized' });
                }
                const newTask = await prisma.task.findMany({
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                });
                return res.status(200).json(newTask);
            } catch (error) {
                return res.status(500).json(error);
            }

        case 'POST':
            try {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return res.status(401).json({ error: 'unauthorized' });
                }
                const newTask = await prisma.task.create({
                    data: req.body,
                });
                return res.status(200).json(newTask);
            } catch (error) {
                return res.status(500).json(error);
            }

        default:
            return res.status(405).json({ message: 'Method Not Allowed' });
    }

}