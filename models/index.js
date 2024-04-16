const { Sequelize, DataTypes } = require("sequelize")

const sequelize = new Sequelize('fitness_app', 'root', '0106', {
  dialect: 'mysql',
  host: 'localhost'
})

const User = require("./users")(sequelize, DataTypes)
const Workout = require("./workouts")(sequelize, DataTypes)

User.hasMany(Workout, { foreignKey: 'userId', onDelete: 'CASCADE' });
Workout.belongsTo(User, { foreignKey: 'userId' });

sequelize.sync()
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch(error => {
    console.error("Error synchronizing database:", error);
  });

module.exports = { User, Workout, sequelize }