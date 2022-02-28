var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const { db, getUserWithEmail, getUserEmail } = require("../db.js");
const {
  generateToken,
  decodeToken,
  validateToken,
} = require("../utils/jwt.js");

module.exports = (db) => {
  // Create a new user ...................
  router.post("/SignUp", async (req, res) => {
    const newUser = req.body;
    if ((await getUserEmail(newUser.email)) === newUser.email) {
      return res.send("Email is already in use.");
      // res.json({
      //   error: "Email already in use!",
      // });
    } //if email is already in use throw an error.....

    if (newUser.email === "" || newUser.password === "") {
      return res.status(400).json("An email or password needs to be entered.");
    } else {
      const salt = bcrypt.genSaltSync(12);
      newUser.password = bcrypt.hashSync(newUser.password, salt);
      return db
        .query(
          `INSERT INTO users(firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *;`,
          [newUser.firstName, newUser.lastName, newUser.email, newUser.password]
        )
        .then((data) => {
          const users = data.rows;
          res.json({ users });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login = function (email, password) {
    return getUserWithEmail(email).then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  };
  exports.login = login;

  router.post("/Login", (req, res) => {
    const { email, password } = req.body;
    login(email, password)
      .then((user) => {
        console.log("login", user);
        if (!user) {
          return res.status(401).json({ error: "invalid email or password" });
        }

        const token = generateToken(user);
        const userInfo = {
          firstName: user.firstName,
          firstName: user.lastName,
          email: user.email,
          user_id: user.user_id,
        };
        return res.send({ data: userInfo, token });
      })
      .catch((e) => {
        console.log("error", e);
      });
  });

  router.post("/logout", (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({ message: "not logged in" });
      return;
    }
    db.getUserWithId(userId)
      .then((user) => {
        if (!user) {
          res.send({ error: "no user with that id" });
          return;
        }
        res.send({ user: { name: user.name, email: user.email, id: userId } });
      })
      .catch((e) => res.send(e));
  });

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/", (req, res) => {
    const { user } = req.body;
    db.query(
      `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETERNING`,
      [name, email, password]
    )
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/Itinerary", validateToken, async (req, res) => {
    console.log("req.bod__", req.body);
    const user_id = req.user_id;
    console.log("user_id", user_id);
    return db
      .query(
        `INSERT INTO itinerary (placename, guest_id, notes) VALUES ($1, $2, $3) RETURNING *;`,
        [req.body.placename, user_id, req.body.notes]
      )
      .then((data) => {
        const itinerary_data = data.rows[0];
        res.json({ itinerary_data });
        console.log("itinerary_data", itinerary_data);
      })
      .catch((err) => {
        console.log("Error", err);
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/Itinerary", validateToken, async (req, res) => {
    const user_id = req.user_id;
    db.query(`SELECT id, placename, notes FROM itinerary WHERE guest_id=$1;`, [
      user_id,
    ])
      .then((data) => res.send({ itineraryItems: data.rows }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  router.post("/itinerary/delete/:id", validateToken, async (req, res) => {
    const user_id = req.user_id;
    const itinerary_id = req.params.id;
    console.log("====", itinerary_id);
    db.query(`DELETE FROM itinerary WHERE id = $1 AND guest_id = $2`, [
      itinerary_id,
      user_id,
    ])
      .then((data) => res.status(200).send({ messgae: "ok" }))
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};

// module.exports = router;
