const supertest = require('supertest');
const app = require('./app'); // Adjust the path to your Express app

let token;

// Trying to get Todos without sending JWT token in the header
describe('Get Todos without token', () => {
  it('should not allow fetching todos without a token', async () => {
    const response = await supertest(app).get('/todos');
    expect(response.statusCode).toBe(401);
  });
});


// Test for logging in with a valid account
it('should log in and return a JWT token', async () => {
    const validCredentials = {
      email: 'any',
      password: 'any'
    };
    const response = await supertest(app)
      .post('/users/login')
      .send(validCredentials);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.token).toBeDefined();
    token = response.body.data.token;
  });


  // Test for fetching all user's todo's with token
    it('should fetch all todos for the logged-in user', async () => {
      const response = await supertest(app)
        .get('/todos')
        .set('Authorization', `Bearer ${token}`);

        console.log(response.body);
  
      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data.data).toBeDefined();
      expect(Array.isArray(response.body.data.data.result)).toBe(true);
    });


// Using the token to add a new Todo item and then delete it

let newTodoId;

describe('Add and Delete Todo with token', () => {
  it('should add a new Todo for the logged-in user', async () => {
    const newTodoData = {
      name: "Test Todo",
      description: "This is a test todo item",
      CategoryId: 1,
    };
    const addResponse = await supertest(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send(newTodoData);
    expect(addResponse.statusCode).toBe(200);
    expect(addResponse.body.status).toBe('success');
    expect(addResponse.body.data).toHaveProperty('todo');
    expect(addResponse.body.data.todo).toHaveProperty('id');
    expect(addResponse.body.data.todo.name).toBe(newTodoData.name);
    expect(addResponse.body.data.todo.description).toBe(newTodoData.description);

    newTodoId = addResponse.body.data.todo.id;
  });

  it('should delete the newly added Todo item', async () => {
    const deleteResponse = await supertest(app)
      .delete(`/todos/${newTodoId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.body.status).toBe('success');
  });
});


//Test to fetch todo's with invalid token

describe('Get Todos with Invalid Token', () => {
    it('should return an unauthorized error', async () => {
      const invalidToken = 'lol';
      const response = await supertest(app)
        .get('/todos')
        .set('Authorization', `Bearer ${invalidToken}`);
      expect(response.statusCode).toBe(403);
      expect(response.body.status).toBe('fail');
    });
  });
  


  


  