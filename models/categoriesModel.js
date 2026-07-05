const pool = require("../db/pool");

async function getAllCategories() {
  const { rows } = await pool.query(`
    SELECT id, name, description, created_at, updated_at
    FROM categories
    ORDER BY name ASC
  `);

  return rows;
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    `
    SELECT id, name, description, created_at, updated_at
    FROM categories
    WHERE id = $1
    `,
    [id],
  );

  return rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
};
