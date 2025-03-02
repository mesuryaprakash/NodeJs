const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    // Log to file asynchronously, but don’t tie it to the response
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.error("Error writing to log file:", err);
        }
    });

    // Handle the response immediately
    switch (myUrl.pathname) {
        case "/":
            res.end("Welcome to Home");
            break;
        case "/about":
            const username = myUrl.query.myname;
            res.end(`Hi, ${username}`);
            break;
        case "/search":
            const search = myUrl.query.search_query;
            res.end("Here is the result for " + search);
            break;
        default:
            res.end("404 Not Found");
    }
});

myServer.listen(5000, () => {
    console.log("Server is live");
});
