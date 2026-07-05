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

async function createCategory({ name, description }) {
  const { rows } = await pool.query(
    `
    INSERT INTO categories (
      name,
      description
    )
    VALUES ($1, $2)
    RETURNING id
    `,
    [name, description || null],
  );

  return rows[0];
}

async function updateCategory(id, { name, description }) {
  const { rows } = await pool.query(
    `
    UPDATE categories
    SET
      name = $1,
      description = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING id
    `,
    [name, description || null, id],
  );

  return rows[0];
}

async function deleteCategory(id) {
  const { rows } = await pool.query(
    `
    DELETE FROM categories
    WHERE id = $1
    RETURNING id
    `,
    [id],
  );

  return rows[0];
}

module.exports = {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  createCategory,
};
