import app from "../../../app";
import chai from "chai";
import chaiHttp from "chai-http";
const { expect } = chai;


chai.use(chaiHttp);

describe('Task API', () => {
  let taskId: string;


  it('should create a new task', async () => {
    const taskData = { taskName: 'Test Task' };

    const res = await chai.request(app)
      .post('/api/tasks')
      .send(taskData);

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('name').equal(taskData.taskName);


it('should get all tasks', async () => {
  const res = await chai.request(app)
    .get('/api/tasks');

  expect(res).to.have.status(200);
  expect(res.body).to.be.an('array');

});
    taskId = res.body._id;
  });


  it('should get a single task by ID', async () => {
    const res = await chai.request(app)
      .get(`/api/tasks/${taskId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('name');
  });


  it('should update a task', async () => {
    const updatedTaskData = { taskName: 'Updated Task', completed: true };

    const res = await chai.request(app)
      .put(`/api/tasks/${taskId}`)
      .send(updatedTaskData);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('name').equal(updatedTaskData.taskName);
    expect(res.body).to.have.property('completed').equal(updatedTaskData.completed);
  });


  it('should delete a task', async () => {
    const res = await chai.request(app)
      .delete(`/api/tasks/${taskId}`);

    expect(res).to.have.status(200);
    expect(res.body).to.have.property('message').equal('Task deleted successfully');
  });


  it('should get all tasks', async () => {
    const res = await chai.request(app)
      .get('/api/tasks');

    expect(res).to.have.status(200);
    expect(res.body).to.be.an('array');

  });
});
