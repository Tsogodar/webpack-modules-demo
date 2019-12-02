const fs = require('fs');

const packageJson = require('./package.json');

const prodDependencies = Object.entries(packageJson['dependencies']);

const libs = {};
const libsHandler = fs.createWriteStream('libs.json', {
	flags: 'w'
});

const removeVersionFlag = libVersion => {
	const flags = ['~', '^'];
	return flags.includes(libVersion.charAt(0))
		? libVersion.slice(1)
		: libVersion;
};

prodDependencies.map(lib => {
	libs[lib[0]] = removeVersionFlag(lib[1]);
});

libsHandler.write(JSON.stringify(libs, null, 2));
