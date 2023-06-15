import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'

const User = () => {
    const [todo,setTodos]=useState([])
    useEffect(() => {
        axios.get('https://to-do-api-ndrh.vercel.app/todo')
        .then((response) => {
          setTodos(response.data);
          console.log(todo)
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
    
    const today = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
      const [dayOfWeek,month,date,year] = formattedDate.split(' ');
      const hour=today.getHours()
      const minute=today.getMinutes()
      const realTime= dayjs().hour(hour).minute(minute);
  return (
    <div> 
    <div className='previewDiv'style={{backgroundColor:"transparent"}} >
    <div style={{display:"flex",gap:"300px",marginLeft:"185px"}}>
             <h1>55C</h1>
             <h1 style={{fontWeight:"500"}}>{realTime.format('h:mm A')}</h1>
             </div>
    <h2>Today is <span style={{color:"red"}}> {dayOfWeek} </span>{month} {date} {year}</h2>
    <ul>
        {todo.map((todos,index)=>{
           return (<li key={todos.index}>{todos.task}</li>)
        })}
    </ul>

    </div>
    </div>
  )
}

export default User