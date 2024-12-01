'use strict';
import { DataTypes, QueryInterface } from 'sequelize';
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('standings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      leetcodeUsername: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      leetcodeProbSolved: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      leetcodeRating: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      leetcodeScore: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codechefUsername: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      codechefProbSolved: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codechefRating: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codechefScore: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codeforcesUsername: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      codeforcesProbSolved: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codeforcesRating: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      codeforcesScore: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      totalScore: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('standings');
  },
};
