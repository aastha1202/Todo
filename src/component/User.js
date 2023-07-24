import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import {BiArrowBack} from "react-icons/bi"
import { Link } from 'react-router-dom'


const User = () => {
    const [todo,setTodos]=useState([])
    useEffect(() => {
        axios.get('https://api-puce-xi.vercel.app/todo')
        .then((response) => {
          setTodos(response.data);
          console.log(todo)
        })
        .catch((error) => {
          console.error(error);
        });
    }, [])
    const convertTimeFormat=(time)=>{
      console.log("inside convert time")
      console.log(time)
      const [hours, minutes] = time.split(':');
      const times = dayjs().hour(hours).minute(minutes);
      const formattedTime = times.format('h:mm A');
      return formattedTime;
    }
    
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
    <Link to="/"> <BiArrowBack size="2rem" style={{display:"flex",color:"black"}}/> </Link>
    <div style={{display:"flex",alignItems:"center",position:"relative"}}>
             <h1 style={{position:"absolute"}}>55C</h1>
             <h1 style={{fontWeight:"500",margin:"auto"}}>{realTime.format('h:mm A')}</h1>

             </div>
    <h2>Today is <span style={{color:"red"}}> {dayOfWeek} </span>{month} {date} {year}</h2>
    {/* <ul>
        {todo.map((todos,index)=>{
           return (<li key={todos.index}>{todos.task}</li>)
        })}
    </ul> */}
    {todo.map((row,index)=>{  
                        return(
                            <div className='tasks'>
                            { row.time &&  (
                            <div>
                            {row.task && (<span>{convertTimeFormat(row.time)==="undefined PM" || " " ? (<>{convertTimeFormat(row.time)}:</>):(<></>)}</span>)}
                            <span style={{textTransform:'uppercase'}}>{row.task}</span>
                            </div>
                            )

                            }
                           
                           
                            </div>
                        )   
                    })
                    }

    </div>
    </div>
  )
}

export default User
