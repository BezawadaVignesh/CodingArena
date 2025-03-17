import { DataTypes, QueryInterface } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('Contests', 'createdId', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, // Allow NULL temporarily
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn('Problems', 'difficulty', {
        type: DataTypes.ENUM('Easy', 'Medium', 'Hard'),
        allowNull: false,
      });
  
      await queryInterface.addColumn('Problems', 'tags', {
        type: DataTypes.STRING,
        allowNull: false,
      });

    await queryInterface.sequelize.query(
      'UPDATE Contests SET createdId = 1 WHERE createdId IS NULL;'
    );

    await queryInterface.changeColumn('Contests', 'createdId', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // Enforce NOT NULL after updating values
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('Contests', 'createdId');
    await queryInterface.removeColumn('Problems', 'difficulty');
    await queryInterface.removeColumn('Problems', 'tags');
  }
};
