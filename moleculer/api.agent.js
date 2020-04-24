const ApiGateway = require("moleculer-web");

module.exports = {
	name: "api",
	mixins: [ApiGateway],

	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		// Exposed port
		port: process.env.PORT || 3000,

    routes: [{
				path: "/api",

				whitelist: [
					"**"
				],
    }],

    assets: {
      folder: "public"
    }
  }
}
