const fs = require("fs");
const http = require("http");
const url = require("url");
// // Blocking, synchronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");

// const text = `This is what we know about the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", text);

// console.log("The file has been written");

// // Non blocking, asynchronous way
// fs.readFileSync("./txt/start.txt", "utf-8", (err, data) => {
// 	console.log(data);
// });

///////////////////////////////

// SERVER
const server = http.createServer((req, res) => {
	const pathName = req.url;

	if (pathName === "/" || pathName === "/overview") {
		res.end("This is the overview");
	} else if (pathName === "/api") {
		fs.readFile(`${__dirname}./dev-data/data.json`, "utf-8", (err, data) => {
			const productData = JSON.parse(data);
			res.end(data);
		});
		res.end("API");
	} else if (pathName === "/product") {
		res.end("This is the product");
	} else {
		res.writeHead(404, { "Content-type": "text/html" });
		res.end("<h1>Page not found</h1>");
	}
	res.end("Hello from the server!");
});

server.listen(8000, "localhost", () => {
	console.log("Listening to requests on localhost:8000");
});
