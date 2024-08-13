import {prismaClient} from "../application/database.js";
import {validate} from "../validation/validation.js";
import {getChecklistValidation} from "../validation/checklist-validation.js";
import {ResponseError} from "../error/response-error.js";
import {
    createChecklistItemValidation,
    getChecklistItemValidation,
    updateChecklistItemValidation
} from "../validation/checklist-item-validation.js";

const checkChecklistMustExists = async (user, checklistId) => {
    checklistId = validate(getChecklistValidation, checklistId);

    const totalChecklistInDatabase = await prismaClient.checklist.count({
        where: {
            username: user.username,
            id: checklistId
        }
    });

    if (totalChecklistInDatabase !== 1) {
        throw new ResponseError(404, "checklist is not found");
    }

    return checklistId;
}

const create = async (user, checklistId, request) => {
    checklistId = await checkChecklistMustExists(user, checklistId);

    const checklistItem = validate(createChecklistItemValidation, request);
    checklistItem.checklist_id = checklistId;

    return prismaClient.checklistItem.create({
        data: checklistItem,
        select: {
            id: true,
            itemName: true,
            isDone: true
        }
    })
}

const get = async (user, checklistId, checklistItemId) => {
    checklistId = await checkChecklistMustExists(user, checklistId);
    checklistItemId = validate(getChecklistItemValidation, checklistItemId);

    const checklistItem = await prismaClient.checklistItem.findFirst({
        where: {
            checklist_id: checklistId,
            id: checklistItemId
        },
        select: {
            id: true,
            itemName: true,
            isDone: true
        }
    });

    if (!checklistItem) {
        throw new ResponseError(404, "checklistItem is not found");
    }

    return checklistItem;
}

const update = async (user, checklistId, request) => {
    checklistId = await checkChecklistMustExists(user, checklistId);
    const checklistItem = validate(updateChecklistItemValidation, request);

    const totalChecklistItemInDatabase = await prismaClient.checklistItem.count({
        where: {
            checklist_id: checklistId,
            id: checklistItem.id
        }
    });

    if (totalChecklistItemInDatabase !== 1) {
        throw new ResponseError(404, "checklistItem is not found");
    }

    return prismaClient.checklistItem.update({
        where: {
            id: checklistItem.id
        },
        data: {
            itemName: checklistItem.itemName,
            isDone: checklistItem.isDone
        },
        select: {
            id: true,
            itemName: true,
            isDone: true
        }
    })
}

const remove = async (user, checklistId, checklistItemId) => {
    checklistId = await checkChecklistMustExists(user, checklistId);
    checklistItemId = validate(getChecklistItemValidation, checklistItemId);

    const totalChecklistItemInDatabase = await prismaClient.checklistItem.count({
        where: {
            checklist_id: checklistId,
            id: checklistItemId
        }
    });

    if (totalChecklistItemInDatabase !== 1) {
        throw new ResponseError(404, "checklistItem is not found");
    }

    return prismaClient.checklistItem.delete({
        where: {
            id: checklistItemId
        }
    });
}

const list = async (user, checklistId) => {
    checklistId = await checkChecklistMustExists(user, checklistId);

    return prismaClient.checklistItem.findMany({
        where: {
            checklist_id: checklistId
        },
        select: {
            id: true,
            itemName: true,
            isDone: true
        }
    })
}

export default {
    create,
    get,
    update,
    remove,
    list
}
