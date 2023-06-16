import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            try {
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