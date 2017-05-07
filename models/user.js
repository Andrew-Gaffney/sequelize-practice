const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice');

const User = db.define('user', {
// YOUR CODE HERE...

first: Sequelize.STRING,

last: Sequelize.STRING,

age: {
  type: Sequelize.INTEGER,
  validate: {
    min: 18
  }
},

email: {
  type: Sequelize.STRING,
  allowNull: false
},

bio: Sequelize.TEXT

}, {
// ...AND HERE
getterMethods: {
  fullName: function(){
    return this.getDataValue('first') + ' ' + this.getDataValue('last');
  }
},

instanceMethods: {

  haveBirthday: function() {
    return new Sequelize.Promise((resolve, reject) => {
      this.setDataValue('age', this.getDataValue('age') + 1)
      resolve(this.save());
    });
  }
}

});
module.exports = User;
