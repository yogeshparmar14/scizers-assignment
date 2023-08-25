

import React, { useEffect, useState } from 'react';
import './styles.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import EditTask from './EditTask';


const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [notification, setNotification] = useState('');
   const [updateData, setUpdataData] = useState()
  const [openPopUp, setOpenPopUp] = useState(false)
  useEffect(() => {
    getAllContact()
  }, [])

  const getAllContact = () => {

    fetch(
      "http://localhost:8000/admin/get-all-contacts", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',

      }
    })
      .then((res) => res.json())
      .then((json) => {
        setContacts(json);
      })
  }
  const addContact = async (task) => {

    const response = await fetch('http://localhost:8000/admin//add-contact', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const result = await response.json();
    if (result.status === 200) {
      getAllContact()
    }

    setNotification(`New task added: ${task.contactName}`);
    setTimeout(() => {
      setNotification('');
    }, 3000); // Hide notification after 3 seconds
  };

  const deleteTask = async (id) => {
    const response = await fetch(`http://localhost:8000/admin/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json();
    if (result.status === 200) {
      getAllContact()
    }
  };

  const updateTaskWithApi = async (newTask) => {

    const response = await fetch(`http://localhost:8000/admin/update/${updateData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask)
    })
    const result = await response.json();
    if (result.status === 200) {
      getAllContact()
    }
    setOpenPopUp(false)
  }

  const search = async (value) => {

    const response = await fetch(`http://localhost:8000/admin/get-all-contacts?search=${value}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json();
    setContacts(result)

  }

  // console.log("tasks",tasks)
  return (
    <div className="app">
      <h1>Book Manager</h1>
      {/* Notification */}
      {notification && <div className="notification">{notification}</div>}
      <TodoForm addContact={addContact} button="Add Contact" />
      <TodoList
        tasks={contacts}
        deleteTask={deleteTask}
        search={search}
      />
      {openPopUp ? <div>
        <div className='flex-center'> </div>
        <div className="popup">
          <div className="popup-content">
            <EditTask updateData={updateData} updateTaskWithApi={updateTaskWithApi} />
            <button onClick={() => { setOpenPopUp(false) }}>Close</button>
          </div>
        </div>
      </div> : null}

    </div>
  );
};

export default Home;
