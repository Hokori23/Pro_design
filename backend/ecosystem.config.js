module.exports = {
  apps: [
    {
      name: 'hokori_life_backend',
      script: 'npm',
      args: 'run serve',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
