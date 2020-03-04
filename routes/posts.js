const router = require('express').Router();
const verify = require('./verifyToken');

router.get("/", verify, (req, res) => {
    res.json({
        posts: {
            title: "Alex Simisi et le développement front-end",
            description: "Livre parlant du développement front-end (Javascript, Vue.js, React.js)"
        }
    })
})

module.exports = router