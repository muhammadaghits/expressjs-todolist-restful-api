import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "test",
            name: "test",
            email: 'test@example.com',
            password: await bcrypt.hash("rahasia", 10),
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    });
}

export const removeAllTestChecklists = async () => {
    await prismaClient.checklist.deleteMany({
        where: {
            username: 'test'
        }
    });
}

export const createTestChecklist = async () => {
    await prismaClient.checklist.create({
        data: {
            username: "test",
            name: "test"
        }
    });
}

export const createManyTestChecklists = async () => {
    for (let i = 0; i < 15; i++) {
        await prismaClient.checklist.create({
            data: {
                username: `test`,
                name: `test ${i}`
            }
        })
    }
}

export const getTestChecklist = async () => {
    return prismaClient.checklist.findFirst({
        where: {
            username: 'test'
        }
    })
}

export const removeAllTestChecklistItems = async () => {
    await prismaClient.checklistItem.deleteMany({
        where: {
            checklist: {
                username: "test"
            }
        }
    });
}

export const createTestChecklistItem = async () => {
    const checklist = await getTestChecklist();
    await prismaClient.checklistItem.create({
        data: {
            checklist_id: checklist.id,
            itemName: "test",
            isDone: false
        }
    })
}

export const getTestChecklistItem = async () => {
    return prismaClient.checklistItem.findFirst({
        where: {
            checklist: {
                username: "test"
            }
        }
    })
}
