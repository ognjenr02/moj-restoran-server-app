import mysql from 'mysql2';
import dotenv from 'dotenv';
import { Buffer } from 'buffer';

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

// User validation
export async function validateUser(username, password) {
  const [users] = await pool.query(
    `SELECT * FROM Users WHERE username = ? and password = ?`,
    [username, password]
  );

  try {
    if (users.length === 0) {
      console.log('No user found with the provided username and password.');
      return null;
    } else {
      console.log('User found:', users[0]);
      return users[0];
    }
  } catch (error) {
    console.log(error);
  }
}

//Gets all users
export async function getUsers() {
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
}

//Gets one specific user
export async function getUser(id) {
  const [rows] = await pool.query(
    `
  SELECT 
  * FROM Users
  WHERE UserID = ?`,
    [id]
  );
  return rows[0];
}

//Register user
export async function createUser(
  firstName,
  lastName,
  email,
  username,
  password
) {
  const [result] = await pool.query(
    `
    INSERT INTO Users (FirstName, LastName, Email, Username, Password)
    VALUES (?, ?, ?, ?, ?)
    `,
    [firstName, lastName, email, username, password]
  );
  const id = result.insertId;
  return getUser(id);
}

//Gets reviews
export async function getReviews() {
  const [rows] = await pool.query(`
    SELECT Reviews.*, Users.Username 
    FROM Reviews 
    JOIN Users ON Reviews.UserID = Users.UserID
  `);
  return rows;
}

//Gets review by ID **works**
export async function getReviewById(id) {
  const [rows] = await pool.query(
    `
    SELECT * FROM Reviews
    WHERE ReviewID = ?
    `,
    [id]
  );
  return rows;
}

//Adds review to the database
export async function addReview(
  title,
  restaurantName,
  restaurantLocation,
  comment,
  rating,
  userID,
  pictureBase64
) {
  console.log('addReview function called with parameters:', {
    title,
    restaurantName,
    restaurantLocation,
    comment,
    rating,
    userID,
    pictureBase64,
  });

  const picture = Buffer.from(pictureBase64, 'base64');

  const [result] = await pool
    .query(
      `
    INSERT INTO Reviews (Title, RestaurantName, RestaurantLocation, Comment, Rating, UserID, Picture)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [
        title,
        restaurantName,
        restaurantLocation,
        comment,
        rating,
        userID,
        picture,
      ]
    )
    .catch((error) => {
      console.error('Error in addReview function:', error);
      throw error;
    });

  const id = result.insertId;
  return getReviewById(id);
}

export default pool;
