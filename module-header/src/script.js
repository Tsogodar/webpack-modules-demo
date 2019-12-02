const lodash = require('lodash');
const axios = require('axios');

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
