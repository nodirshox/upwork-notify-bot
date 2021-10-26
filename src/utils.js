const config = require('./config');
const fetch = require('node-fetch');
const Job = require('./models/Job');
const dateFormat = require('dateformat');
let Parser = require('rss-parser');
let parser = new Parser();

exports.createMessage = async (type, feed) => {
    let message = `${type}\n`;
    feed.forEach((job, index) => {
        if (feed.length > 1) {
            message += `<b>${index + 1}.</b> `;
        }
        message += `<a href="${job.link}">${job.title}</a>\n`;
        if (job.body) {
            job.published_at.toLocaleString('en-US', { timeZone: 'Asia/Tashkent' });
            let time = dateFormat(job.published_at, 'd-mmm, HH:MM');
            message += `${time}\n\n${job.body}`;
        }
    });

    return message;
}

exports.createJob = async (jobs) => {
    jobs.items.forEach(async (job) => {
        let isExistsCount = await Job.countDocuments({ link: job.link });
        if (isExistsCount === 0) {
            let newJob = {
                title: job.title,
                link: job.link,
                published_at: job.isoDate,
                body: job.contentSnippet,
                created_at: new Date()
            }
            await Job.create(newJob);
        }
    });
    return true;
}

exports.findUnpublishedJob = async () => {
    const query = {
        is_published: false
    }
    const options = {
        limit: 1,
        options: {
            published_at: -1
        }
    }
    let jobs = await Job.find(query, {}, options);
    return jobs;
}

exports.changeStatus = async (jobs) => {
    jobs.forEach(async (job) => {
        const filter = {
            _id: job._id
        };
        const update = {
            updated_at: new Date(),
            is_published: true
        }
        await Job.findOneAndUpdate(filter, update, { new: true });
    });
}

exports.sendMessage = async (message, link) => {
    const URL = 'https://api.telegram.org/bot' + config.botToken + '/sendMessage';
    let body = {
        chat_id: config.channelID,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: 1
    }
    if (link) {
        body.reply_markup = {
            inline_keyboard: [
                [{
                    text: "Apply",
                    url: link
                }]
            ]
        }
    }
    await fetch(URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    });
}

exports.parseFeed = async (token) => {
    let feed = await parser.parseURL(token);

    return feed;
}
