const whatsappModel = require("../shared/whatsappModels");
const whatsappService = require("../services/whatsappService");

function Process(textUser, number) {
    textUser = textUser.toLowerCase();
    let models = [];

    if (textUser.includes("hola") || textUser.includes("buenos dias") || textUser.includes("buenas tardes") || textUser.includes("buenas noches")) {
        let model = whatsappModel.MessageText("Hola, gracias por comunicarte con Llevame", number);
        models.push(model);

        let modelList = whatsappModel.MessageList(number);
        models.push(modelList);
    }
    else if (textUser.includes("gracias")) {
        let model = whatsappModel.MessageText("Gracias por comunicarte copn Llevame ", number);
        models.push(model);
    }
    else if (textUser.includes("adios") || textUser.includes("adiós") || textUser.includes("bye") || textUser.includes("me voy")) {
        let model = whatsappModel.MessageText("Vuelve pronto", number);
        models.push(model);
    }
    else if (textUser.includes("comprar")) {
        let model = whatsappModel.MessageComprar(number);
        models.push(model);
    }
    else if (textUser.includes("vender")) {
        let model = whatsappModel.MessageText("Registrate en el siguiente formulario para poder evaluarte: http://form.jotform.com/222507994363665", number);
        models.push(model);
    }
    else if (textUser.includes("agencia")) {
        let model = whatsappModel.MessageLocation(number);
        models.push(model);
    }
    else if (textUser.includes("contacto")) {
        let model = whatsappModel.MessageText("*Centro de contacto:*\n+591 73456789\n+591 73456789\ncontacto@llevame.com\nwww.llevame.com/contacto", number);
        models.push(model);
    }
    else{
        let model = whatsappModel.MessageText("No entiendo lo que dices", number);
        models.push(model);
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);
    });
}

module.exports = {
    Process
}