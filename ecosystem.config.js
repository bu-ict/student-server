module.exports = {
    apps: [{
      name: 'studentsserver',
      script: '/opt/bitnami/projects/studentsserver/server.js',
      env: {
        NODE_ENV: 'development',
        DB_NAME: 'BUSYSTEM',
        DB_USER:'sa',
        DB_PASSWORD:'BUAdmin123',
        DB_SERVER: '154.73.26.12',
        PORT:'1433',
      },
      env_production: {
        NODE_ENV: 'production',
        DB_NAME: 'BUSYSTEM',
        DB_USER:'sa',
        DB_PASSWORD:'BUAdmin123',
        DB_SERVER: '154.73.26.12',
        PORT:'1433',
      }
    }]
  };
  