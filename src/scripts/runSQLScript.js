const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

const runSQLScript = async () => {
  const filePath = path.join(__dirname, 'init.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  console.log('Iniciando execução do script SQL no Supabase...');
  console.log('Isso pode levar alguns minutos dependendo da complexidade do script.');

  try {
    const commands = sql.split(';').filter(cmd => cmd.trim() !== '');
    for (let i = 0; i < commands.length; i++) {
      const command = commands[i].trim();
      if (command) {
        try {
          await pool.query(command + ';');
          console.log(`Comando ${i+1}/${commands.length} executado com sucesso.`);
        } catch (cmdErr) {
          console.error(`Erro ao executar comando ${i+1}/${commands.length}:`, cmdErr.message);
          console.log('Comando com erro:', command);
        }
      }
    }
    
    console.log('Script SQL executado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err);
  } finally {
    console.log('Operação concluída.');
  }
};

if (require.main === module) {
  runSQLScript().then(() => {
    pool.end();
  });
} else {
  module.exports = runSQLScript;
}
