# Upwork Notify Telegram Bot

## Simple telegram bot which takes latest Upwork jobs from your RSS, and push to Telegram channel

1. Create Telegram bot, save a token to .env

2. Create private/public channel, save Telegram ID to .env (*if channel is private add -100 from id)

3. Add your bot to channel and make it admin/give send message access

4. Sign in your Upwork, go to 'Find Work' section, and press three dot(...) button from right, and select RSS

5. Copy RSS link, and put .env
````
3 type of alerts:

BEST_MATCHES_TOKEN=example
LATEST_MATCHES_TOKEN=example
CUSTOM_MATCHES_TOKEN=example
```
[link](https://community.upwork.com/t5/New-to-Upwork/How-to-use-targeted-RSS-feeds-to-automatic-job-alerts/td-p/638347)

6. Create cron jobs from 'https://cron-job.org' for following URLs (or only one which necessary for you):
```
http://yoursite.com/best-matches
http://yoursite.com/latest-matches
http://yoursite.com/custom-matches
```
7. Enjoy by getting jobs not leaving Telegram
