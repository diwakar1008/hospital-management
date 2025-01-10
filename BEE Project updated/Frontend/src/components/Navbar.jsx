import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();

    const {token,setToken,userData}= useContext(AppContext)

    const [showMenu, setShowMenu] = useState(false)

    const logout =()=>{
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm mb-5 border-b border-b-gray-400'>
            <img onClick={() => navigate('/')} className='w-48 cursor-pointer' src="/src/assets/MediCare (2).png" alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1 px-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 px-2'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 px-2'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 px-1'>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                            <img className='w-11 rounded-full' src={userData.image} alt='' />
                            <img className='w-4' src={assets.dropdown_icon} alt="" />
                            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>My profile</p>
                                    <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>Create account</button>
                }
                <img onClick={()=>setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            

            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6 border-b border-b-gray-500'>
                    <img className='w-60 -my-4' src="/src/assets/MediCare (2).png" alt="" />
                    <img className='w-9' onClick={()=>setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/' ><p className='bg-gray-200 px-12 py-3 rounded-full mt-4'>HOME</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='bg-gray-200 px-12 py-3 rounded-full mt-4'>ALL DOCTOR</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='bg-gray-200 px-12 py-3 rounded-full mt-4'>ABOUT</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='bg-gray-200 px-12 py-3 rounded-full mt-4'>CONTACT</p></NavLink>
                </ul>
            </div>
            </div>
        </div>
    )
}

export default Navbar