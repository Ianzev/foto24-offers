const { Pool } = require("pg");

const pool = new Pool({
  user: "Ianzev",
  host: "ep-icy-mode-56066025.eu-central-1.aws.neon.tech",
  database: "Foto24",
  password: "vYjXz8qPnLu6",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
