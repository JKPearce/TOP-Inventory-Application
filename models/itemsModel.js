const pool = require("../db/pool");

async function getAllItems() {
  const { rows } = await pool.query(`
    SELECT
      items.id,
      items.category_id,
      items.manufacturer_id,
      items.name,
      items.model,
      items.sku,
      items.price,
      items.stock_quantity,
      items.is_active,
      categories.name AS category_name,
      manufacturers.name AS manufacturer_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    JOIN manufacturers ON items.manufacturer_id = manufacturers.id
    ORDER BY items.name ASC
  `);

  return rows;
}

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

async function getItemsByManufacturerId(manufacturerId) {
  const { rows } = await pool.query(
    `
    SELECT
      items.id,
      items.category_id,
      items.manufacturer_id,
      items.name,
      items.model,
      items.sku,
      items.description,
      items.price,
      items.stock_quantity,
      items.image_url,
      items.is_active,
      categories.name AS category_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE items.manufacturer_id = $1
    ORDER BY items.name ASC
    `,
    [manufacturerId],
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

async function getItemById(id) {
  const { rows } = await pool.query(
    `
    SELECT
      items.id,
      items.category_id,
      items.manufacturer_id,
      items.name,
      items.model,
      items.sku,
      items.description,
      items.price,
      items.stock_quantity,
      items.image_url,
      items.is_active,
      items.created_at,
      items.updated_at,
      categories.name AS category_name,
      manufacturers.name AS manufacturer_name
    FROM items
    JOIN categories ON items.category_id = categories.id
    JOIN manufacturers ON items.manufacturer_id = manufacturers.id
    WHERE items.id = $1
    `,
    [id],
  );

  return rows[0];
}

module.exports = {
  getItemsByCategoryId,
  createItem,
  getItemById,
  getAllItems,
  getItemsByManufacturerId,
};
