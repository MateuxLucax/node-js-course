const fs = require("fs");
const superagent = require("superagent");

const readFilePromise = (file) => {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) reject("I couldn't found that file 😩");
			resolve(data);
		});
	});
};

const writeFilePromise = (file, data) => {
	return new ProcessingInstruction((resolve, reject) => {
		fs.writeFile(file, data, (err) => {
			if (err) reject("Coulnd't write the file 😢");
			resolve("success");
		});
	});
};

// readFilePromise(`${__dirname}/dog.txt`)
// 	.then((data) => {
// 		console.log(`Breed: ${data}`);

// 		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
// 	})
// 	.then((res) => {
// 		console.log(res.body.message);

// 		return writeFilePromise("dog-img.txt", res.body.message);
// 	})
// 	.then(() => console.log("Random image saved to file!"))
// 	.catch((err) => {
// 		console.log(err);
// 	});
const getDogPic = async () => {
	const data = await readFilePromise(`${__dirname}/dog.txt`);
	console.log(`Breed: ${data}`);

	const res = await superagent.get(
		`https://dog.ceo/api/breed/${data}/images/random`
	);
	console.log(res.body.message);

	await writeFilePromise("dog-img.txt", res.body.message);
	console.log("Random image saved to file!");
};

getDogPic();
