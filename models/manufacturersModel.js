const pool = require("../db/pool");

async function getAllManufacturers() {
  const { rows } = await pool.query(`
    SELECT id, name, website_url, country, description, created_at, updated_at
    FROM manufacturers
    ORDER BY name ASC
  `);

  return rows;
}

async function getManufacturerById(id) {
  const { rows } = await pool.query(
    `
    SELECT id, name, website_url, country, description, created_at, updated_at
    FROM manufacturers
    WHERE id = $1
    `,
    [id],
  );

  return rows[0];
}

module.exports = {
  getAllManufacturers,
  getManufacturerById,
};
