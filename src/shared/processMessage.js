const whatsappModel = require("../shared/whatsappModels");
const whatsappService = require("../services/whatsappService");

function Process(textUser, number) {
    textUser = textUser.toLowerCase();
    var models = [];

    if (textUser.includes("hola")) {
        var model = whatsappModel.MessageText("Hola, gracias por comunicarte con el servicio de paqueteria Llevame", number);
        models.push(model);

        var modelList = whatsappModel.MessageList(number);
        models.push(modelList);
    }
    else if (textUser.includes("gracias")) {
        var model = whatsappModel.MessageText("Gracias a ti por escribirme ", number);
        models.push(model);
    }
    else if (textUser.includes("adios") || textUser.includes("adiós") || textUser.includes("bye") || textUser.includes("me voy")) {
        var model = whatsappModel.MessageText("Ve con cuidado ", number);
        models.push(model);
    }
    else if (textUser.includes("comprar")) {
        var model = whatsappModel.MessageComprar(number);
        models.push(model);
    }
    else if (textUser.includes("vender")) {
        var model = whatsappModel.MessageText("Registrate en el siguiente formulario para poder evaluarte: http://form.jotform.com/222507994363665", number);
        models.push(model);
    }
    else if (textUser.includes("agencia")) {
        var model = whatsappModel.MessageLocation(number);
        models.push(model);
    }
    else if (textUser.includes("contacto")) {
        var model = whatsappModel.MessageText("*Centro de contacto:*\n123456789", number);
        models.push(model);
    }
    else{
        var model = whatsappModel.MessageText("No entiendo lo que dices", number);
        models.push(model);
    }

    models.forEach(model => {
        whatsappService.SendMessageWhatsapp(model);
    });
}

module.exports = {
    Process
}