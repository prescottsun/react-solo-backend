const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
  constructor(id, first_name, last_name, email, password) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.password = password;
  }

  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }

  async login() {
    try {
      const response = await db.one(`SELECT * FROM users WHERE email = $1;`, [
        this.email
      ]);
      const valid = this.checkPassword(response.password);
      if (!!valid) {
        const { id, first_name, last_name } = response;
        return { isValid: valid, user_id: id, first_name, last_name };
      } else {
        return { isValid: valid };
      }
    } catch (err) {
      return err.message;
    }
  }

  async save() {
    try {
      const response = await db.one(
        `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`,
        [this.first_name, this.last_name, this.email, this.password]
      );
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async getInfo(user_id) {
    try {
      const response = await db.one(`SELECT * FROM users where id = $1;`, [
        user_id
      ]);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = User;
