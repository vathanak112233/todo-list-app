import { PrismaClient } from '@prisma/client'
import { verifyJwt } from '../../../lib/jwt';
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method, query, headers } = req;
    const accessToken = headers.authorization;

    switch (method) {
        case 'GET':
            try {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return res.status(401).json({ error: 'unauthorized' });
                }
                const getTask = await prisma.task.findUnique({
                    where: {
                        id: +query.id
                    }
                })
                res.status(200).json(getTask)
            } catch (error) {
                res.status(500).json({ message: error.message })
            }
        case 'PUT':
            try {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return res.status(401).json({ error: 'unauthorized' });
                }
                const updatedTask = await prisma.task.update({
                    where: { id: +query.id },
                    data: req.body,
                });
                return res.status(200).json(updatedTask);
            } catch (error) {
                return res.status(500).json(error);
            }

        case 'DELETE':
            try {
                if (!accessToken || !verifyJwt(accessToken)) {
                    return res.status(401).json({ error: 'unauthorized' });
                }
                const deletedTask = await prisma.task.delete({
                    where: { id: +query.id },
                });
                return res.status(200).json(deletedTask);
            } catch (error) {
                return res.status(500).json(error);
            }
        default:
            return res.status(405).json({ message: 'Method Not Allowed' });

    }
}