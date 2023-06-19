# WebSocketUDP

WebSocketUDP é um projeto que implementa uma interface para converter o protocolo UDP para WebSocket em JavaScript.

## Funcionalidades

- Converte mensagens UDP para o formato WebSocket.
- Permite a comunicação entre aplicativos/servidores que usam UDP e aplicativos/servidores que usam WebSocket.

## Requisitos

- Node.js (>=v18.0.0): [link para download](https://nodejs.org)

## Instalação

1. Clone este repositório em sua máquina local:

``git clone https://github.com/gontijol/websocketUDP.git```


2. Navegue até o diretório do projeto:

``cd websocketUDP``

3. Instale as dependências do projeto:

``npm install``


4. Execute o servidor WebSocketUDP:

``node server.js``


## Uso

Após a instalação e execução do servidor WebSocketUDP, você pode configurar aplicativos ou servidores para se comunicarem com a interface convertendo mensagens UDP para WebSocket.

Exemplo de configuração para um aplicativo/servidor que usa UDP:

```javascript
// Exemplo em JavaScript

// Importe a biblioteca 'dgram' para enviar mensagens UDP
const dgram = require('dgram');

// Defina as informações do servidor WebSocketUDP
const websocketUDPServerHost = 'localhost';
const websocketUDPServerPort = 3000;

// Crie um cliente UDP
const client = dgram.createSocket('udp4');

// Envie uma mensagem UDP
const message = 'Minha mensagem UDP';
client.send(message, websocketUDPServerPort, websocketUDPServerHost, (err) => {
if (err) throw err;
console.log(`Mensagem UDP enviada para o servidor WebSocketUDP: ${message}`);
});
```

Exemplo de configuração para um aplicativo/servidor que usa WebSocket:

```javascript
// Exemplo em JavaScript

// Importe a biblioteca 'websocket' para se conectar ao servidor WebSocketUDP
const WebSocket = require('websocket').w3cwebsocket;

// Defina as informações do servidor WebSocketUDP
const websocketUDPServerUrl = 'ws://localhost:3000';

// Crie uma conexão WebSocket
const client = new WebSocket(websocketUDPServerUrl);

// Trate os eventos da conexão WebSocket
client.onopen = () => {
  console.log('Conexão WebSocket estabelecida com o servidor WebSocketUDP');
  
  // Envie uma mensagem WebSocket
  const message = 'Minha mensagem WebSocket';
  client.send(message);
  console.log(`Mensagem WebSocket enviada para o servidor WebSocketUDP: ${message}`);
};

client.onmessage = (event) => {
  console.log(`Mensagem WebSocket recebida do servidor WebSocketUDP: ${event.data}`);
};

client.onclose = () => {
  console.log('Conexão WebSocket encerrada');
};
```


