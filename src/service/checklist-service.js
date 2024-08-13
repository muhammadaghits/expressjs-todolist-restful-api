import {validate} from "../validation/validation.js";
import {
    createChecklistValidation,
    getChecklistValidation, searchChecklistValidation,
    updateChecklistValidation
} from "../validation/checklist-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const checklist = validate(createChecklistValidation, request);
    checklist.username = user.username;

    return prismaClient.checklist.create({
        data: checklist,
        select: {
            id: true,
            name: true
        }
    });
}

const get = async (user, checklistId) => {
    checklistId = validate(getChecklistValidation, checklistId);

    const checklist = await prismaClient.checklist.findFirst({
        where: {
            username: user.username,
            id: checklistId
        },
        select: {
            id: true,
            name: true
        }
    });

    if (!checklist) {
        throw new ResponseError(404, "checklist is not found");
    }

    return checklist;
}

const update = async (user, request) => {
    const checklist = validate(updateChecklistValidation, request);

    const totalChecklistInDatabase = await prismaClient.checklist.count({
        where: {
            username: user.username,
            id: checklist.id
        }
    });

    if (totalChecklistInDatabase !== 1) {
        throw new ResponseError(404, "checklist is not found");
    }

    return prismaClient.checklist.update({
        where: {
            id: checklist.id
        },
        data: {
            name: checklist.name
        },
        select: {
            id: true,
            name: true
        }
    })
}

const remove = async (user, checklistId) => {
    checklistId = validate(getChecklistValidation, checklistId);

    const totalInDatabase = await prismaClient.checklist.count({
        where: {
            username: user.username,
            id: checklistId
        }
    });

    if (totalInDatabase !== 1) {
        throw new ResponseError(404, "checklist is not found");
    }

    return prismaClient.checklist.delete({
        where: {
            id: checklistId
        }
    });
}

const search = async (user, request) => {
    request = validate(searchChecklistValidation, request);

    // 1 ((page - 1) * size) = 0
    // 2 ((page - 1) * size) = 10
    const skip = (request.page - 1) * request.size;

    const filters = [];

    filters.push({
        username: user.username
    })

    if (request.name) {
        filters.push({
            name: {
                contains: request.name
            }
        });
    }

    const checklists = await prismaClient.checklist.findMany({
        where: {
            AND: filters
        },
        take: request.size,
        skip: skip
    });

    const totalItems = await prismaClient.checklist.count({
        where: {
            AND: filters
        }
    });

    return {
        data: checklists,
        paging: {
            page: request.page,
            total_item: totalItems,
            total_page: Math.ceil(totalItems / request.size)
        }
    }
}

export default {
    create,
    get,
    update,
    remove,
    search
}
