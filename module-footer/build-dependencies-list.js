const fs = require('fs');
const path =require('path');

const cdn = 'https://cdn.jsdelivr.net/npm/';
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
	const libCDN = cdn.concat(`${lib[0]}@${removeVersionFlag(lib[1])}/dist/${lib[0]}.min.js`);
	libs[lib[0]] = libCDN;
});

libsHandler.write(JSON.stringify(libs, null, 2));
