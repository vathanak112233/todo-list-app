import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req;

    console.log(method);
    switch (method) {
        case 'GET':
            try {
                const newTask = await prisma.task.findMany();
                return res.status(200).json(newTask);
            } catch (error) {
                return res.status(500).json(error);
            }

        case 'POST':
            try {
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