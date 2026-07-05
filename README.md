# TOP-Inventory-Application
The Odin Project Inventory Application project to solidify Express.js and PostgreSQL skills.

## Project Idea
A PC Parts inventory application where users can browse inventory by category and manage both categories and items with full CRUD functionality.

## Database Plan for PostgreSQL
The database will be centered around two main tables:

- categories: stores the inventory groups such as CPU, GPU, Motherboard, RAM, Storage, Power Supply, Case, Cooling, and Accessories.
- items: stores the individual products that belong to a category.

### 1. categories table
This table holds the top-level product groups.

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. items table
This table holds each inventory item and links it to a category.

```sql
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  category_id INT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(150) NOT NULL,
  brand VARCHAR(100) NOT NULL,
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
```

- sku: unique stock keeping unit used to identify the item in inventory.

### Relationship Summary
- One category can have many items.
- Each item belongs to one category.
- The `category_id` foreign key creates the relationship between the tables.

### Delete Behaviour
Categories cannot be deleted while they still contain items. Items must be deleted or moved to another category first. Individual items can be deleted directly.

### Suggested Category Examples
- CPU
- GPU
- Motherboard
- RAM
- Storage
- Power Supply
- Case
- Cooling
- Monitor
- Accessories

### Useful Index
```sql
CREATE INDEX idx_items_category_id ON items(category_id);
```

### Example Seed Data
```sql
INSERT INTO categories (name, description) VALUES
('CPU', 'Central processing units'),
('GPU', 'Graphics processing units'),
('RAM', 'Memory modules');
```

This structure will support the core app flow:
1. View categories on the home page.
2. Click a category to see all matching items.
3. Create, read, update, and delete both categories and items.

## Routes Plan

### Home
- GET / - show all categories

### Categories
- GET /categories - list all categories
- GET /categories/new - show create category form
- POST /categories/new - create category
- GET /categories/:id - show category and its items
- GET /categories/:id/edit - show edit category form
- POST /categories/:id/edit - update category
- POST /categories/:id/delete - delete category if it has no items

### Items
- GET /items - list all items
- GET /items/new - show create item form
- POST /items/new - create item
- GET /items/:id - show item details
- GET /items/:id/edit - show edit item form
- POST /items/:id/edit - update item
- POST /items/:id/delete - delete item