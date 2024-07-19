// Import utility functions
import { getResourceId, processBodyFromRequest, returnErrorWithMessage } from './utils.js';
import pg from 'pg';
const { Client } = pg;


// Create a new post
export const createPost = async (req, res) => {
  try {
    const body = await processBodyFromRequest(req);
    if (!body) return returnErrorWithMessage(res, 400, 'Body is required');
    const parsedBody = JSON.parse(body);

    // Connect to the database
    const client = new Client({
      connectionString: process.env.PG.URI,
    });
    console.log('Here we have access to the body: ', parsedBody);

    // ****
    const result = await client.query('INSERT INTO posts (title, author, content) VALUES ($1, $2, $3) RETURNING *;',
      [parsedBody.title, parsedBody.author, parsedBody.content]
    );
    console.log('result', result);

    await client.end();
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Post created', result: result.rows[0] }));
  } catch (error) {
    returnErrorWithMessage(res);
  }
};

export const getPosts = (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Posts fetched' }));
};

export const getPostById = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post fetched' }));
};

export const updatePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post updated' }));
};

export const deletePost = (req, res) => {
  const id = getResourceId(req.url);
  console.log('Here we have access to the ID: ', id);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Post deleted' }));
};
