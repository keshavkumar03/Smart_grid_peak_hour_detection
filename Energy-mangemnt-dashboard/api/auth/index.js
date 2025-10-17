import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usersContainer } from '../shared/cosmosClient.js';

const httpTrigger = async function (context, req) {
  const { username, password } = req.body;

  try {
    const { resources: users } = await usersContainer.items
      .query({
        query: 'SELECT * FROM c WHERE c.username = @username',
        parameters: [{ name: '@username', value: username }]
      })
      .fetchAll();

    const user = users[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      context.res = {
        status: 401,
        body: { message: 'Invalid credentials' }
      };
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    context.res = {
      body: {
        token,
        user: {
          id: user.id,
          username: user.username
        }
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: { message: 'Internal server error' }
    };
  }
};

export default httpTrigger;
