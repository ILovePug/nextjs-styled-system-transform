const path = require("path");

module.exports = {
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Note: we provide webpack above so you should not `require` it
		// Perform customizations to webpack config
		// Important: return the modified config

		config.module.rules.unshift({
			test: /\.js$/,
			include: [
				path.resolve(__dirname, 'node_modules/@styled-system'),
				//path.resolve(__dirname, 'node_modules/styled-system'),

			],
			//exclude: /node_modules\/(?!(@styled-system|styled-system)\/).*/,
			use: {
				loader: 'babel-loader',
				options: {
					plugins: ['./babel-plugin/styled-system-transform.js'],
				},
			},
		});

		return config;
	},
	webpackDevMiddleware: config => {
		// Perform customizations to webpack dev middleware config
		// Important: return the modified config
		return config;
	},
};
