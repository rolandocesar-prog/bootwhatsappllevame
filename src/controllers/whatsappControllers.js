const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
// const whatsappService = require("../services/whatsappService");
// const samples = require("../shared/sampleModels");
const processMessage = require("../shared/processMessage");

const VerifyToken = (req, res) =>{
    
        try {
            let accessToken = "DFS6465RTSD32TS1GS3S5D5E";
            let token = req.query["hub.verify_token"];
            let challenge = req.query["hub.challenge"];

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
        let entry = (req.body["entry"])[0];
        let changes = (entry["changes"])[0];
        let value = changes["value"];
        let messageObject = value["messages"];

        if (typeof messageObject != "undefined") {
            let messages = messageObject[0];
            let number = messages["from"];

            let text = GetTextUser(messages);

            if (text != "") {
                myConsole.log(text);
                myConsole.log(number);
                processMessage.Process(text, number);
            }
            
            // if (text == "text") {
            //     let data = samples.SampleText("Hola usuario", number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "image") {
            //     let data = samples.SampleImage(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "video") {
            //     let data = samples.SampleVideo(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "audio") {
            //     let data = samples.SampleAudio(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "document") {
            //     let data = samples.SampleDocument(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "button") {
            //     let data = samples.SampleButtons(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "list") {
            //     let data = samples.SampleList(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else if (text == "location") {
            //     let data = samples.SampleLocation(number);
            //     whatsappService.SendMessageWhatsapp(data);
            // }
            // else{
            //     let data = samples.SampleText("No entiendo", number);
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
    let text = "";
    let typeMessage = messages["type"];

    if (typeMessage=="text") {
        text = (messages["text"])["body"];
    }
    else if (typeMessage == "interactive" ) {
        let interactiveObject = messages["interactive"];
        let typeInteractive = interactiveObject["type"];
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