DELETE FROM TABLE users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(200)
  );
INSERT INTO users (first_name, last_name, email, password)
VALUES
  ('test1', 'test2', 'test@gmail.com', 'password');
CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    var_val VARCHAR(200),
    var_val2 VARCHAR(200),
    int_val INTEGER
  );
INSERT INTO test (var_val, var_val2, int_val)
VALUES
  ('testing text', 'second test', 10);