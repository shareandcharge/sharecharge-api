import server from './server';

const port = parseInt(process.env.PORT || '3000');
const host = process.env.HOST || '127.0.0.1';

server(host, port);
