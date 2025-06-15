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
  if (!userId && !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
    window.location.href = '/login';
  }

  const userNameElement = document.getElementById('user-name');
  if (userNameElement) {
    const userName = localStorage.getItem('userName');
    if (userName) {
      userNameElement.textContent = userName;
    }
  }

  if (window.location.pathname === '/tasks' && userId) {
    loadUserTasks(userId);
  }

  if ((window.location.pathname === '/tasks/create' || window.location.pathname.includes('/tasks/edit/')) && userId) {
    loadCategoriesForSelect(userId);
  }
});

async function createTask(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    date_creation: new Date().toISOString(),
    date_delivery: formData.get('date_delivery'),
    status: formData.get('status'),
    category_id: formData.get('category_id') || null,
    users_id: getCurrentUserId()
  };
  
  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    
    if (response.ok) {
      showAlert('success', 'Tarefa criada com sucesso!');
      setTimeout(() => {
        window.location.href = '/tasks';
      }, 1500);
    } else {
      const data = await response.json();
      showAlert('error', data.error || 'Erro ao criar tarefa');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

async function updateTask(event) {
  event.preventDefault();
  
  const form = event.target;
  const taskId = form.dataset.taskId;
  const formData = new FormData(form);
  
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    date_delivery: formData.get('date_delivery'),
    status: formData.get('status'),
    category_id: formData.get('category_id') || null
  };
  
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    
    if (response.ok) {
      showAlert('success', 'Tarefa atualizada com sucesso!');
      setTimeout(() => {
        window.location.href = '/tasks';
      }, 1500);
    } else {
      const data = await response.json();
      showAlert('error', data.error || 'Erro ao atualizar tarefa');
    }
  } catch (error) {
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

async function deleteTask(taskId) {
  if (!confirm('Tem certeza que deseja excluir esta tarefa?')) {
    return;
  }
  
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    });
    
    if (response.ok) {
      showAlert('success', 'Tarefa excluída com sucesso!');
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
        taskElement.remove();
      }
      
      const taskList = document.querySelector('.task-list');
      if (taskList && taskList.children.length === 0) {
        taskList.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
      }
    } else {
      const data = await response.json();
      showAlert('error', data.error || 'Erro ao excluir tarefa');
    }
  } catch (error) {
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

async function loadUserTasks(userId) {
  try {
    const response = await fetch(`/api/tasks/user/${userId}`);
    if (response.ok) {
      const tasks = await response.json();
      renderTasks(tasks);
    } else {
      console.error('Erro ao carregar tarefas');
      renderTasks([]);
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor:', error);
    renderTasks([]);
  }
}

async function loadCategoriesForSelect(userId) {
  try {
    const response = await fetch(`/api/task-categories/user/${userId}`);
    if (response.ok) {
      const categories = await response.json();
      const categorySelect = document.getElementById('category_id');

      if (categorySelect) {
        categorySelect.innerHTML = '<option value="">Sem categoria</option>';

        categories.forEach(category => {
          const option = document.createElement('option');
          option.value = category.id;
          option.textContent = category.name;
          option.style.color = category.color;
          categorySelect.appendChild(option);
        });
      }
    }
  } catch (error) {
    console.error('Erro ao carregar categorias:', error);
  }
}

function renderTasks(tasks) {
  const taskList = document.querySelector('.task-list');
  if (!taskList) return;

  if (tasks.length === 0) {
    taskList.innerHTML = '<p>Nenhuma tarefa encontrada.</p>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <div id="task-${task.id}" class="card task-card ${task.status.replace(' ', '-')}">
      <div class="task-header">
        <h3>${task.title}</h3>
        <span class="task-status status-${task.status.replace(' ', '-')}">${task.status}</span>
      </div>
      <p>${task.description || 'Sem descrição'}</p>
      <p><strong>Data de entrega:</strong> ${new Date(task.date_delivery).toLocaleDateString('pt-BR')}</p>
      <div class="task-actions">
        <a href="/tasks/edit/${task.id}" class="btn">Editar</a>
        <button onclick="deleteTask(${task.id})" class="btn btn-danger">Excluir</button>
      </div>
    </div>
  `).join('');
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
