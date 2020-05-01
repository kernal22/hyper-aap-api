const config = {
    SECRET: 'my secret key',
    SALT_ROUNDS: 10,
    CLIENT_TOKEN_EXPIRES_IN: '1h',

    development: {
        "username": "root",
        "password": "",
        "database": "arjunphp_node_rest",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    production: {
        "username": "root",
        "password": "",
        "database": "arjunphp_node_rest",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}

export default config;