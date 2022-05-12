const mysql = require('mysql');


// Connection Pool

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});


// View book
exports.view = (req, res) => {
  connection.query('SELECT * FROM book ORDER BY year DESC', (err, rows) => {
    
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from book table: \n', rows);
  });
}




// ADD BOOK AREA_______________________________________________________________________________________________
exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { name, book, year, type } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO book SET name = ?, book=?, year = ?, type = ?', [name, book, year, type], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'Book added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from book table: \n', rows);
  });
}




// EDIT BOOK AREA _____________________________________________________________________________________________
exports.edit = (req, res) => {
    
  connection.query('SELECT * FROM book WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from book table: \n', rows);
  });
}

// Update book
exports.update = (req, res) => {
  const { name, book, year, type } = req.body;
  
  connection.query('UPDATE book SET name = ?, year = ?, type = ? WHERE id = ?', [name, book, year, type, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM book WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from book table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from book table: \n', rows);
  });
}










// Find book by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  
  connection.query('SELECT * FROM book WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from book table: \n', rows);
  });
}






// Delete User
exports.delete = (req, res) => {

  connection.query('DELETE FROM book WHERE id = ?', [req.params.id], (err, rows) => {

    if(!err) {
      res.redirect('/');
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);

  });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM book WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}