const express = require("express");
 
const {addContact,getAllContacts,editContacts,deleteContacts}= require('../modules/admin/bookManagerControllers');
  
const router = express.Router();
//Public routes
 
router.post('/add-contact',addContact);
router.get("/get-all-contacts",getAllContacts);
router.put('/update/:id',editContacts);
router.delete("/delete/:id",deleteContacts);
 

module.exports = router