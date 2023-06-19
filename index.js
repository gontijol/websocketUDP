const WebSocket = require("ws");
const dgram = require("dgram");

// Configurações do servidor WebSocket
const wss = new WebSocket.Server({ host: "192.168.1.10", port: 8080 });

// Configurações do servidor Issabel
const issabelHost = "192.168.1.13";
const issabelPort = 5060;

// Criar um cliente UDP para se comunicar com o servidor Issabel
const udpClient = dgram.createSocket("udp4");

// Conexões WebSocket ativas
const activeConnections = new Set();

// Função para encaminhar mensagens recebidas do Issabel para os clientes WebSocket
const forwardMessageToClients = (message) => {
    if (message === "ping") {
        console.log("Recebido um ping do servidor Issabel via SIP.");
    }

    activeConnections.forEach((connection) => {
        if (connection.readyState === WebSocket.OPEN) {
            connection.send(message);
        }
    });
};

// Função para verificar o status da conexão registrada
const checkRegistrationStatus = () => {
    // Lógica para verificar o status da conexão registrada no servidor Issabel
    // Retorna o status da conexão registrado
    // Exemplo de implementação:
    const registrationStatus = // Sua lógica para obter o status da conexão registrada no Issabel
        // Supondo que a conexão esteja sempre registrada
        "Registrado";
};

// Configurar WebSocket para receber conexões
wss.on("connection", (ws) => {
    // Adicionar a conexão WebSocket à lista de conexões ativas
    activeConnections.add(ws);

    // Lidar com mensagens recebidas do cliente WebSocket
    ws.on("message", (message) => {
        if (message === "ping") {
            // Responder com um "pong" para o cliente WebSocket
            ws.send("pong");
        } else if (message === "status") {
            // Verificar o status da conexão registrada e responder ao cliente WebSocket
            const status = checkRegistrationStatus();
            ws.send(`Status da conexão registrada: ${status}`);
        } else {
            // Encaminhar a mensagem para o servidor Issabel via UDP
            udpClient.send(message, issabelPort, issabelHost, (err) => {
                if (err) {
                    console.error(
                        "Erro ao enviar mensagem para o servidor Issabel:",
                        err
                    );
                }
            });
        }
    });

    // Lidar com fechamento da conexão WebSocket
    ws.on("close", () => {
        // Remover a conexão WebSocket da lista de conexões ativas
        activeConnections.delete(ws);
    });
});

udpClient.on("listening", () => {
    const address = udpClient.address();
    console.log(
        `Cliente UDP conectado e ouvindo em ${address.address}:${address.port}`
    );
});

// Configurar servidor UDP para receber mensagens do Issabel
udpClient.on("message", (message, remote) => {
    const messageString = message.toString();
    console.log(
        "Mensagem recebida do servidor Issabel via SIP:",
        messageString
    );

    if (messageString.trim() === "PING") {
        udpClient.send("PONG", remote.port, remote.address, (err) => {
            if (err) {
                console.error("Erro ao enviar resposta PONG:", err);
            } else {
                console.log("Enviado PONG para o servidor Issabel via SIP.");
            }
        });
    }

    // Encaminhar a mensagem recebida para os clientes WebSocket
    forwardMessageToClients(messageString);
});

// Iniciar o servidor UDP
udpClient.bind();

console.log("Servidor WebSocket em execução na porta 8080");
