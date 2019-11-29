const lodash = require( 'lodash' );
const fabric = require('fabric');
const echarts = require('echarts');
import './style.scss';

function xyz() {
    console.log( 'footer xyz' );
    const array = [1,2,3,4,5,6,7,8,9,10];
    const shuffled = lodash.shuffle(array);
    console.log(shuffled);
}

xyz();