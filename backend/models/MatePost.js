const Sequelize = require("sequelize");

class MatePost extends Sequelize.Model {
  // 스태틱 메소드
  // 테이블에 대한 설정
  static init(sequelize) {
    return super.init(
      {
        // 첫번째 객체 인수는 테이블 필드에 대한 설정
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        info: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        startDate: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        endDate: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "MatePost",
        tableName: "matePost",
        freezeTableName: true,
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.MatePost.belongsToMany(db.User, {
      foreignKey: "MatePost_id",
      through: "matePost_user_join",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    db.MatePost.hasMany(db.Chat, {
      foreignKey: "MatePost_id",
      sourceKey: "id",
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  }
}

module.exports = MatePost;
