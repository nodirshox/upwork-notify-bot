const express = require('express');
const router = express.Router();
const config = require('./config');

const { createMessage, sendMessage, createJob, findUnpublishedJob, changeStatus, parseFeed } = require('./utils');
const responseMessage = { status: true };

router.get('/', (req, res) => {
    res.json(responseMessage);
})

// GET - publish 30 jobs to channel, POST - save new 30 jobs to database
router.get('/best-matches', async (req, res) => {
    let feed = await parseFeed(config.bestMatchesToken);
    let message = await createMessage('🔥 BEST MATCHES', feed.items);

    await sendMessage(message);
    res.json(responseMessage);
});

router.post('/best-matches', async (req, res) => {
    let feed = await parseFeed(config.bestMatchesToken);
    await createJob(feed);
    res.json(responseMessage);
});


router.get('/latest-matches', async (req, res) => {
    let feed = await parseFeed(config.latestMatchesToken);
    let message = await createMessage('🕔 LATEST MATCHES', feed.items);

    await sendMessage(message);
    res.json(responseMessage);
});

router.post('/latest-matches', async (req, res) => {
    let feed = await parseFeed(config.latestMatchesToken);
    await createJob(feed);
    res.json(responseMessage);
});

router.get('/custom-matches', async (req, res) => {
    let feed = await parseFeed(config.customMatchesToken);
    let message = await createMessage('🤖 CUSTOM MATCHES', feed.items);

    await sendMessage(message);
    res.json(responseMessage);
});

router.post('/custom-matches', async (req, res) => {
    let feed = await parseFeed(config.customMatchesToken);
    await createJob(feed);
    res.json(responseMessage);
});


router.get('/publish-saved-jobs', async (req, res) => {
    let jobs = await findUnpublishedJob();
    if (jobs.length > 0) {
        let message = await createMessage('💾 SAVED JOBS', jobs);

        await sendMessage(message);
        await changeStatus(jobs);
    }
    res.json(responseMessage);
});

module.exports = router;
