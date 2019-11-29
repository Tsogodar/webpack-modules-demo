const path = require('path');
const fs = require('fs');
const packageJson = require('./package.json');
const EventHooksPlugin = require('event-hooks-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'production',
	entry: ['./src/script.js'],
	output: {
		filename: 'script.js',
		path: path.resolve(__dirname, 'dist')
	},
	externals: {
		lodash: '_',
		fabric: 'fabric',
		echarts: 'echarts'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: `${packageJson.name}--[local]`
							}
						}
					},
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass')
						}
					}
				]
			}
		]
	},
	plugins: [
		new EventHooksPlugin({
			beforeRun: () => {
				const { execFile } = require('child_process');
				const child = execFile(
					'node',
					['build-dependencies-list'],
					(error, stdout, stderr) => {
						if (error) {
							throw error;
						}
					}
				);
			},
			done: () => {
				const template = fs.readFileSync(
					path.join(__dirname, 'src', 'index.html')
				);
				const posthtml = require('posthtml');
				const posthtmlPrefixClass = require('posthtml-prefix-class');
				posthtml()
					.use(
						posthtmlPrefixClass({
							prefix: `${packageJson.name}--`
						})
					)
					.process(template)
					.then(output => {
						fs.writeFileSync(
							path.join(__dirname, 'dist', 'index.html'),
							output.html
						);
					});
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	]
};
