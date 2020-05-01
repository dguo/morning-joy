require("dotenv").config();
const got = require("got");
const twilio = require("twilio")(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function getUplingtingNewsPost() {
    const response = await got(
        "https://www.reddit.com/r/UpliftingNews/top.json?t=day"
    ).json();

    if (!response.data.children[0].data) {
        return null;
    }

    const {title, url} = response.data.children[0].data;
    return {title, url};
}

async function getAwwPost() {
    const response = await got(
        "https://www.reddit.com/r/aww/top.json?t=day"
    ).json();

    for (const post of response.data.children) {
        if (post.data.post_hint !== "image") {
            continue;
        }

        const {title, url} = post.data;
        return {title, url};
    }

    return null;
}

async function sendText(body, mediaUrl) {
    const text = await twilio.messages.create({
        body,
        mediaUrl: mediaUrl ? [mediaUrl] : [],
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.DESTINATION_PHONE_NUMBER
    });

    return text;
}

async function main() {
    const upliftingNewsPost = await getUplingtingNewsPost();
    const awwPost = await getAwwPost();

    if (upliftingNewsPost || awwPost) {
        const text = await sendText(`Here is your Morning Joy digest:`);
        console.log(text);
    }

    if (upliftingNewsPost) {
        const text = await sendText(
            `${upliftingNewsPost.title} ${upliftingNewsPost.url}`
        );
        console.log(text);
    }

    if (awwPost) {
        const text = await sendText(awwPost.title, awwPost.url);
        console.log(text);
    }
}

// main().catch(error => console.error(error));

exports.handler = async () => {
    await main();

    const response = {
        statusCode: 200
    };

    return response;
};
