const pool = require("../db/pool");

async function getAllManufacturers() {
  const { rows } = await pool.query(`
    SELECT id, name, website_url, country, description
    FROM manufacturers
    ORDER BY name ASC
  `);

  return rows;
}

module.exports = {
  getAllManufacturers,
};
