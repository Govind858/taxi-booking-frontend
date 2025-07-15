"use client"
import { useState,useContext,createContext } from "react"

const DriverContext = createContext(null);

export function  DriverProvider({children}){
    const [driver,setDriver] = useState({
        "id":"",
        "token":"",
        "name":"",
        "email":"",
        "mobile":""
    })
      
 return(
    <DriverContext.Provider value={{driver,setDriver}}>
        {children}
    </DriverContext.Provider>    

 )
}

export function useDriver() {
   return useContext(DriverContext)
}