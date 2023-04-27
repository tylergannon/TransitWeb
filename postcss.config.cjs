const autoprefixer = require('autoprefixer');
const postcssNested = require('postcss-nested');

const config = {
	plugins: [
    postcssNested,
		//But others, like autoprefixer, need to run after,
		autoprefixer
	]
};

module.exports = config;
