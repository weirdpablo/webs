"use client"

import { useRouter } from "next/navigation";
// import {  } from 'react-icons/';
import Link from 'next/link';
import React from 'react';
import Footer from '@/ui/home/footer';
import { toast } from 'sonner'
import { LoadingDots } from "@/ui/icons";
import axios from 'axios';

const Waitlist = () => {
    const router = useRouter();
    const roles = ['developer', 'designer', 'just curious'];
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [role, setRole] = React.useState('');
    const [loading, setLoading] = React.useState(false); 

    const register = async () => {
        try{
            await axios.post(`${process.env.API_URL}waitlist`), { name, email, role };
        } catch(Err: any) {
            toast.error(Err)
        }
    }    
    return(
        <>
        <div className="bg-[#000] min-h-[100vh] text-[#fff] py-[3rem]">
            <p className="text-center text-[1.8rem] items-center tracking-[-0.04em] mb-[.7rem]">Private beta</p>
            <form className="w-[85%] mx-auto">
                <p className="mb-[.4rem]">Name</p>
                <input type="text" placeholder="Enter your name" required autoComplete="off" className="mb-4 border-[1.8px] border-[#454545] outline-[none] rounded-[7px] px-[.7rem] pt-[.3rem] bg-transparent" value={name} onChange={(e)=>setName(e.target.value)}/>
                <p className="mb-[.4rem]">Email</p>
                <input type="email" placeholder="Enter your email" required autoComplete="off" className="mb-4 border-[1.8px] border-[#454545] outline-[none] rounded-[7px] px-[.7rem] pt-[.3rem] bg-transparent" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <div className="mb-[.8rem]">
                    <p>Which one are you?</p>
                    {
                        roles.map((role, index)=>(
                            <div className="items-center text-center flex justiy-between" key={index}>
                                <p className="text-uppercase" style={{ textTransform: 'uppercase' }}>{role}</p>
                                <input type="checkbox" required className="mt-4 " onChange={(e)=>setRole(role)}/>
                            </div>
                        ))
                    }
                </div>
                <p className="text-[.8rem]">By joinning the private beta, you agree to our <Link href="/">terms and conditions</Link></p>
                <button className="bg-[#0071e3] px-4 py-2 rounded-[20px] mt-[2.15rem]" onClick={()=>{
                    register()
                }}>
                    {loading ? (
                        <LoadingDots color="#808080" />
                    ) : (
                       <p>Join the private beta</p>
                    )}
                </button>
            </form>
        </div>
        <Footer />
        </>
    )
}
export default Waitlist;