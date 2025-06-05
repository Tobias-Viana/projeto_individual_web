// Função para criar uma nova tarefa
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
    user_id: 1 // Por enquanto, vamos usar um ID fixo
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
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

// Função para atualizar uma tarefa
async function updateTask(event) {
  event.preventDefault();
  
  const form = event.target;
  const taskId = form.dataset.taskId;
  const formData = new FormData(form);
  
  const task = {
    title: formData.get('title'),
    description: formData.get('description'),
    date_delivery: formData.get('date_delivery'),
    status: formData.get('status')
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

// Função para excluir uma tarefa
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
      // Remover o elemento da tarefa da página
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
        taskElement.remove();
      }
      
      // Se não houver mais tarefas, mostrar mensagem
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

// Função para mostrar alertas
function showAlert(type, message) {
  const alertContainer = document.getElementById('alert-container');
  if (!alertContainer) return;
  
  const alertDiv = document.createElement('div');
  alertDiv.className = type === 'error' ? 'alert alert-danger' : 'alert alert-success';
  alertDiv.textContent = message;
  
  alertContainer.innerHTML = '';
  alertContainer.appendChild(alertDiv);
  
  // Remover alerta após 3 segundos
  setTimeout(() => {
    alertDiv.remove();
  }, 3000);
}