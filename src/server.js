const Hapi = require('@hapi/hapi');
// const routes = require('./route');

const init = aync () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });
    await server.start();
    console.log(`server berjalan ${server.info.uri}`);
}

init();