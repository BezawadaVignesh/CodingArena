import {
  DataTypes,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model
} from "sequelize";
import { sequelize } from "../common";
import { User } from "./user.model";

class Standings extends Model {
  declare id: number;
  declare name: string;
  declare leetcodeUsername: string;
  declare leetcodeProbSolved: number;
  declare leetcodeRating: number;
  declare leetcodeScore: number;
  declare codechefUsername: string;
  declare codechefProbSolved: number;
  declare codechefRating: number;
  declare codechefScore: number;
  declare codeforcesUsername: string;
  declare codeforcesProbSolved: number;
  declare codeforcesRating: number;
  declare codeforcesScore: number;
  declare totalScore: number;
  declare getUser: HasOneGetAssociationMixin<User>;
  declare setUser: HasOneSetAssociationMixin<User, number>;

  static associate() {
    Standings.belongsTo(User, { foreignKey: "userId", as: "user" });
  }
}

Standings.init(
  {
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
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "Standings",
    tableName: "standings",
  }
);

// Association
Standings.belongsTo(User)

export { Standings };
