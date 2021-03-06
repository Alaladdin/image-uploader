require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'image-uploader',
      script: './build/index.js',
      watch: true,
      ignore_watch: ['node_modules', 'build/public/uploads'],
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    // "production" is the environment name
    production: {
      key: process.env.DEPLOY_PUBLIC_KEY,
      user: process.env.DEPLOY_USER,
      host: [{
        host: process.env.DEPLOY_HOST,
        port: process.env.DEPLOY_PORT,
      }],
      // ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/main',
      repo: 'https://github.com/Alaladdin/image-uploader',
      path: '$HOME/dev/image-uploader',
      'post-deploy': 'pnpm install; pm2 restart ./ecosystem.config.js --env production',
    },
  },
};
