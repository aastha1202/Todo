import React, { useState,useEffect } from 'react'
import {HiPencil} from "react-icons/hi"
import {AiOutlinePlusCircle} from "react-icons/ai"
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimeClock } from '@mui/x-date-pickers/TimeClock';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Create = () => {
    const [openCalendar,setOpenCalendar]= useState(false)
    const [timepicker,openTimePicker]=useState(false)
    const [hourPicker,openHourPicker]=useState(false)
    const [minutePicker,openMinutePicker]=useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [index,setIndex]=useState(0)
    // const [inputValues, setInputValues] = useState([]);
    const today= new Date()
    const todaysDate=dayjs(today).format("YYYY-MM-DD")
    const dateDisplay=dayjs(today).format("ddd MMM DD")
    const [date,setDate]=useState(dateDisplay)
    // console.log(date)
    const [value, setValue] = useState((dayjs(todaysDate))); 
    const [rows, setRows]= useState([{task:"",date:"",time:""}]);
    const [time, setTime] = useState(""); 
    const[amOrPm,setAMOrPM]=useState("AM")
    const [required,setRequired]=useState(false)
    const[hour,setHour]=useState("07")
    const[minute,setMinute]=useState("00")
    const [inputValue, setInputValue] = useState("");
    const defaultTime = { hour: "07", minute: "00", amOrPm: "AM" };

    const navigate= useNavigate();


    const theme = createTheme({
      components: {
        MuiClock: {
          styleOverrides: {
            pin: {
              backgroundColor: '#B7D7A8', // Customize the clock pins color
            },
          },
        },
        MuiDateCalendar:{
          styleOverrides:{
            root:{
              width:"380px"
            }
          }
        },
        MuiClockPointer:{
          styleOverrides:{
            root:{
              backgroundColor:"#B7D7A8"
            },
            thumb:{
              backgroundColor:"#B7D7A8",
              borderColor:"#B7D7A8"
            }
          }
        },
        MuiPickersDay:{
          styleOverrides:{
            root: {
              // Add your styles for the selected element here
              '&.Mui-selected': {
                backgroundColor: '#B7D7A8', // Customize the selected background color
              },
              "&:hover":{
                border:"1px solid #B7D7A8",
                backgroundColor:"transparent"
              },
              "&.Mui-selected:focus":{
                backgroundColor:"#B7D7A8"
              }
            }
          }
        },
        MuiTimeClock:{
          styleOverrides:{
            root:{
              width:"250px"  
            }
          }
        },
        MuiPickersYear: {
          styleOverrides: {
            yearButton: {
              "&.MuiPickersYear-yearButton:focus": {
                backgroundColor: "#B7D7A8",
              },
              "&.Mui-selected":{
                backgroundColor: "#B7D7A8",
              }
            },
          },
        },
        
        MuiDayCalendar:{
          styleOverrides:{
            slideTransition:{
              minHeight:"195px"
            }
          }
        }
      },
    });
    useEffect(() => {
      const formattedTime = dayjs(`${hour}:${minute} ${amOrPm}`, 'h:mm A').format('HH:mm');
      const newRows = [...rows];
      newRows[index].time = formattedTime;
      setRows(newRows);
    
      // console.log(newRows);
      // console.log(formattedTime);
    }, [hour, minute, amOrPm]);

       const handleTaskChange=(e,index)=>{
        setRequired(false)
        setInputValue(e.target.value)
        const newRows= [...rows];
        newRows[index].task=e.target.value;
        if (newRows[index].date === "") {
          newRows[index].date = dayjs(todaysDate).format("ddd MMM DD YYYY");
        }
        setIndex(index)
        setRows(newRows);
     }
     const handleDateChange= (value) => {
        setValue(value)
        setDate(value.$d.toDateString())
        // console.log(value.$d.toDateString())
        const newRows= [...rows];
        newRows[index].date=value.$d.toDateString();
        newRows[index].date=value.$d;

        // console.log(newRows)
        setRows(newRows);
   }

    const handleTimeChange = (newValue) => {
      setValue(newValue)
      setHour(newValue.$H.toString().padStart(2, "0"));
      setMinute(newValue.$m.toString().padStart(2, "0"));
    };
   
     const addRow = () => {
      const previousTask = rows[index].task.trim();
      if (previousTask === "") {
        setRequired(true)
        return;
      }
          // rows.forEach((item) => {
          //   const task = item.task;
          //   const time= item.time;
          //   const date=item.date
          //   console.log(task);
          // });
          const newRows = [...rows, { task: "", date: "", time: `${defaultTime.hour}:${defaultTime.minute}` }];
          setRows(newRows);  
        // setRows([...rows,{task:" ",date:'',time:""}]);
        setIndex(index+1)
        setInputValue(""); // Reset the input value
        // setHour(defaultTime.hour); // Reset the hour value
        // setMinute(defaultTime.minute); // Reset the minute value
        // setAMOrPM(defaultTime.amOrPm); // Reset the AM/PM value
      };
      const saveTask= async ()=>{
        if (isLoading) {
          return;
        }
        console.log(rows)
        const hasEmptyTask = rows.some((row) => row.task.trim() === "");
        if (hasEmptyTask) {
          setRequired(true)
          return;
        }

        const newRows = rows.map((row) => {
          if (!row.time) {
            setHour(defaultTime.hour); 
            setMinute(defaultTime.minute);
            setAMOrPM(defaultTime.amOrPm)
          }
          return row;
        });
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000));
        axios.post('https://api-puce-xi.vercel.app/todo', {task:rows})
        .then((response) => {
          console.log(response);
          setIsLoading(false)
          setTimeout(() => {
            navigate("/");
          }, 500);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(()=>{
         
        })
         
      
      }

  return (
    <div>
        <div className='header'> Form</div>
        <div className='form-body'>
        <div className='flex-date-div'>
         <div className='date-picker'>
          <span>Select a date</span>
          <div className='date-display'>
          <h5>{date.slice(0,10)}</h5> 
          {/* slice(0,10) */}
          <div>
          <HiPencil onClick={(e)=> setOpenCalendar(true)} size="2rem"/>
          </div>
          </div>
         </div>
         <div>
         <Link to="/user"><button className='add-row-button'>Preview view</button></Link>
         </div>
         </div>
         {openCalendar && (
        <div className='calendar'>
        <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar value={value} onChange={(newValue) => handleDateChange(newValue)} />
        </LocalizationProvider>
        </ThemeProvider>
        <div className='flex '  style={{justifyContent:"end",gap:"20px",margin:"20px",}}  >
        <button className='calendar-buttons' onClick={()=>setOpenCalendar(false)}>Cancel</button>
        <button className='calendar-buttons' onClick={()=>setOpenCalendar(false)}>Ok</button>
        </div>
        </div>)}
        <div className='flex-div'>
        <div className='timepicker' style={{backgroundColor: timepicker ? 'white' : 'transparent'}} >
        <div  style={{display:"flex",flexDirection:"column",alignItems:"flex-start"}}>
        { timepicker && <span className='selectTimeText' style={{color:"#717370"}}>Select a time</span>}
        <div className='time-display'>
        <div className='hour' style={{backgroundColor: hourPicker ? '#B7D7A8' : 'rgba(33, 33, 33, 0.08)'}} onClick={()=>{openTimePicker(true);openHourPicker(true);openMinutePicker(false)}}>{hour}</div>
        <span className='colon'>:</span>
        <div className='minutes' style={{backgroundColor: minutePicker ? '#B7D7A8' : 'rgba(33, 33, 33, 0.08)'}} onClick={()=>{openTimePicker(true); openMinutePicker(true);openHourPicker(false)}}>{minute}</div>
        <div className='time'>
        <div style={{ backgroundColor:amOrPm==="AM"?"#B7D7A8":"white"}} onClick={()=>setAMOrPM("AM")}>AM</div>
        <div  style={{ backgroundColor:amOrPm==="PM"?"#B7D7A8":"white"}} onClick={()=>setAMOrPM("PM")}>PM</div>
        </div>
        </div>
        </div>
       { timepicker && (
        <div className='clock'>
        { hourPicker &&
          <ThemeProvider theme={theme}>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock views={['hours']} value={value}     onChange={(newValue)=>handleTimeChange(newValue)} />
          </LocalizationProvider>
          </ThemeProvider>}
          { minutePicker && 
            <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock views={['minutes']} value={value}  onChange={(newValue)=>handleTimeChange(newValue)}  />
          </LocalizationProvider>
          </ThemeProvider>}
          <div  className='flex '  style={{justifyContent:"end",gap:"20px",margin:"20px",}} >
          <button className='calendar-buttons' onClick={()=>openTimePicker(false)}>Cancel</button>
        <button className='calendar-buttons' onClick={()=>openTimePicker(false)}>Ok</button>
        </div>
        </div>)}
        </div>

        <div className='task-input'>
        <span>Details</span>
        {required && (<span style={{color:"red",float:"right"}}>required</span>)}
        <input className='inputStyle' type='text' value={inputValue} placeholder='Text' onChange={(e)=>handleTaskChange(e,index)} required/>
        
        <button className='add-row-button'  onClick={addRow}>Add More <AiOutlinePlusCircle size="2rem"/></button>
        <div className='button'>
        {isLoading ? <div className='loader'></div>: <></>}
        <button className={isLoading?'disable-btn':"save-button"} onClick={saveTask}>Save</button>
        </div>
        </div>
          </div>
        </div>

        
    </div>
  )
}

export default Create