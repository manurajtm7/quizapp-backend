const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  // takes the plain password and hashes and returns the hashed password using this method 
  try {
    const hashedPassword = await bcrypt.hash(password, 9); //bcrypt will hashed the plain password
    return hashedPassword;
  } catch (err) {
    console.error("Error on bcrypt js", err);
    throw err; // Optionally handle the error or rethrow
  }
};

const comparePassword = async (password, hashedPassword) => {
  // compare method is used for comparing the plain password and hashed password return true or false
  try {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);
    return comparedPassword;
  } catch (err) {
    console.error("Error on bcrypt" , err);
    return;
  }
};

module.exports = { hashPassword, comparePassword }; //exports both functions
