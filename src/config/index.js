const config = {
	mongoURL: getConf("MONGO_URL", "mongodb://localhost:27017/bot"),
	botToken: getConf("BOT_TOKEN", "default"),
	bestMatchesToken: getConf("BEST_MATCHES_TOKEN", "default"),
	latestMatchesToken: getConf("LATEST_MATCHES_TOKEN", "default"),
	customMatchesToken: getConf("CUSTOM_MATCHES_TOKEN", "default"),
	channelID: getConf("CHANNEL_ID", "default")
};

function getConf(name, def = "") {
	if (process.env[name]) {
		return process.env[name];
	}
	return def;
}

module.exports = config;
