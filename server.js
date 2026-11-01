const Butter = require("./butter");

const PORT = 4060

const server = new Butter();
server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});


server.route("get", "/", (req, res) => {
    res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
    res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
    res.sendFile("./public/scripts.js", "text/javascript");
});

server.route("post", "/login", (req, res) => {
    res.status(200).json({ message: "Login successful" });
})