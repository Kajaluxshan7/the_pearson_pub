module.exports = {
  apps: [
    {
      name: "pearson-pub-frontend",
      script: ".output/server/index.mjs",
      cwd: "/var/www/thepearsonpubwhitby.ca",
      instances: "max", // Use all available CPU cores
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        NITRO_PORT: 3000,
        NITRO_HOST: "0.0.0.0",
        NUXT_PUBLIC_API_BASE_URL: "https://api.thepearsonpubwhitby.ca",
        NUXT_PUBLIC_SITE_URL: "https://www.thepearsonpubwhitby.ca",
        NUXT_PUBLIC_APP_NAME: "The Pearson Pub",
        NUXT_PUBLIC_APP_DESCRIPTION:
          "A traditional pub atmosphere with modern amenities in Whitby",
      },
      // Environment variables for email service
      env_production: {
        NODE_ENV: "production",
        NITRO_PORT: 3000,
        NITRO_HOST: "0.0.0.0",
        NUXT_PUBLIC_API_BASE_URL: "https://api.thepearsonpubwhitby.ca",
        NUXT_PUBLIC_SITE_URL: "https://www.thepearsonpubwhitby.ca",
        NUXT_SMTP_HOST: "smtp.gmail.com",
        NUXT_SMTP_PORT: "587",
        NUXT_SMTP_USER: process.env.NUXT_SMTP_USER,
        NUXT_SMTP_PASS: process.env.NUXT_SMTP_PASS,
        NUXT_CONTACT_EMAIL: "contact@thepearsonpubwhitby.ca",
      },
      // Monitoring and restart policies
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      restart_delay: 4000,
      max_restarts: 3,
      min_uptime: "10s",

      // Logging
      log_file: "./logs/pearson-pub-combined.log",
      out_file: "./logs/pearson-pub-out.log",
      error_file: "./logs/pearson-pub-error.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,

      // Process management
      kill_timeout: 5000,
      listen_timeout: 10000,

      // Health check
      health_check_grace_period: 10000,

      // Advanced configurations
      node_args: "--max-old-space-size=2048",

      // Custom deployment settings
      post_update: ["npm install", "npm run build"],

      // Environment-specific overrides
      env_staging: {
        NODE_ENV: "staging",
        NITRO_PORT: 3001,
        NUXT_PUBLIC_API_BASE_URL: "https://staging-api.thepearsonpubwhitby.ca",
        NUXT_PUBLIC_SITE_URL: "https://staging.thepearsonpubwhitby.ca",
      },
    },
  ],

  // Deployment configuration
  deploy: {
    production: {
      user: "deploy",
      host: ["your-production-server.com"],
      ref: "origin/main",
      repo: "git@github.com:Kajaluxshan7/the_pearson_pub.git",
      path: "/var/www/thepearsonpubwhitby.ca",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.cjs --env production",
      "pre-setup": "mkdir -p /var/www/thepearsonpubwhitby.ca/logs",
    },
    staging: {
      user: "deploy",
      host: ["your-staging-server.com"],
      ref: "origin/develop",
      repo: "git@github.com:Kajaluxshan7/the_pearson_pub.git",
      path: "/var/www/staging.thepearsonpubwhitby.ca",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.cjs --env staging",
    },
  },
};
