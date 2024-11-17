import express from 'express';
import cors from 'cors';
import router from './routes/controutes.js';
// import { addcontactdata, viewContData } from './controllers/contactdata.js';
import bodyParser from 'body-parser';


import db from './config/connectiondb.js'

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database');
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// app.use('/', router);  
// app.use('/', addcontactdata);
// app.use('/', viewContData);

app.post('/addcontactdata',(req, res) => {
    console.log(req.body); // Log the data to check if it's received correctly
    const { firstName, lastName, email, contactNo, company, jobTitle } = req.body;
  
    if (!firstName || !lastName || !email || !contactNo || !company || !jobTitle) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const checkEmailQuery = "SELECT * FROM contacts WHERE email = ?";
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            console.log('Error checking email:', err);
            return res.status(500).json({ message: 'Database error while checking email' });
        }
  
        // If the email already exists, send an error message
        if (result.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }
     
    const query = "INSERT INTO contacts (firstName, lastName, email, contactNo, company, jobTitle) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [firstName, lastName, email, contactNo, company, jobTitle], (err, result) => {
      if (err) {
          console.log('Error inserting data:', err); 
          return res.status(500).json(err);
      }
      return res.send('user contact added successfully')
  });
  })
})
  
    
  app.get('/viewcontactdata', (req, res) => {
    const query = "SELECT id,firstName, lastName, email, contactNo, company, jobTitle FROM contacts";
  
      db.query(query, (err, results) => {
          if (err) {
              console.error("Database Error:", err); 
              return res.status(400).json({ message: "Bad Request", error: err });
          }
        
          res.status(200).json(results);
      });
  })  

  //axios.put(`http://localhost:8080/contacts/${id}`)
    app.put("/contacts/:id", (req, res) => {

        console.log(req.body) //check kro print ho raha hai kya
   const { id } = req.params;
    const { firstName, lastName, email, contactNo, company, jobTitle } = req.body;
    const query = "UPDATE contacts SET firstName = ?, lastName = ?, email = ?, contactNo= ?, company = ?, jobTitle = ? WHERE id = ?";
    db.query(query, [firstName, lastName, email, contactNo, company, jobTitle, id], (err) => {
      if (err){
       console.log(err)
        return res.status(500).json(err)
        }
      res.json({ message: "Contact updated successfully" });
    });
   });

    app.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM contacts WHERE id = ?";
    db.query(query, [id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Contact deleted successfully" });
    });
  });


app.listen(8080,()=>{
    console.log('Hii server is running at: http://localhost:8080/')
})