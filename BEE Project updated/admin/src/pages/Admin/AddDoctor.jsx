import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import {toast} from 'react-toastify'
import { useContext } from "react";
import axios from 'axios'

const AddDoctor = () =>{

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const {backendUrl,aToken} = useContext(AdminContext)


    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        console.log("Form submitted!");

        try {
            if(!docImg){
                return toast.error("Image not selected")
            }


            const formData=new FormData()

            formData.append('image',docImg )
            formData.append('name',name )
            formData.append('email',email )
            formData.append('password',password)
            formData.append('experience',experience )
            formData.append('fees',Number(fees) )
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2}))

            // console log form data
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`);
            })

            const {data} =await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})
            console.log("Backend response:", data);

            if (data.Success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')

            } else{
                toast.error(data.message)
                console.log(error)
            }

        } catch (error) {
            // toast.error(error.message)
        }
    }




    return(
        <form onSubmit={onSubmitHandler} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">ADD DOCTOR</p>

            <div className="bg-white px-8 py-9 border border-gray-300 rounde w-ful max-w-4xl max-h-[80vh] overflow-y-scroll">

                <div className="flex item-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
                    <p className="text-gray-700">Upload doctor <br />picture</p>
                </div>

                <div className="flex flex-col lg:flex-row item-start gap-10 text-gray-600">

                    <div className="w-full lg:flex-1 flex flex-col gap-4">

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Name</p>
                            <input onChange={(e)=> setName(e.target.value)} value={name} className="border border-gray-400 rounded px-3 py-2" type="text" placeholder="Name" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Email</p>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} className="border border-gray-400 rounded px-3 py-2" type="email" placeholder="Email" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Doctor Password</p>
                            <input onChange={(e)=> setPassword(e.target.value)} value={password} className="border border-gray-400 rounded px-3 py-2" type="password" placeholder="Password" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Experience</p>
                            <select onChange={(e)=> setExperience(e.target.value)} value={experience} className="border border-gray-400 rounded px-3 py-2" >
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Years</option>
                                <option value="3 Year">3 Years</option>
                                <option value="4 Year">4 Years</option>
                                <option value="5 Year">5 Years</option>
                                <option value="6 Year">6 Years</option>
                                <option value="7 Year">7 Years</option>
                                <option value="8 Year">8 Years</option>
                                <option value="9 Year">9 Years</option>
                                <option value="10 Year">10 Years</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Fees</p>
                            <input onChange={(e)=> setFees(e.target.value)} value={fees} className="border border-gray-400 rounded px-3 py-2" type="number" placeholder="fees" required />
                        </div>
                    </div>

                    <div className="w-full lg:flex-1 flex flex-col gap-4">

                        <div className="flex-1 flex flex-col gap-1">
                            <p>Speciality</p>
                            <select onChange={(e)=> setSpeciality(e.target.value)} value={speciality} className="border border-gray-400 rounded px-3 py-2">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className="flex-1 flex flex-col gap-1 ">
                            <p>Education</p>
                            <input onChange={(e)=> setDegree(e.target.value)} value={degree} className="border border-gray-400 rounded px-3 py-2" type="text" placeholder="Education" required />
                        </div>

                        <div className="flex-1 flex flex-col gap-2 mb-32 " >
                            <p>Address</p>
                            <input onChange={(e)=> setAddress1(e.target.value)} value={address1} className="border border-gray-400 rounded px-3 py-2" type="text" placeholder="address 1" required />
                            <input onChange={(e)=> setAddress2(e.target.value)} value={address2} className="border border-gray-400 rounded px-3 py-2" type="text" placeholder="address 2" required />
                        </div>

                    </div>
                </div>

                <div>
                    <p className="mt-4 mb-2">About Doctor</p>
                    <textarea onChange={(e)=> setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border rounded border-gray-400" placeholder="write about doctor" rows={5} required />
                </div>

                <button type="submit" className="bg-primary px-8 py-3 mt-4 text-white rounded-full hover:bg-[#3143e4] hover:scale-110">Add Doctor</button>


            </div>
        </form>
    )
}

export default AddDoctor