// Função para login do usuário
async function loginUser(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const userData = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  
  try {
    console.log('Enviando dados de login:', userData);
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    console.log('Resposta do servidor:', data);
    
    if (response.ok) {
      // Salvar o token e ID do usuário no localStorage
      localStorage.setItem('userId', data.users.id);
      localStorage.setItem('userName', data.users.name);
      
      showAlert('success', 'Login realizado com sucesso!');
      setTimeout(() => {
        window.location.href = '/tasks';
      }, 1500);
    } else {
      showAlert('error', data.error || 'Erro ao fazer login');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

// Função para cadastro do usuário
async function registerUser(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  const userData = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password')
  };
  
  try {
    console.log('Enviando dados de cadastro:', userData);
    
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    const data = await response.json();
    console.log('Resposta do servidor:', data);
    
    if (response.ok) {
      showAlert('success', 'Cadastro realizado com sucesso!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } else {
      showAlert('error', data.error || 'Erro ao cadastrar');
    }
  } catch (error) {
    console.error('Erro:', error);
    showAlert('error', 'Erro ao conectar com o servidor');
  }
}

// Função para logout
function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  window.location.href = '/login';
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
