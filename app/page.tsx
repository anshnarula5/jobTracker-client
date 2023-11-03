"use client"

import { useSelector } from "react-redux"
import withAuth from "./rest/withAuth"
import Image from "next/image"

const Home = () => {
  const userInfo = useSelector((state: any) => state.authReducer.value)
  return (
    <main className="flex xl:flex-row flex-col gap-5 relative max-w-[1440px] md:mx-auto">
      <div className="flex-1 md:pt-12 pt-6 padding-x  md:mx-auto mx-6">
        <h1 className=" 2xl:text-[72px] sm:text-[64px] text-[50px] font-extrabold">
        JobTracker: Empowering Your Job Search
        </h1>
        <p className=" text-[27px] text-black-100 font-light mt-5 ">
        Visualize Your Success with Intuitive Charts and Comprehensive Application Insights
        </p>
      </div>
      <div className="flex justify-end items-end w-full xl:h-screen">
        <div className=" relative xl:w-full w-[90%] xl:h-full h-[590px] -z-30 ">
          <Image src="/6671.jpg" alt="hero" fill className="object-contain" />
        </div>
      </div>
    </main>
  )
}

export default Home