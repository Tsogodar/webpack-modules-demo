const lodash = require('lodash');
const axios = require('axios');
const scss = require('./style.css');
const html = require('../index.html');

function xyz() {
	console.log('header xyz');
	const array = [1,2,3,4,5,6,7,8,9,10];
    const shuffled = lodash.shuffle(array);
	console.log(shuffled);
	const listDiv = document.querySelector('#list');
	console.log(listDiv);
	
	shuffled.map(el=>{
		listDiv.append(el);
	})
}

xyz();
