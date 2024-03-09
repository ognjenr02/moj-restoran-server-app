import express, { json, urlencoded } from 'express';
const app = express();
import cors from 'cors';
import {
  validateUser,
  getUsers,
  getUser,
  getReviews,
  createUser,
  addReview,
  getReviewById,
} from './database.js';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import multer from 'multer';
import morgan from 'morgan';

const storage = multer.memoryStorage(); // This will store files in memory
const upload = multer({ storage: storage });

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//Login user and give him token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (
    !username ||
    !password ||
    username.trim() === '' ||
    password.trim() === ''
  ) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const user = await validateUser(username, password);
    if (user) {
      const token = jwt.sign({ id: user.UserID }, 't3lHr9c7');
      const decodedToken = jwt.verify(token, 't3lHr9c7');
      const userId = decodedToken.id;
      console.log(userId);
      res.send({ token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

// Get all users
app.get('/getUsers', async (req, res) => {
  const users = await getUsers();
  res.send(users);
});

// Get user by id
app.get('/getUser/:idUser', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  res.send(user);
});

// Register user
app.post('/registerUsers', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const users = await createUser(
    firstName,
    lastName,
    email,
    username,
    password
  );
  res.status(201).send(users);
});

app.get('/getReviews', async (req, res) => {
  const reviews = await getReviews();
  res.send(reviews);
});

// Get Review by ID
app.get('/getReviewById/:id', async (req, res) => {
  const id = req.params.id;
  const review = await getReviewById(id);
  res.send(review);
});

app.post('/addReview', upload.single('picture'), async (req, res) => {
  console.log('Received POST request to /addReview with body:', req.body);

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 't3lHr9c7');
    const userID = decodedToken.id;

    const { title, restaurantName, restaurantLocation, comment, rating } =
      req.body;
    const picture = req.file ? req.file.buffer : null;

    console.log('Calling addReview function with parameters:', {
      title,
      restaurantName,
      restaurantLocation,
      comment,
      rating,
      userID,
      picture,
    });

    const review = await addReview(
      title,
      restaurantName,
      restaurantLocation,
      comment,
      rating,
      userID,
      picture
    );
    res.status(201).json(review);
  } catch (error) {
    console.error('Error in POST /addReview:', error);
    res
      .status(500)
      .json({ error: 'An error occurred while adding the review.' });
  }
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// your routes go here
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

export default app;
