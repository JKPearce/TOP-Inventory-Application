const pool = require("../db/pool");

async function getItemsByCategoryId(categoryId) {
  const { rows } = await pool.query(
    `
    SELECT
      items.id,
      items.name,
      items.model,
      items.sku,
      items.description,
      items.price,
      items.stock_quantity,
      items.image_url,
      items.is_active,
      manufacturers.name AS manufacturer_name
    FROM items
    JOIN manufacturers ON items.manufacturer_id = manufacturers.id
    WHERE items.category_id = $1
    ORDER BY items.name ASC
    `,
    [categoryId],
  );

  return rows;
}

async function createItem({
  category_id,
  manufacturer_id,
  name,
  model,
  sku,
  description,
  price,
  stock_quantity,
}) {
  const { rows } = await pool.query(
    `
    INSERT INTO items (
      category_id,
      manufacturer_id,
      name,
      model,
      sku,
      description,
      price,
      stock_quantity
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING id
    `,
    [
      category_id,
      manufacturer_id,
      name,
      model || null,
      sku,
      description || null,
      price,
      stock_quantity,
    ],
  );

  return rows[0];
}

module.exports = {
  getItemsByCategoryId,
  createItem,
};
