DROP TABLE IF EXISTS task_categories CASCADE;

CREATE TABLE IF NOT EXISTS user_task_categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6', 
  users_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(name, users_id)
  );

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS category_id INTEGER REFERENCES user_task_categories(id) ON DELETE SET NULL;

INSERT INTO user_task_categories (name, description, color, users_id)
SELECT 'Trabalho', 'Tarefas relacionadas ao trabalho', '#ef4444', id
FROM users
WHERE NOT EXISTS (
  SELECT 1 FROM user_task_categories
  WHERE name = 'Trabalho' AND users_id = users.id
);

INSERT INTO user_task_categories (name, description, color, users_id)
SELECT 'Pessoal', 'Tarefas pessoais e domésticas', '#10b981', id
FROM users
WHERE NOT EXISTS (
  SELECT 1 FROM user_task_categories
  WHERE name = 'Pessoal' AND users_id = users.id
);

INSERT INTO user_task_categories (name, description, color, users_id)
SELECT 'Estudos', 'Tarefas relacionadas aos estudos', '#8b5cf6', id
FROM users
WHERE NOT EXISTS (
  SELECT 1 FROM user_task_categories
  WHERE name = 'Estudos' AND users_id = users.id
);
