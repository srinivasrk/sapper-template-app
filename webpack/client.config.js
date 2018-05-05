const webpack = require('webpack');
const config = require('sapper/webpack/config.js');

const mode = process.env.NODE_ENV;
const isDev = mode === 'development';

module.exports = {
	entry: config.client.entry(),
	output: config.client.output(),
	resolve: {
		extensions: ['.js', '.json', '.html']
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hydratable: true,
						hotReload: true
					}
				}
			},
			{
				test: /\.(scss)$/,
		    use: [{
		      loader: 'style-loader', // inject CSS to page
		    }, {
		      loader: 'css-loader', // translates CSS into CommonJS modules
		    }, {
		      loader: 'postcss-loader', // Run post css actions
		      options: {
		        plugins: function () { // post css plugins, can be exported to postcss.config.js
		          return [
		            require('precss'),
		            require('autoprefixer')
		          ];
		        }
		      }
		    }, {
		      loader: 'sass-loader' // compiles Sass to CSS
		    }]
			},
			{
				test: /\.css$/,
        use: ['style-loader', 'css-loader']
			}
		]
	},
	mode,
	plugins: [
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.browser': true,
			'process.env.NODE_ENV': JSON.stringify(mode)
		}),
	].filter(Boolean),
	devtool: isDev && 'inline-source-map'
};
