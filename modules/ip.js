require("dotenv").config();
const request = require("request");

async function isProxy(ip) {
    const ipURL = process.env.IPAPI_URL.replaceAll(/<%ip%>/g, ip);
    var data;

    await request(ipURL, (err, res, body) => {
        if (err || body == "{}") {
            data = null;
        }

        data = JSON.parse(body);
    });

    return data;
}

module.exports = {
    isProxy
}