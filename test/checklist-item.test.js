import {
    createTestChecklistItem,
    createTestChecklist,
    createTestUser, getTestChecklistItem, getTestChecklist,
    removeAllTestChecklistItems,
    removeAllTestChecklists,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";

describe('POST /api/checklists/:checklistId/checklistItems', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
    })

    afterEach(async () => {
        await removeAllTestChecklistItems();
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can create new checklistItem', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .post('/api/checklists/' + testChecklist.id + '/checklistItems')
            .set('Authorization', 'test')
            .send({
                itemName: "test",
                isDone: false
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.itemName).toBe('test');
        expect(result.body.data.isDone).toBe(false);
    });

    it('should reject if checklistItem request is invalid', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .post('/api/checklists/' + testChecklist.id + '/checklistItems')
            .set('Authorization', 'test')
            .send({
                itemName: "",
                isDone: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if checklist is not found', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .post('/api/checklists/' + (testChecklist.id + 1) + '/checklistItems')
            .set('Authorization', 'test')
            .send({
                itemName: "test",
                isDone: false
            });

        expect(result.status).toBe(404);
    });
});

describe('GET /api/checklists/:checklistId/checklistItems/:checklistItemId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
        await createTestChecklistItem();
    })

    afterEach(async () => {
        await removeAllTestChecklistItems();
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can get checklist', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .get('/api/checklists/' + testChecklist.id + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.itemName).toBe('test');
        expect(result.body.data.isDone).toBe(false);
    });

    it('should reject if checklist is not found', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .get('/api/checklists/' + (testChecklist.id + 1) + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });

    it('should reject if checklistItem is not found', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .get('/api/checklists/' + testChecklist.id + '/checklistItems/' + (testChecklistItem.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/checklists/:checklistId/checklistItems/:checklistItemId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
        await createTestChecklistItem();
    })

    afterEach(async () => {
        await removeAllTestChecklistItems();
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can update checklistItem', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .put('/api/checklists/' + testChecklist.id + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test')
            .send({
                itemName: "Membuat Todolist Endpoint",
                isDone: true
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testChecklistItem.id);
        expect(result.body.data.itemName).toBe('Membuat Todolist Endpoint');
        expect(result.body.data.isDone).toBe(true);
    });

    it('should reject if request is not valid', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .put('/api/checklists/' + testChecklist.id + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test')
            .send({
                itemName: "",
                isDone: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if checklistItem is not found', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .put('/api/checklists/' + testChecklist.id + '/checklistItems/' + (testChecklistItem.id + 1))
            .set('Authorization', 'test')
            .send({
                itemName: "Membuat Todolist Endpoint",
                isDone: true
            });

        expect(result.status).toBe(404);
    });

    it('should reject if checklist is not found', async () => {
        const testChecklist = await getTestChecklist();
        const testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .put('/api/checklists/' + (testChecklist.id + 1) + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test')
            .send({
                itemName: "Membuat Todolist Endpoint",
                isDone: true
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/checklists/:checklistId/checklistItems/:checklistItemId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
        await createTestChecklistItem();
    })

    afterEach(async () => {
        await removeAllTestChecklistItems();
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can remove checklistItem', async () => {
        const testChecklist = await getTestChecklist();
        let testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .delete('/api/checklists/' + testChecklist.id + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testChecklistItem = await getTestChecklistItem();
        expect(testChecklistItem).toBeNull();
    });

    it('should reject if checklistItem is not found', async () => {
        const testChecklist = await getTestChecklist();
        let testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .delete('/api/checklists/' + testChecklist.id + '/checklistItems/' + (testChecklistItem.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });

    it('should reject if checklist is not found', async () => {
        const testChecklist = await getTestChecklist();
        let testChecklistItem = await getTestChecklistItem();

        const result = await supertest(web)
            .delete('/api/checklists/' + (testChecklist.id + 1) + '/checklistItems/' + testChecklistItem.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/checklists/:checklistId/checklistItems', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
        await createTestChecklistItem();
    })

    afterEach(async () => {
        await removeAllTestChecklistItems();
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can list checklistItems', async function () {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .get('/api/checklists/' + testChecklist.id + "/checklistItems")
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });

    it('should reject if checklist is not found', async function () {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .get('/api/checklists/' + (testChecklist.id + 1) + "/checklistItems")
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});
