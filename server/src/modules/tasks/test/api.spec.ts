import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../../app";

chai.use(chaiHttp);

const expect = chai.expect;

describe('Task API', () => {
    describe('GET /tasks', () => {
        it('should return all tasks', async () => {
            const res = await chai.request(app).get('/tasks');
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
        });
    });

    describe('POST /tasks', () => {
        it('should create a new task', async () => {
            const taskName = 'Test Task';
            const res = await chai.request(app)
                .post('/tasks')
                .send({ name: taskName });
            expect(res).to.have.status(201);
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.equal(taskName);
        });
    });

   
});
