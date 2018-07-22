const express = require('express')();
const https = require('https');

module.exports = express;

/**
 * Passes through the access_token request since this can not be made
 * using a browser.
 */
express.post('/_api/gh/access_token', (req, res) => {
    const out = https.request({
        protocol: 'https:',
        host: 'github.com',
        path: '/login/oauth/access_token',
        method: 'POST',
        headers: {
            ...req.headers,
            host: 'github.com',
            connection: 'close'
        }
    });

    // pass through response
    out.on('response', (resp) => {
        res.set(resp.headers);
        resp.pipe(res)
    });

    // Handle errors
    out.on('error', (err) => {
        res.json({
            error: true,
            message: err.message
        });
    });

    // Pass through initial request
    req.pipe(out);
});
