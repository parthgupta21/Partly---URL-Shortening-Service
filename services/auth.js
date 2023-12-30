const jwt = require("jsonwebtoken");
const secret = "Parth2102@"

function setUser(user) {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
        },
        secret
    );
}

function getUser(token) {
    if (!token) {
        return null;
    }

    try {

        return jwt.verify(token, secret);
        
    } catch (error) {

        return null;

    }

}


module.exports =
{
    setUser,
    getUser,
};