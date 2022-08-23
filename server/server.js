const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const userDb = JSON.parse((fs.readFileSync("./server/db.json", "utf-8")));

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "12341234";

const expiresIn = "1h";

function createToken(payload) {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
}

function isAuthenticated({email, password}) {
    return (
        userDb.users.findIndex((user) => user.email === email && user.password === password) !== -1
    )
}

server.post("/auth/register", (req, res) => {
    const {email, password} = req.body;
    if (!isAuthenticated({email, password})) {
        const status = 401;
        const message = "Email or password already exist.";
        res.status(status).json({status, message})
        return;
    }

    fs.readFile("./server/db.json", (err, data) => {
        if (err) {
            const status = 401;
            const message = err;
            res.status(status).json({status, message});
            return;
        }

        data = JSON.parse(data.toString());

        let last_item_id = data.users[data.users.length - 1].id;

        data.users.push({id: last_item_id + 1, email: email, password: password});

        let writeData = fs.writeFile(
            "./server/db.json",
            JSON.stringify(data),
            (err, result) => {
                if (err) {
                    const status = 401;
                    const message = err;
                    res.status(status).json({status, message});
                    return;
                }
            }
        )
    });

    const access_token = createToken({email, password});
    res.status(200).json({access_token});
});

server.post("/auth/login", (req, res) => {
    const {email, password} = req.body;
    if (!isAuthenticated({email, password})) {
        const status = 401;
        const message = "Incorrect Email or Password";
        res.status(status).json({status, message})
        return;
    }
    const access_token = createToken({email, password});
    res.status(200).json({access_token});
})

server.listen(3001, () => {
    console.log("Running fake api json server");
})