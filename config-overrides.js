module.exports = function override(config, env) {
    config.devServer = {
        ...config.devServer,
        port: 3001,                     
        allowedHosts: ['localhost']      
    };
    return config;
};
