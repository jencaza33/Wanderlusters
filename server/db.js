const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5434,
  database: "postgres",
  
});

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = ` 
    SELECT *
    FROM users
    WHERE id = $1;
      `;
  const values = [id];
  return pool
    .query(queryString, values)
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error("query error", err.stack);
    });
};
exports.getUserWithId = getUserWithId;

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = ` 
    SELECT  user_id, firstName, email, password 
    FROM users
    WHERE email = $1;
      `;
  const values = [email];
  return pool
    .query(queryString, values)
    .then((res) => {
      console.clear();
      // console.log("res in getEmail", res.rows[0])
      if (res.rows[0]) {
        console.log("gitEmail", res.rows[0].email);
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserEmail = function (email) {
  const queryString = ` 
        SELECT  user_id, firstName, email, password 
        FROM users
        WHERE email = $1;
          `;
  const values = [email];
  return pool
    .query(queryString, values)
    .then((res) => {
      // console.clear();
      // console.log("res in getEmail", res.rows[0])
      if (res.rows[0]) {
        console.log("xxx", res.rows[0].email);
        return res.rows[0].email;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.error("query error", err.stack);
    });
};

// exports.getUserWithEmail = getUserWithEmail;

// return db.query(`INSERT INTO users(firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
//     [user.firstName, user.lastName, user.email, user.password])
/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = ` 
    INSERT INTO users(firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *;;
      `;
  const values = [user.firstName, user.lastName, user.email, user.password];
  return pool
    .query(queryString, values)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.error("query error", err.stack);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all places for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllPlaces = function (guest_id, limit = 10) {
  const queryString = ` 
    SELECT users.*, places.*
    FROM places
    JOIN users ON user_id = guest_id;`;
  const values = [guest_id, limit];
  return pool
    .query(queryString, values)
    .then((result) => result.rows)
    .catch((err) => {
      console.error("query error", err.stack);
    });
};
exports.getAllPlaces = getAllPlaces;

module.exports = { db: pool, getUserWithEmail, getUserEmail };
