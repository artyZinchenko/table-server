export const UserQueries = {
    GetUsers: `
  SELECT id, username, email, lastLogin, registrationDate, blocked FROM user`,
    AddUser: `
  INSERT INTO user (username, email, lastLogin, password, registrationDate)
    VALUES (?, ?, NOW(), ?, NOW());
  `,
    LoginUser: `
  SELECT *
  FROM user
  WHERE (email = ?)
  AND password = ?;`,
    UpdateLastLogin: `
  UPDATE user
  SET lastLogin = NOW()
  WHERE id = ?;
  `,
    FindUser: `
  SELECT * FROM user
  WHERE id = ?
  AND username = ?;
  `,
    UpdateBlocked: `
  UPDATE user
  SET blocked = 1
  WHERE id IN (?);
  `,
    UpdateUnblocked: `
  UPDATE user
  SET blocked = 0
  WHERE id IN (?);
  `,
    DeleteUsers: `
  DELETE FROM user
  WHERE id IN (?);`,
};
