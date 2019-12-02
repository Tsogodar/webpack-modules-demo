const path = require( 'path' );
const fs = require( 'fs' );
const packageJson = require( './package.json' );
const EventHooksPlugin = require( 'event-hooks-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

const stylePrefix = 'header--';

module.exports = {
	mode: 'development',
	entry: [ './src/script.js' ],
	output: {
		filename: 'script.js',
		path: path.resolve( __dirname, 'dist' )
	},
	externals: {
		lodash: '_',
		axios: 'axios'
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: `${ packageJson.name }--[local]`
							}
						}
					},
					// {
					// 	loader: 'sass-loader',
					// 	options: {
					// 		implementation: require( 'sass' )
					// 	}
					// },
					// {
					// 	loader: 'postcss-loader'
					// }
				]
			},
			{
				test: /\.html$/,
				use: [
					'file-loader?name=[name].[ext]',
					'extract-loader',
					'html-loader',
					{
						loader: 'posthtml-loader',
						options: {
							ident: 'posthtml',
							plugins: [
								require( 'posthtml-prefix-class' )({
									prefix: stylePrefix
								})
							]
						}
					},
					{
						loader: 'postcss-loader',
						// options:{
						// 	parser: require('sass')
						// }
					}
				]
			}
		]
	},
	plugins: [
		new EventHooksPlugin( {
			beforeRun: () =>
			{
				const { execFile } = require( 'child_process' );
				const child = execFile(
					'node',
					[ 'build-dependencies-list' ],
					( error, stdout, stderr ) =>
					{
						if ( error )
						{
							throw error;
						}
					}
				);
			},
		} ),
		new MiniCssExtractPlugin( {
			filename: 'style.css'
		} ),
	 
	]
};
