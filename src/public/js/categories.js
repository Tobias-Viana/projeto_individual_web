function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/login';
    return null;
  }
  return parseInt(userId);
}

document.addEventListener('DOMContentLoaded', function() {
  const userId = getCurrentUserId();
  if (!userId && !window.location.pathname.includes('/login')) {
    window.location.href = '/login';
    return;
  }

  const userNameElement = document.getElementById('user-name');
  if (userNameElement) {
    const userName = localStorage.getItem('userName');
    if (userName) {
      userNameElement.textContent = userName;
    }
  }

  if (window.location.pathname === '/categories' && userId) {
    loadUserCategories(userId);

    const colorPicker = document.getElementById('color');
    const colorPreview = document.querySelector('.color-preview');

    if (colorPicker && colorPreview) {
      colorPicker.addEventListener('input', function() {
        colorPreview.style.backgroundColor = this.value;
      });
    }
  }
});

async function loadUserCategories(userId) {
  try {
    const response = await fetch(`/api/task-categories/user/${userId}`);
    if (response.ok) {
      const categories = await response.json();
      renderCategories(categories);
    } else {
      console.error('Erro ao carregar categorias');
      renderCategories([]);
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    renderCategories([]);
  }
}

function renderCategories(categories) {
  const categoryGrid = document.querySelector('.dashboard-grid');
  if (!categoryGrid) return;

  if (categories.length === 0) {
    categoryGrid.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
    return;
  }

  categoryGrid.innerHTML = categories.map(category => `
    <div id="category-${category.id}" class="dashboard-card category-card" style="border-left: 4px solid ${category.color}">
      <h3>${category.name}</h3>
      <p>${category.description || 'Sem descrição'}</p>
      <div class="category-color" style="background-color: ${category.color}"></div>
      <div class="task-actions">
        <button onclick="editCategory(${category.id})" class="btn">Editar</button>
        <button onclick="deleteCategory(${category.id})" class="btn btn-danger">Excluir</button>
      </div>
    </div>
  `).join('');
}

function showCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  const form = document.getElementById('category-form');

  form.reset();
  form.removeAttribute('data-category-id');

  const title = formContainer.querySelector('h3');
  title.textContent = 'Nova Categoria';

  formContainer.style.display = 'block';
  formContainer.scrollIntoView({ behavior: 'smooth' });
}

function hideCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  formContainer.style.display = 'none';
}

async function createCategory(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const categoryId = form.getAttribute('data-category-id');

  const category = {
    name: formData.get('name'),
    description: formData.get('description'),
    color: formData.get('color') || '#3b82f6',
    users_id: getCurrentUserId()
  };

  try {
    let response;
    if (categoryId) {
      response = await fetch(`/api/task-categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
    } else {
      response = await fetch('/api/task-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
    }

    if (response.ok) {
      const action = categoryId ? 'atualizada' : 'criada';
      showAlert('success', `Categoria ${action} com sucesso!`);
      hideCategoryForm();
      loadUserCategories(getCurrentUserId());
    } else {
      const data = await response.json();
      showAlert('error', data.error || 'Erro ao salvar categoria');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

async function editCategory(categoryId) {
  try {
    const response = await fetch(`/api/task-categories/${categoryId}`);
    if (response.ok) {
      const category = await response.json();

      const form = document.getElementById('category-form');
      const formContainer = document.getElementById('category-form-container');

      form.setAttribute('data-category-id', categoryId);
      form.querySelector('#name').value = category.name;
      form.querySelector('#description').value = category.description || '';

      const colorField = form.querySelector('#color');
      const colorPreview = form.querySelector('.color-preview');
      if (colorField) {
        colorField.value = category.color || '#3b82f6';
        if (colorPreview) {
          colorPreview.style.backgroundColor = category.color || '#3b82f6';
        }
      }

      const title = formContainer.querySelector('h3');
      title.textContent = 'Editar Categoria';

      formContainer.style.display = 'block';
      formContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
      showAlert('error', 'Erro ao carregar dados da categoria');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

async function deleteCategory(categoryId) {
  if (!confirm('Tem certeza que deseja excluir esta categoria? As tarefas associadas não serão excluídas, mas perderão a categoria.')) {
    return;
  }

  try {
    const response = await fetch(`/api/task-categories/${categoryId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      showAlert('success', 'Categoria excluída com sucesso!');
      const categoryElement = document.getElementById(`category-${categoryId}`);
      if (categoryElement) {
        categoryElement.remove();
      }

      const categoryGrid = document.querySelector('.dashboard-grid');
      if (categoryGrid && categoryGrid.children.length === 0) {
        categoryGrid.innerHTML = '<p>Nenhuma categoria encontrada.</p>';
      }
    } else {
      const data = await response.json();
      showAlert('error', data.error || 'Erro ao excluir categoria');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

function showAlert(type, message) {
  const alertContainer = document.getElementById('alert-container');
  if (!alertContainer) return;

  const alertDiv = document.createElement('div');
  alertDiv.className = type === 'error' ? 'alert alert-danger' : 'alert alert-success';
  alertDiv.textContent = message;

  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}