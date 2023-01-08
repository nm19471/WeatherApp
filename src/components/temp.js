import React, { useState, useEffect } from 'react'
import WeatherCard from './weatherCard';
import './style.css'
const Temp = () => {
  const [searchValue, setSearchValue]=useState("pune");
  const [tempInfo,setTempInfo]= useState({})


  const getWeatherInfo= async()=>{
      try{
         let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9af9eb08c450186ede1d6d20e849417e`
         const res=await fetch(url);
         const data =await res.json()
         const {temp,humidity,pressure}=data.main
         const {main:weathermood}= data.weather[0]
         const {name}=data
         const {speed} =data.wind
         const {country,sunset}=data.sys
         
         const myNewWeatherInfo={
          temp,
          humidity,
          pressure,
          weathermood,
          name,
          speed,
          country,
          sunset,
         }
         setTempInfo(myNewWeatherInfo)
      }
      catch(error){
        console.log(error);
      }
  }
  
  // to get call the api for first time without clicking search btn
  useEffect(()=>{
    getWeatherInfo()
  },[])
  return (
    <> 
     <div className='wrap'>
         <div className='search'>
            <input type="search"
            placeholder='search...'
            autoFocus
            id='search'
            className='searchTerm'
            value={searchValue}
            onChange={(e)=> setSearchValue(e.target.value)}/>
            <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
         </div>
     </div>  

      {/* Our tmep Card */}
      <WeatherCard tempInfo={tempInfo}/>
    </>
  )
}

export default Temp;
