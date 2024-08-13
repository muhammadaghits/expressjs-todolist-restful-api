import {
    createManyTestChecklists,
    createTestChecklist,
    createTestUser,
    getTestChecklist,
    removeAllTestChecklists,
    removeTestUser
} from "./test-util.js";
import supertest from "supertest";
import {web} from "../src/application/web.js";
import {logger} from "../src/application/logging.js";

describe('POST /api/checklists', function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can create new checklist', async () => {
        const result = await supertest(web)
            .post("/api/checklists")
            .set('Authorization', 'test')
            .send({
                name: "test"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBeDefined();
        expect(result.body.data.name).toBe("test");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post("/api/checklists")
            .set('Authorization', 'test')
            .send({
                name: ""
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/checklists/:checklistId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
    })

    afterEach(async () => {
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can get checklist', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .get("/api/checklists/" + testChecklist.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testChecklist.id);
        expect(result.body.data.name).toBe(testChecklist.name);
    });

    it('should return 404 if checklist id is not found', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .get("/api/checklists/" + (testChecklist.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('PUT /api/checklists/:checklistId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
    })

    afterEach(async () => {
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can update existing checklist', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .put('/api/checklists/' + testChecklist.id)
            .set('Authorization', 'test')
            .send({
                name: "Membuat Todolist API"
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testChecklist.id);
        expect(result.body.data.name).toBe("Membuat Todolist API");
    });

    it('should reject if request is invalid', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .put('/api/checklists/' + testChecklist.id)
            .set('Authorization', 'test')
            .send({
                name: ""
            });

        expect(result.status).toBe(400);
    });

    it('should reject if checklist is not found', async () => {
        const testChecklist = await getTestChecklist();

        const result = await supertest(web)
            .put('/api/checklists/' + (testChecklist.id + 1))
            .set('Authorization', 'test')
            .send({
                name: "Membuat Todolist API"
            });

        expect(result.status).toBe(404);
    });
});

describe('DELETE /api/checklists/:checklistId', function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestChecklist();
    })

    afterEach(async () => {
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can delete checklist', async () => {
        let testChecklist = await getTestChecklist();
        const result = await supertest(web)
            .delete('/api/checklists/' + testChecklist.id)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testChecklist = await getTestChecklist();
        expect(testChecklist).toBeNull();
    });

    it('should reject if checklist is not found', async () => {
        let testChecklist = await getTestChecklist();
        const result = await supertest(web)
            .delete('/api/checklists/' + (testChecklist.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe('GET /api/checklists', function () {
    beforeEach(async () => {
        await createTestUser();
        await createManyTestChecklists();
    })

    afterEach(async () => {
        await removeAllTestChecklists();
        await removeTestUser();
    })

    it('should can search without parameter', async () => {
        const result = await supertest(web)
            .get('/api/checklists')
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(10);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search to page 2', async () => {
        const result = await supertest(web)
            .get('/api/checklists')
            .query({
                page: 2
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(5);
        expect(result.body.paging.page).toBe(2);
        expect(result.body.paging.total_page).toBe(2);
        expect(result.body.paging.total_item).toBe(15);
    });

    it('should can search using name', async () => {
        const result = await supertest(web)
            .get('/api/checklists')
            .query({
                name: "test 1"
            })
            .set('Authorization', 'test');

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(6);
        expect(result.body.paging.page).toBe(1);
        expect(result.body.paging.total_page).toBe(1);
        expect(result.body.paging.total_item).toBe(6);
    });
});
