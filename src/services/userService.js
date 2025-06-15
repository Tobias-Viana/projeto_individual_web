const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepository');

const SALT_ROUNDS = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN_WHITELIST = ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com', 'exemplo.com'];

let nextId = 1;
const usersInMemory = [];

function validarNome(name) {
  if (!name || name.length < 3) {
    throw new Error('Nome deve ter pelo menos 3 caracteres');
  }
}

function validarDominioEmail(email) {
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new Error('Email inválido');
  }
  
  const domain = email.split('@')[1];
  if (!DOMAIN_WHITELIST.includes(domain)) {
    throw new Error(`Domínio de email não permitido. Use um dos seguintes: ${DOMAIN_WHITELIST.join(', ')}`);
  }
}

async function validarEmailUnico(email) {
  try {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }
  } catch (error) {
    if (usersInMemory.some(u => u.email === email)) {
      throw new Error('Email já está em uso');
    }
  }
}

module.exports = {
  async create(payload) {
    validarNome(payload.name);
    validarDominioEmail(payload.email);
    await validarEmailUnico(payload.email);

    try {
      const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
      payload.password = hashedPassword;
      return await userRepo.create(payload);
    } catch (error) {
      const newUser = {
        id: nextId++,
        name: payload.name,
        email: payload.email,
        password: payload.password
      };
      usersInMemory.push(newUser);
      return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
    }
  },

  async list() {
    try {
      return await userRepo.getAllUsers();
    } catch (error) {
      return usersInMemory.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email
      }));
    }
  },

  async detail(id) {
    try {
      return await userRepo.findById(id);
    } catch (error) {
      const user = usersInMemory.find(u => u.id === parseInt(id));
      if (!user) return null;
      
      return {
        id: user.id,
        name: user.name,
        email: user.email
      };
    }
  },

  async update(id, payload) {
    if (payload.name) validarNome(payload.name);
    if (payload.email) {
      validarDominioEmail(payload.email);
      await validarEmailUnico(payload.email, id);
    }
    
    try {
      return await userRepo.update(id, payload);
    } catch (error) {
      const index = usersInMemory.findIndex(u => u.id === parseInt(id));
      if (index === -1) return null;
      
      usersInMemory[index] = {
        ...usersInMemory[index],
        ...payload
      };
      
      return {
        id: usersInMemory[index].id,
        name: usersInMemory[index].name,
        email: usersInMemory[index].email
      };
    }
  },

  async remove(id) {
    try {
      return await userRepo.remove(id);
    } catch (error) {
      const index = usersInMemory.findIndex(u => u.id === parseInt(id));
      if (index === -1) return null;
      
      const removedUser = usersInMemory[index];
      usersInMemory.splice(index, 1);
      
      return {
        id: removedUser.id,
        name: removedUser.name,
        email: removedUser.email
      };
    }
  },

  async authenticate(email, password) {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    try {
      const user = await userRepo.findByEmailWithPassword(email);
      if (!user) return null;

      if (!user.password) throw new Error('Senha do usuário não encontrada no banco');
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) return null;

      return {
        users: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    } catch (error) {
      const user = usersInMemory.find(u => u.email === email);
      if (!user) return null;
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) return null;
      
      return {
        users: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      };
    }
  }
};
