const db = require("./conn.js");

class Test {
  constructor(id, var_val, var_val2, int_val) {
    this.id = id;
    this.var_val = var_val;
    this.var_val2 = var_val2;
    this.int_val = int_val;
  }

  static async getAll() {
    try {
      const response = await db.any(`
            SELECT * FROM test
            `);
      return response;
    } catch (err) {
      return err.message;
    }
  }

  static async addTest(var_val, var_val2, int_val) {
    try {
      const response = await db.result(`
            INSERT INTO test (var_val, var_val2, int_val)
                VALUES ('${var_val}', '${var_val2}', ${int_val})
                `);
      return response;
    } catch (err) {
      return err.message;
    }
  }
}

module.exports = Test;
