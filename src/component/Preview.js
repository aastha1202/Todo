import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

const Preview = () => {
    const [todos, setTodos]= useState([]);
    const [preview , setPreview]= useState(false);
    const today = new Date();
const hour=today.getHours()
const minute=today.getMinutes()
const realTime= dayjs().hour(hour).minute(minute);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(today);
      const [dayOfWeek,month,year] = formattedDate.split(',');

      useEffect(() => {
        axios.get('https://to-do-api-rho.vercel.app/todo')
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      }, [])
      

    const handlePreview=()=>{
        setPreview(true);
       

    }
    
     
      const convertTimeFormat=(time)=>{
        console.log("inside convert time")
        console.log(time)
        const [hours, minutes] = time.split(':');
        const times = dayjs().hour(hours).minute(minutes);
        const formattedTime = times.format('h:mm A');
        return formattedTime;
      }
  return (
    <div>
        <Link to="/create"><button  className='create'>Create</button></Link>
        <hr style={{border: "1px solid #000000",width:"95%"}} ></hr>
        <div className='flex'>
            <span>M</span>
            <div className='day'>{dayOfWeek}</div>
          <Link to="/user">  <button onClick={handlePreview} className='previewButton'>Preview view</button></Link>
        </div>
       
            <div className='previewDiv'>
             <div style={{display:"flex",gap:"300px",marginLeft:"185px"}}>
             <h1>55C</h1>
             <h1 style={{fontWeight:"500"}}>{realTime.format('h:mm A')}</h1>
             </div>
            <h2>Today is <span style={{color:"red"}}>{dayOfWeek},</span>{month} ,{year}</h2>
            {todos.map((row,index)=>{  
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

export default Preview