CREATE DATABASE users;

DROP TABLE IF EXISTS users.user_names;
CREATE TABLE users.user_names (
  user_id    int         NOT NULL AUTO_INCREMENT,
  first_name varchar(25) DEFAULT NULL,
  last_name  varchar(50) NOT NULL,
  username   varchar(25) DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY users_UQ1 (username)
) AUTO_INCREMENT=1358;
