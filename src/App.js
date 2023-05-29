import './cssfile.css'
import { useState, useEffect } from "react"
import Axios from 'axios'

function App() {

  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [listOfFriends, setListOfFriends] = useState([])

  const addFriend = () => {
    Axios.post('https://friendappbackend.onrender.com/addFriend', {name: name, age: age})
      .then((response)=> {
        setListOfFriends([...listOfFriends, {_id: response.data._id, name: name, age: age}])
        alert("New Friend added!")
      })
      .catch(() => {
        alert("Unsuccessful")
      })
  }

  const updateFriend = (id) => {
    const newAge = prompt("Enter new age : ");

    Axios.put('https://friendappbackend.onrender.com/update', {newAge: newAge, id: id})
      .then(() => {
        setListOfFriends(listOfFriends.map((val) => {
          return val._id === id ? {_id: id, name: val.name, age: newAge} : val
        }))
      })
      .catch(() => {
        alert("Unsuccessful")
      })
  }

  const deleteFriend = (id) => {
    Axios.delete(`https://friendappbackend.onrender.com/delete/${id}`)
      .then(() => {
        setListOfFriends(listOfFriends.filter((val) => {
          return val._id !== id
        }))
      })
      .catch(() => {
        alert("Unsuccessful")
      })
  }

  useEffect(() => {
    Axios.get('https://friendappbackend.onrender.com/read')
      .then((response) => {
        setListOfFriends(response.data)
      })
      .catch(() => {
        alert("Unsuccessful")
      })
  }, [])

  return (
    <div className="App">
      <div className="inputs">
        <h3>Enter the name:</h3>
        <input 
          type="text" 
          className="input" 
          placeholder="Name" 
          onChange={(event) => {setName(event.target.value)}}
        />

        <h3>Enter the age:</h3>
        <input 
          type="number" 
          className="input" 
          placeholder="Age" 
          onChange={(event) => {setAge(event.target.value)}}
        />

        <button onClick={addFriend}>Add Friend</button>
      </div>

      <h2>List of friends</h2>

      <div className='friends'>
        {listOfFriends.map((val) => {
          return(
            <div className='friendContainer'>
              <div className='friend'>
                <h3>Friend Name: {val.name}</h3>
                <h3>Friend Age: {val.age}</h3>
              </div>
              <button onClick={() => {updateFriend(val._id)}}>Update</button>
              <button onClick={() => {deleteFriend(val._id)}}>X</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
