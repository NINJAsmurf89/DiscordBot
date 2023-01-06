import * as fs from 'fs/promises';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite3',
});

const models = await fs.readdir('sequelize/models');

models.forEach(async (file) => {
  const { default: init } = await import(`./models/${file}`);
  const model = init(sequelize);
  await model.sync({ alter: true });
});

export default sequelize;
