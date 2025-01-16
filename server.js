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
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require('express');
const app = express();
const cors = require('cors');
const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();
require('dotenv').config();

const PORT = 8080;


app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

db.initialize('mongodb+srv://emita:7Vo4YTn1QjtPotE7@cluster1.smd1k.mongodb.net/sample_airbnb?retryWrites=true&w=majority&appName=Cluster1')
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error starting server:', err);
  }); 


  app.post('/addListing', (req, res) => {
    const newListingData = req.body; 
    
    listingsDB.addNewListing(newListingData)
      .then(newListing => {
        res.status(201).json(newListing); 
      })
      .catch(err => {
        res.status(500).json({ error: err.message }); // Handle any errors
      });
  });
  
  app.get('/listings', (req, res) => {
    const { page = 1, perPage = 5, name } = req.query; 
    
    listingsDB.getAllListings(page, perPage, name)
      .then(listings => {
        res.json(listings); 
      })
      .catch(err => {
        res.status(500).json({ error: err.message }); // Handle errors
      });
  });
  
  app.get('/listing/:id', (req, res) => {
    const { id } = req.params; // Get the listing ID from the URL parameter
    
    listingsDB.getListingById(id)
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
  
  app.put('/listing/:id', (req, res) => {
    const { id } = req.params; // Get the listing ID from the URL
    const updatedData = req.body; // Get the updated data from the request body
  
    listingsDB.updateListingById(updatedData, id)
      .then(result => {
        res.json({ message: "Listing updated", result });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });
  
  app.delete('/listing/:id', (req, res) => {
    const { id } = req.params; // Get the listing ID from the URL
    
    listingsDB.deleteListingById(id)
      .then(result => {
        res.json({ message: "Listing deleted", result });
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
