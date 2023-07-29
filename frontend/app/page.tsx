"use client"

import Link from 'next/link';
import { useRouter } from "next/navigation";
import Footer from '@/ui/home/footer';

const Home = () => {
  const router = useRouter();
  return(
    <>
    <div className="min-h-screen text-center font-inter items-center text-[#fff] bg-[#000] space-y-[1.8rem] px-[2.1rem] py-[3.2rem]">
      <div className="space-y-[.9rem]">
        <p className="text-[2.5rem] font-medium tracking-[-0.04em]">Help us figure things out</p>
        <p style={{ color: "rgba(255, 255, 255, .73" }} className="text-[1.1rem]">We're building a tool to help designers and developers become more effecient and we need help. Join the private beta to help us test things out</p>
      </div>
      <button className="bg-[#0071e3] px-4 py-2 rounded-[20px] mt-[2.15rem]" onClick={()=>{
        router.push('/waitlist')
      }}>Join the private beta</button>
    </div>
      <Footer/>
      </>
  )
};
export default Home;