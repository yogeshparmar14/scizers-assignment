import React, { useState } from 'react';

const TodoForm = ({ addContact,button,updateData }) => {
    const [contactName, setContactName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(button==="Update Task")
        if (!contactName || !mobileNumber) return; // Simple form validation
        const newContact = {
            contactName,
            mobileNumber,

        };
        console.log("newContact",newContact)
        addContact(newContact);
        setContactName('');
        setMobileNumber('');
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
        <p>Contact Name</p>
            <input
                type="text"
                placeholder="Enter Your Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />
            <p>Mobile Number</p>
             <input
                type="text"
                placeholder="Enter Your Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
           
            <button type="submit">{button}</button>
        </form>
    );
};

export default TodoForm;



