function MessageText(textResponse, number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "text": {
            "preview_url": true,
            "body": textResponse
        },
        "type":"text"
    });
    return data;  
}

function MessageList(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type":"interactive",
        "interactive": {
            "type": "list",
            "body": {
                "text": "Paqueteria Llevame"
            },
            "footer": {
                "text": "Por favor elige una opcion"
            },
            "action": {
                "button": "Ver opciones",
                "sections": [
                    {
                        "title": "Compra y vende productos",
                        "rows": [
                            {
                                "id": "main-comprar",
                                "title": "Comprar",
                                "description": "Enviar un paquete"
                            },
                            {
                                "id": "main-vender",
                                "title": "Vender",
                                "description": "Registrarse como negocio asociado"
                            }
                        ]
                    },
                    {
                        "title": "Centro de atencion",
                        "rows": [
                            {
                                "id": "main-agencia",
                                "title": "Agencia",
                                "description": "Puedes visitar nuestras oficinas"
                            },
                            {
                                "id": "main-contacto",
                                "title": "Centro de contacto",
                                "description": "ponte en contacto con nosotros"
                            }
                        ]
                    }
                ]
            }
        }
        
    });
    return data;  
}

function MessageComprar(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type":"interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": "Selecciona uno de los productos"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "option-laptop",
                            "title": "Laptop"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                             "id": "option-computadora",
                            "title": "Computadora"
                        }
                    }
                ]
            }
        }
        
    });
    return data;  
};

function MessageLocation(number) {
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "to": number,
        "type": "location",
        "location": {
            "latitude": "-16.51165",
            "longitude": "-68.15266",
            "name": "Oficinas Llevame",
            "address": "C. Jose Diaz #1145, Edif. Lomas oficina 12"
        }
        
    });
    return data;  
}

module.exports = {
    MessageText,
    MessageList,
    MessageComprar,
    MessageLocation
};