import axios from "axios"

const BACKEND_URL = "http://localhost:8080"

export const login= async(email,password)=>{
    try{
        const url = `${BACKEND_URL}/user/login?email=${email}&password=${password}`;
        const response = await axios.post(url);
        const data = response.data
        console.log(data);
        return data;
    }catch(error){
        throw error
    }
}

export const signup= async(firstName,lastName,phoneNumber,email,password)=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/user/signup`,{
            firstName,lastName,phoneNumber,email,password
        });
        const data = response.data
        console.log(data);
        return data;
    }catch(error){
        throw error
    }
}