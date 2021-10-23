const express = require('express');
const router = express.Router();
const config = require('./config');
let Parser = require('rss-parser');
let parser = new Parser();

const { createMessage, sendMessage } = require('./utils');

router.get('/', (req, res) => {
    res.json({ message: 'ok' })
})

router.get('/best-matches', async (req, res) => {
    let feed = await parser.parseURL(config.bestMatchesToken);
    let message = createMessage('🔥 BEST MATCHES', feed);
    await sendMessage(message);

    res.json({ message: 'ok' });
});

router.get('/latest-matches', async (req, res) => {
    let feed = await parser.parseURL(config.latestMatchesToken);
    let message = createMessage('🕔 LATEST MATCHES', feed);

    await sendMessage(message);

    res.json({ message: 'ok' });
});

router.get('/custom-matches', async (req, res) => {
    let feed = await parser.parseURL(config.customMatchesToken);
    let message = createMessage('🤖 CUSTOM MATCHES', feed);

    await sendMessage(message);

    res.json({ message: 'ok' });
});

module.exports = router;
