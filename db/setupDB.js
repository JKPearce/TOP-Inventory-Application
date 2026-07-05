const pool = require("./pool");

const SQL = `
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS manufacturers;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE manufacturers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  website_url TEXT,
  country VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  manufacturer_id INT NOT NULL REFERENCES manufacturers(id) ON DELETE RESTRICT,
  name VARCHAR(150) NOT NULL,
  model VARCHAR(100),
  sku VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00 CHECK (price >= 0),
  stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_items_category_id ON items(category_id);
CREATE INDEX idx_items_manufacturer_id ON items(manufacturer_id);

INSERT INTO categories (name, description) VALUES
('CPU', 'Central processing units'),
('GPU', 'Graphics processing units'),
('RAM', 'Memory modules'),
('Motherboard', 'Main circuit boards for PC builds'),
('Storage', 'SSDs, hard drives, and storage devices'),
('Power Supply', 'Power supply units'),
('Case', 'PC cases and chassis'),
('Cooling', 'CPU coolers, case fans, and cooling parts'),
('Monitor', 'Displays and monitors'),
('Accessories', 'General PC accessories');

INSERT INTO manufacturers (name, website_url, country, description) VALUES
('AMD', 'https://www.amd.com', 'United States', 'CPU and GPU manufacturer'),
('Intel', 'https://www.intel.com', 'United States', 'CPU and hardware manufacturer'),
('NVIDIA', 'https://www.nvidia.com', 'United States', 'GPU and AI hardware manufacturer'),
('ASUS', 'https://www.asus.com', 'Taiwan', 'PC components and hardware manufacturer'),
('MSI', 'https://www.msi.com', 'Taiwan', 'PC components and hardware manufacturer'),
('Corsair', 'https://www.corsair.com', 'United States', 'Memory, power supplies, cases, and peripherals'),
('Samsung', 'https://www.samsung.com', 'South Korea', 'Storage, memory, and electronics manufacturer');
`;

async function main() {
  console.log("Setting up database...");
  await pool.query(SQL);
  console.log("Database setup complete.");
  await pool.end();
}

main();
