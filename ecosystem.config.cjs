module.exports = {

  apps: [{

    name: 'the-pearson-pub',

    script: './.output/server/index.mjs',

    instances: 'max', // Use all CPU cores

    exec_mode: 'cluster',

    node_args: '--max-old-space-size=2048',

    env_production: {

      NODE_ENV: 'production',

      PORT: 3000,

      EMAIL_USER: process.env.SMTP_USER,

      EMAIL_PASSWORD: process.env.SMTP_PASS,

      CONTACT_EMAIL: process.env.CONTACT_EMAIL

    }

  }]

}