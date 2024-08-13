import checklistService from "../service/checklist-service.js";

const create = async (req, res, next) => {
    try {
        const user = req.user;
        const request = req.body;
        const result = await checklistService.create(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;
        const result = await checklistService.get(user, checklistId);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;
        const request = req.body;
        request.id = checklistId;

        const result = await checklistService.update(user, request);
        res.status(200).json({
            data: result
        })
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const user = req.user;
        const checklistId = req.params.checklistId;

        await checklistService.remove(user, checklistId);
        res.status(200).json({
            data: "OK"
        })
    } catch (e) {
        next(e);
    }
}

const search = async (req, res, next) => {
    try {
        const user = req.user;
        const request = {
            name: req.query.name,
            page: req.query.page,
            size: req.query.size
        };

        const result = await checklistService.search(user, request);
        res.status(200).json({
            data: result.data,
            paging: result.paging
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
    search
}
