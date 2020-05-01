# Morning Joy

Wake up to a happy text every day! Morning Joy lets you start each day on a good
note by texting you an uplifting news story and a picture of something cute.

This was created for the [Twilio x DEV
Hackathon](https://dev.to/devteam/announcing-the-twilio-hackathon-on-dev-2lh8).


## Installation

Sign up for a [Twilio](https://www.twilio.com/) account (feel free to use my
[referral link](https://www.twilio.com/referral/fX7XpV) to get a $10 credit)
and buy a phone number.

Sign up for an [Amazon Web Services](https://aws.amazon.com/) account and
create a new [AWS Lambda](https://aws.amazon.com/lambda/) function. Choose the
[Node.js](https://nodejs.org/en/) runtime.

Clone this repo and run `yarn install`. Then run `zip -r lambda.zip . -x
*.git*` to generate a ZIP file to upload into the Lambda function.

Add the following environment variables to the function:

* DESTINATION_PHONE_NUMBER (the phone number that should receive the text)
* TWILIO_ACCOUNT_SID (from the Twilio dashboard)
* TWILIO_AUTH_TOKEN (from the Twilio dashboard)
* TWILIO_PHONE_NUMBER (the number that you purchased).

Be aware that Twilio expects phone numbers to be in
[E.164](https://en.wikipedia.org/wiki/E.164) format (e.g. "+12348889999").

Add a [CloudWatch Events
trigger](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/Create-CloudWatch-Events-Scheduled-Rule.html)
with a schedule expression like `cron(0 10 * * ?  *)`, which will fire the
function every day at 10 a.m. UTC. Adjust the schedule as you would like it.

Enjoy the texts!

## License

[MIT](https://github.com/dguo/morning-joy/blob/master/LICENSE)
