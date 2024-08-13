import checklistItemService from "../service/checklist-item-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const checklistId = req.params.checklistId;

        const result = await checklistItemService.create(user, checklistId, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;
        const checklistItemId = req.params.checklistItemId;

        const result = await checklistItemService.get(user, checklistId, checklistItemId);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;
        const checklistItemId = req.params.checklistItemId;
        const request = req.body;
        request.id = checklistItemId;

        const result = await checklistItemService.update(user, checklistId, request);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;
        const checklistItemId = req.params.checklistItemId;

        const result = await checklistItemService.remove(user, checklistId, checklistItemId);

        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;

        const result = await checklistItemService.list(user, checklistId);

        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    get,
    update,
    remove,
    list
}
