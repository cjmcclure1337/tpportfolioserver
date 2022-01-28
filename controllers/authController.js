const requestify = require("requestify")
const links = require("../config/externalLinks")

const checkUser = (req, res, next) => {
    console.log("Cookies: ", req.cookies)
    requestify.get(links.authAPI, {
        cookies: {connect: {sid:"s%3ASsqSdI0jn6zr8uA15_7E1xpJbAE6u8ie.wOE8Md52RF1%2F929w%2Fg7YF%2Fqv%2FVCmm5dafLMbswKnrZo"}}
    })
    .then(({id}) => {
        next();
    })
    .catch(err => {
        res.status(400);
        res.send(err);
    });
    
}

module.exports = {checkUser};