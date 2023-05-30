const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
// const whatsappService = require("../services/whatsappService");
// const samples = require("../shared/sampleModels");
const processMessage = require("../shared/processMessage");

const VerifyToken = (req, res) =>{
    
        try {
            var accessToken = "DFS6465RTSD32TS1GS3S5D5E";
            var token = req.query["hub.verify_token"];
            var challenge = req.query["hub.challenge"];

            if (challenge != null && token != null && token == accessToken) {
                res.send(challenge);
            }else{
                res.send(400).send();
            }

        } catch (e) {
            res.status(400).send();
        }


}
const RecivedMessage = (req, res) => {
    try {
        var entry = (req.body["entry"])[0];
        var changes = (entry["changes"])[0];
        var value = changes["value"];
        var messageObject = value["messages"];

        if (typeof messageObject != "undefined") {
            var messages = messageObject[0];
            var number = messages["from"];

            var text = GetTextUser(messages);

            if (text != "") {
                myConsole.log(text);
                myConsole.log(number);
                processMessage.Process(text, number);
            }
            
            // if (text == "text") {
            //     var data = samples.SampleText("Hola usuario", number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "image") {
            //     var data = samples.SampleImage(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "video") {
            //     var data = samples.SampleVideo(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "audio") {
            //     var data = samples.SampleAudio(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "document") {
            //     var data = samples.SampleDocument(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "button") {
            //     var data = samples.SampleButtons(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "list") {
            //     var data = samples.SampleList(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "location") {
            //     var data = samples.SampleLocation(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else{
            //     var data = samples.SampleText("No entiendo", number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
        } 

        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages) {
    var text = "";
    var typeMessage = messages["type"];

    if (typeMessage=="text") {
        text = (messages["text"])["body"];
    }
    else if (typeMessage == "interactive" ) {
        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        // myConsole.log(interactiveObject);

        if (typeInteractive == "button_reply") {
            text = (interactiveObject["button_reply"])["title"];
        }
        else if (typeInteractive = "list_reply") {
            text = (interactiveObject["list_reply"])["title"];
        }else{
            myConsole.log("sin mensaje");
        }
    }else{
        myConsole.log("sin mensaje");
    }
    return text;

}

module.exports = {
    VerifyToken,
    RecivedMessage
}