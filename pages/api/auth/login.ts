import * as bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function POST(req, res) {
    const user = await prisma.user.findFirst({
        where: {
            username: req.body.username,
        },
    });

    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        const { password, ...userWithoutPass } = user;
        const result = {
            ...userWithoutPass
        };
        return res.status(200).json(result);
    } else return res.status(200).json(null);
}