const GET_ALL_USERS = "SELECT * FROM get_all_users()";
const REGISTER_USERS ="SELECT * FROM register_user(p_name VARCHAR,p_email VARCHAR,p_password TEXT)"
module.exports = {
  GET_ALL_USERS,
  REGISTER_USERS
};