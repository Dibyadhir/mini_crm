import db from '../config/connectiondb.js';



export const addcontactdata = (req, res) => {
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
};

  
export const viewContData = (req, res) => {
  const query = "SELECT firstName, lastName, email, contactNo, company, jobTitle FROM contacts";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(400).json({ message: "Bad Request", error: err });
        }
        res.status(200).json(results);
    });
};
  
//   app.put("/contacts/:id", (req, res) => {
//     const { id } = req.params;
//     const { firstName, lastName, email, phone, company, jobTitle } = req.body;
//     const query = "UPDATE contacts SET firstName = ?, lastName = ?, email = ?, phone = ?, company = ?, jobTitle = ? WHERE id = ?";
//     db.query(query, [firstName, lastName, email, phone, company, jobTitle, id], (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Contact updated successfully" });
//     });
//   });
  
//   app.delete("/contacts/:id", (req, res) => {
//     const { id } = req.params;
//     const query = "DELETE FROM contacts WHERE id = ?";
//     db.query(query, [id], (err) => {
//       if (err) return res.status(500).json(err);
//       res.json({ message: "Contact deleted successfully" });
//     });
//   });