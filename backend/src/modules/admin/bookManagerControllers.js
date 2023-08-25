const userModel=require("../../db/models/bookManagerSchema")
const addContact = async (req,res)=>{
    const {contactName,mobileNumber} = req.body
    if(!contactName || !contactName){
    return res.send({"message":"All fields are required","status":400}) 
}
    const data = await userModel.find({"mobileNumber":mobileNumber});
    console.log()
    if(data.length>0){
        return res.send({"message":"mobile number already exists","status":400,"data":data}) 
    }
    
    try {
        
        const doc = new userModel({
            contactName:contactName,
            mobileNumber:mobileNumber
        })
        await doc.save()
        res.send({"message":`${contactName} is added successfully!`, "status":200,
        "data":{
            "contactName":`${contactName}`,
            "mobileNumber":`${mobileNumber}`,

        }
        })
    } catch (error) {
        console.log(error)
                     res.send({"message":"Unable to add contact","status":403})
    }
}

const getAllContacts = async (req,res)=>{
    console.log("req.query",req.query)
    let mobileNumber = Number(req.query.search)
    let matchQuery ={}
    if(req.query.search){
        matchQuery ={ $or: [{ "mobileNumber": mobileNumber }, {"contactName":{ $regex : req.query.search }}] }
    } 

    try{
        const data = await userModel.aggregate([
            {$match:matchQuery},
            { 
                $sort: { "contactName": 1 } 
              },
        ])
        res.json(data)
    }
    catch(error){
        res.status(403).json({"message":"Unable to fatch contacts"})
    }
}

const editContacts = async (req,res)=>{
    try{
            const id = req.params.id;
            const newData = req.body; // New data to update the document
          
            userModel.updateOne({ _id: id }, { $set: newData }, (err, result) => {
              if (err) {
                console.error('Error updating contact:', err);
                res.status(500).send('Error updating contact');
                return;
              }
          
              res.send({"message":`Contact is updated successfully!`, "status":200,
              
              })
            });
          
          
    }
    catch(error){
        res.status(403).json({"message":"Unable to update contact"})
    }
}

const deleteContacts = async (req,res)=>{

    try{
        
  const id = req.params.id;

  userModel.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      console.error('Error deleting contact:', err);
      res.status(500).send('Error deleting contact');
      return;
    }

    res.send({"message":`Contact is deleted successfully!`, "status":200,
              
              })
  });
    }
    catch(error){
        res.status(403).json({"message":"Unable to delete contact"})
    }
}

module.exports = {addContact,getAllContacts,editContacts,deleteContacts}