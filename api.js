import fetch from 'node-fetch';
import dotenv from "dotenv";
dotenv.config()

const meters = process.env.METERS;
const services = process.env.SERVICES;
const authkey = process.env.AUTHKEY;


const fetchOptions = {
    method: "GET",
    headers: {
        "Authorization": authkey
       }
}



export const getUsage = async ()=>{
    
    const url = meters;

    const apiFetch = await fetch(url, fetchOptions);
    let usageGet = await apiFetch.json()

    let data = new Map()
    let dataRaw = Object.entries(usageGet.data[0].attributes.readings.kw).map(e=>{
        let [key, value] = e;
        const datetoFormat = new Date(key);
        const options = { year: 'numeric', month: 'long'};  
        const date = datetoFormat.toLocaleDateString('en-US', options);
        value = (value == null)? 0 : value;
        if(data.has(date)){
            let oldValue = data.get(date);
            data.set(date, oldValue+value)
        }else{
            data.set(date, value)
        }
        // const optionsRaw = { year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric"};  
        // const dateRaw = datetoFormat.toLocaleDateString('en-US', optionsRaw);

        return {value}
    })

    // console.log({data: Array.from(data)})
    
   return {data: Array.from(data)}


}
export const getBilling = async ()=>{
    const url = services;
    const apiFetch = await fetch(url, fetchOptions);
    let meterData = await apiFetch.json()
    return {data: meterData}
}