import React, { useEffect, useState } from 'react';

const EditTask = ({ updateData,updateTaskWithApi }) => {
    const [contactName, setContactName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect(() => {
        console.log("updateData", updateData)
        if (updateData) {
            setContactName(updateData?.contactName);
            setMobileNumber(updateData?.mobileNumber);
        }

    }, [updateData])
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!contactName || !mobileNumber) return; // Simple form validation
        const newTask = {
            contactName,
            mobileNumber,
        };
        updateTaskWithApi(newTask)
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Contact Name"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
            />
            <textarea
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
            />
            <button type="submit">Update Contact</button>
        </form>
    );
};


export default EditTask