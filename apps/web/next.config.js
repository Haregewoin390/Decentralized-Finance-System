// const nodeExternals = require('webpack-node-externals');

module.exports = {
    reactStrictMode: true,
    transpilePackages: ["packages"],
    experimental: { appDir: true },
    // webpack: (config, { isServer }) => {
        
    //       config.externals = [nodeExternals()];
        
    
    //     return config;
    //   },
};