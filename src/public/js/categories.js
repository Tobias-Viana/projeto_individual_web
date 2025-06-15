function getCurrentUserId() {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/login';
    return null;
  }
  return parseInt(userId);
}

// Verificar autenticação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  const userId = getCurrentUserId();
  if (!userId && !window.location.pathname.includes('/login')) {
    window.location.href = '/login';
    return;
  }

  // Atualizar nome do usuário no header, se existir
  const userNameElement = document.getElementById('user-name');
  if (userNameElement) {
    const userName = localStorage.getItem('userName');
    if (userName) {
      userNameElement.textContent = userName;
    }
  }

  // Carregar categorias do usuário se estivermos na página de categorias
  if (window.location.pathname === '/categories' && userId) {
    loadUserCategories(userId);

    // Configurar o seletor de cor
    const colorPicker = document.getElementById('color');
    const colorPreview = document.querySelector('.color-preview');

    if (colorPicker && colorPreview) {
      colorPicker.addEventListener('input', function() {
        colorPreview.style.backgroundColor = this.value;
      });
    }
  }
});

// Função para carregar categorias do usuário
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

// Função para renderizar as categorias na página
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

// Função para mostrar o formulário de categoria
function showCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  const form = document.getElementById('category-form');

  // Limpar o formulário
  form.reset();
  form.removeAttribute('data-category-id');

  // Atualizar título
  const title = formContainer.querySelector('h3');
  title.textContent = 'Nova Categoria';

  // Mostrar o formulário
  formContainer.style.display = 'block';
  formContainer.scrollIntoView({ behavior: 'smooth' });
}

// Função para esconder o formulário de categoria
function hideCategoryForm() {
  const formContainer = document.getElementById('category-form-container');
  formContainer.style.display = 'none';
}

// Função para criar categoria
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
      // Editar categoria existente
      response = await fetch(`/api/task-categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
      });
    } else {
      // Criar nova categoria
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

// Função para editar categoria
async function editCategory(categoryId) {
  try {
    const response = await fetch(`/api/task-categories/${categoryId}`);
    if (response.ok) {
      const category = await response.json();

      // Preencher o formulário com os dados da categoria
      const form = document.getElementById('category-form');
      const formContainer = document.getElementById('category-form-container');

      form.setAttribute('data-category-id', categoryId);
      form.querySelector('#name').value = category.name;
      form.querySelector('#description').value = category.description || '';

      // Se houver campo de cor, preencher
      const colorField = form.querySelector('#color');
      const colorPreview = form.querySelector('.color-preview');
      if (colorField) {
        colorField.value = category.color || '#3b82f6';
        if (colorPreview) {
          colorPreview.style.backgroundColor = category.color || '#3b82f6';
        }
      }

      // Atualizar título
      const title = formContainer.querySelector('h3');
      title.textContent = 'Editar Categoria';

      // Mostrar o formulário
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

// Função para excluir categoria
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

// Função para exibir alertas
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