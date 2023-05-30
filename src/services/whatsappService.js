const { error } = require("console");
const https = require("https");

function SendMessageWhatsapp(data) {

    const options = {
        host: "graph.facebook.com",
        path: "/v16.0/115723404857028/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAQ3b6gkDYkBACYz4DX1KLeBxnwJMi8Nhafq6YX3jkPjxDLdKkp7d3OCalv395fqTz5wpXcy3aXlNx8PZAhNJxyVjsmhzD67DzLLTtHBh5dG3uYV4ZAFfEZCtehf0Hh58NkuYkd1kQNWwyfwvTMcCPne2OMZBOYGWsV56ZAZAEFRJ0WmtZCp3YKMv46ZCgTRpdOM3dNnHgdbnJvHF5tIoqXdoo0xanZBWUqqaZBovyvWPQIwZDZD"
        }
    };
    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
};

module.exports = {
    SendMessageWhatsapp
}