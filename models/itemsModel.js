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

module.exports = {
  getItemsByCategoryId,
};
