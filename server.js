/********************************************************************************
* BTI425 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Eleana Mita Student ID: 173682220 Date: 15/01/2025
*
* Published URL: https://assignment1-bti-425-kappa.vercel.app/
*
********************************************************************************/

const express = require('express');
const app = express();
const cors = require('cors');
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
require('dotenv').config();
  

const PORT = process.env.MONGODB_CONN_STRING || 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error starting server:', err);
  }); 


  app.post('/api/listings', (req, res) => {
    const newListingData = req.body; 
    
    db.addNewListing(newListingData)
      .then(newListing => {
        res.status(201).json(newListing); 
      })
      .catch(err => {
        res.status(500).json({ error: err.message }); // Handle any errors
      });
  });
  
  app.get('/api/listings', (req, res) => {
    const { page = 1, perPage = 5, name } = req.query; 
    
    db.getAllListings(page, perPage, name)
      .then(listings => {
        res.json(listings); 
      })
      .catch(err => {
        res.status(500).json({ error: err.message }); // Handle errors
      });
  });
  
  app.get('/api/listings/:id', async (req, res) => {
    const { id } = req.params; // Get the listing ID from the URL parameter


    
    db.getListingById(id)
      .then(listing => {
        if (listing) {
          res.json(listing); 
        } else {
          res.status(404).json({ error: "Listing not found" }); // Handle case where listing is not found
        }
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });

  });
  
  app.put('/api/listings/:id', (req, res) => {
    const updatedData = req.body; // Get the updated data from the request body
  
    db.updateListingById(updatedData, req.params.id)
      .then(result => {
        res.json({ message: "Listing updated", result });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  app.delete('/api/listings/:id', (req, res) => {
    const { id } = req.params; // Get the listing ID from the URL
    
    db.deleteListingById(id)
      .then(result => {
        res.json({ message: "Listing deleted", result });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });



// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
