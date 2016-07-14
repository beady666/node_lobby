var pgp = require('pg-promise')(/*initialization options go here*/);
var bcrypt = require('bcryptjs');

// DB_URL should be set in shell ENV where app runs, e.g.
// $ export DB_URL=postgres://game_admin:password@localhost:5432/game
var connectionString = process.env.DB_URL; 
var db = pgp(connectionString);

module.exports.createUser = function(username, password, callback) {
  //bcryptjs concatenates salt and hashed password into one string (no need to store salt separately)
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      db.none('insert into users (username, password) values ($1, $2)', [username, hash])
        .then(function() {
          callback(null, username);
        })
        .catch(function(err) {
          callback(err, username);
        });

    });
  });
}

module.exports.getUserByUsername = function(username, callback) {
  db.one('select * from users where username = $1', [username])
    .then(function(data) {
      //console.log('user data: ' + data.userid + ':' + data.username);
      callback(null, data);
    })
    .catch(function(err) {
      callback(err, username);
    });
};

module.exports.getUserById = function(id, callback) {
  db.one('select * from users where userid = $1', [id])
    .then(function(data) {
      callback(null, data);
    })
    .catch(function(err) {
      callback(err, id);
    });
};

module.exports.comparePassword = function(inPassword, hash, callback) {
  bcrypt.compare(inPassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};



