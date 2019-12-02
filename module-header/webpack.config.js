const path = require( 'path' );
const EventHooksPlugin = require( 'event-hooks-webpack-plugin' );

module.exports = ( env, options ) =>
{
	return {
		entry: [ './module/main.js' ],
		output: {
			filename: '[name].js',
			path: path.resolve( __dirname, 'dist' )
		},
		externals: options. mode === 'production' ? {
			lodash: '_',
			axios: 'axios'
		} : {},
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [ 'css-loader' ]
				},
				{
					test: /\.html$/,
					use: [
						'file-loader?name=index.[ext]',
						'extract-loader',
						'html-loader',
						{
							loader: 'posthtml-loader',
							options: {
								ident: 'posthtml',
								plugins: [
									require( 'posthtml-modules' )(),
									require( 'posthtml-postcss-modules' )( {
										from: './src/',
										generateScopedName: '[hash:base64:5]'
									} ),
								]
							}
						},
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
			} )
		]
	}
};
