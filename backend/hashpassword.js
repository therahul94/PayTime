const bcrypt = require('bcrypt');

async function createHashpassword(plainPassword){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    console.log("LOLO: ", salt)
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
}

async function verifyPassword(hashedPassword, candidatePassword){
    const isVerified = await bcrypt.compare(candidatePassword, hashedPassword);
    return isVerified;
}

module.exports = {
    createHashpassword, verifyPassword
}