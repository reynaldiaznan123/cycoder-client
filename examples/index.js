// const { Client } = require('../dist');
// const client = new Client({
//     host: 'http://localhost:3000',
//     transportOptions: {
//         polling: {
//             extraHeaders: {
//                 'X-App-Id': '6e868125-dfe0-4e70-b476-9391e1ec1748',
//                 'X-App-Secret': 'abcdefghijklmnopqrstuvwxyzdadaaa'
//             }
//         }
//     }
// });

// console.log(client.id());

const { io } = require('socket.io-client');
const connector = io('http://localhost:3001', {
    transportOptions: {
        polling: {
            extraHeaders: {
                'X-App-Id': '6e868125-dfe0-4e70-b476-9391e1ec1748',
                'X-App-Secret': 'abcdefghijklmnopqrstuvwxyzdadaaa'
            }
        }
    }
});

connector.on('connection', (socket) => {
    console.log(socket.id);

    connector.disconnect();
});
