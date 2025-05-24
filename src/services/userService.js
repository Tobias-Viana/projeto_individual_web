const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepository');

const SALT_ROUNDS = 10;
const DOMINIOS_PERMITIDOS = ['usuario.com', 'exemplo.com'];
const NOMES_RESERVADOS = new Set(['admin', 'root', 'system']);

function validarNome(nome) {
  if (NOMES_RESERVADOS.has(nome.toLowerCase())) {
    throw new Error('Nome de usuário reservado.');
  }
}

function validarDominioEmail(email) {
  const dominio = email.split('@')[1]?.toLowerCase();
  if (!DOMINIOS_PERMITIDOS.includes(dominio)) {
    throw new Error(`Domínio de e-mail não permitido: ${dominio}`);
  }
}

async function validarEmailUnico(email, ignorarId = null) {
  const user = await userRepo.findByEmailWithPassword(email);
  if (user && user.id !== ignorarId) {
    throw new Error('E-mail já cadastrado.');
  }
}

module.exports = {
  async create(payload) {
    validarNome(payload.name);
    validarDominioEmail(payload.email);
    await validarEmailUnico(payload.email);

    const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);
    payload.password = hashedPassword;

    return userRepo.create(payload);
  },

  async list() {
    return userRepo.findAll();
  },

  async detail(id) {
    return userRepo.findById(id);
  },

  async update(id, payload) {
    if (payload.name) validarNome(payload.name);
    if (payload.email) {
      validarDominioEmail(payload.email);
      await validarEmailUnico(payload.email, id);
    }
    return userRepo.update(id, payload);
  },

  async remove(id) {
    return userRepo.remove(id);
  },

  async verifyUserPassword(email, password) {
  if (!password) throw new Error('Senha não informada');

  const user = await userRepo.findByEmailWithPassword(email);
  if (!user) return null;

  if (!user.password) throw new Error('Senha do usuário não encontrada no banco');

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return {
    message: 'Login realizado com sucesso!',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
}
};
