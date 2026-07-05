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

async function createManufacturer({ name, website_url, country, description }) {
  const { rows } = await pool.query(
    `
    INSERT INTO manufacturers (
      name,
      website_url,
      country,
      description
    )
    VALUES ($1, $2, $3, $4)
    RETURNING id
    `,
    [name, website_url || null, country || null, description || null],
  );

  return rows[0];
}

async function updateManufacturer(
  id,
  { name, website_url, country, description },
) {
  const { rows } = await pool.query(
    `
    UPDATE manufacturers
    SET
      name = $1,
      website_url = $2,
      country = $3,
      description = $4,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING id
    `,
    [name, website_url || null, country || null, description || null, id],
  );

  return rows[0];
}

async function deleteManufacturer(id) {
  const { rows } = await pool.query(
    `
    DELETE FROM manufacturers
    WHERE id = $1
    RETURNING id
    `,
    [id],
  );

  return rows[0];
}

module.exports = {
  getAllManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};
