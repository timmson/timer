const path = require("path");
const url = require("url");

const {app, BrowserWindow, Tray} = require("electron");

let window = null;
let log = null;
const config = {
    webDir: "web"
};

let position = {};

function Log(sender) {
    this.sender = sender;

    this.info = function (message) {
        if (this.sender) {
            this.sender.send("log", {level: "info", date: new Date(), message});
        }
    };

    this.error = function (message) {
        if (this.sender) {
            this.sender.send("log", {level: "error", date: new Date(), message});
        }
    };
}

app.once("ready", () => {
    window = new BrowserWindow({
        width: 1000,
        height: 800,
        backgroundColor: "#000",
        show: true
    });

    position = window.getPosition();

    window.loadURL(url.format({
        pathname: path.join(__dirname, config.webDir, "index.html"),
        protocol: "file:",
        slashes: true
    }));

    window.once("ready-to-show", () => {
        window.show();
    });

    log = new Log(window.webContents);

    console.log("Bot has started");
    console.log("Please press [CTRL + C] to stop");
});

process.on("SIGINT", () => {
    console.log("Bot has stopped");
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("Bot has stopped");
    process.exit(0);
});
