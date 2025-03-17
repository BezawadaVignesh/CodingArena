import {
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  HasManyAddAssociationMixin, HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyRemoveAssociationMixin,
  Model
} from 'sequelize';
import { sequelize } from '../common';
import { Problem } from './problem.model';
import { Room } from './room.model';
import { User } from './user.model';

export enum ContestState {
  MANUAL = 'manual',
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  END = 'end',
  MANUALACTIVE = 'manualactive',
}

class Contest extends Model {
  declare id: number;
  declare createdId: number;
  declare state: 'manual' | 'inactive' | 'active' | 'end' | 'manualactive';
  declare startTime: Date;
  declare endTime: Date;
  declare title: string;

  declare hasRoom:  HasManyHasAssociationMixin<Room, number>;
  declare getRooms: HasManyGetAssociationsMixin<Room>;
  declare getUsers: HasManyGetAssociationsMixin<User>;
  declare getProblems: HasManyGetAssociationsMixin<Problem>;
  declare hasUser: HasManyHasAssociationMixin<User, number>;
  declare addUser: HasManyAddAssociationMixin<User, number>;
  declare removeUser: HasManyRemoveAssociationMixin<User, number>;
  declare addUsers: HasManyAddAssociationsMixin<User, number>;
  declare addProblem: HasManyAddAssociationMixin<Problem, number>;
  declare addProblems: HasManyAddAssociationsMixin<Problem, number>;
  declare createProblem: HasManyCreateAssociationMixin<Problem, 'contestId'>;
  declare countUsers: HasManyCountAssociationsMixin;

  // Relationship with User (Creator)
  declare getCreator: BelongsToGetAssociationMixin<User>;
  declare setCreator: BelongsToSetAssociationMixin<User, number>;
  declare createCreator: BelongsToCreateAssociationMixin<User>;

  static associate(models: any) {
    Contest.belongsTo(models.User, { foreignKey: 'createdId', as: 'creator' });
  }
}

Contest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    createdId: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    state: {
      type: DataTypes.ENUM(...Object.values(ContestState)),
      allowNull: false,
    },
    startTime: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    endTime: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Contest',
    tableName: 'contests',
  }
);

class UserContest extends Model {
  declare id: number;
  declare score: number;
  declare end: boolean;
}

UserContest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    score: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
    },
    end: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, { sequelize }
)

export { Contest, UserContest };

