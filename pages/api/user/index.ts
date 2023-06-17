import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import * as bcrypt from "bcrypt";

export default async function GET(req, res) {

    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, 10)
        }
    })
    return res.status(200).json(user);
}