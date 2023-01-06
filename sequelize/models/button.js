import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('button', {
  message_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});
