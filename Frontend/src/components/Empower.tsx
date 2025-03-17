import EmpowerFeature from "./EmpowerFeature"
import Button from "./Button";
import { Link } from "react-router-dom";
const empowerFeaturesData = [
   {
     title: "Enhanced Tracking",
     description: "Stay on top of your finances with real-time updates and comprehensive reports"
   },
   {
     title: "Smart Decisions",
     description: "Leverage data-driven insights to make strategic choices for your financial future."
   }
 ];

const Empower = () => {
  return (
   <div id="empower" className="bg-[#121826] text-white flex p-10 xl:p-20 gap-30 ">
      <div className="flex flex-col xl:w-1/2 gap-10 xl:h-140 justify-between">
         <div className="flex flex-col gap-6">
            <p className="text-sm font-bold">Empower</p>
            <h2 className="text-3xl xl:text-4xl font-bold">Unlock Your Financial Potential Today</h2>
         </div>
         <p className="text-base md:text-xl">Experience seamless financial tracking and insightful analytics. Make informed decisions that drive your success.</p>
         <div className="flex items-center flex-col sm:flex-row gap-6 mt-10 sm:mt-0">
            {empowerFeaturesData.map((feature, index) => (
               <EmpowerFeature
                  key={index}
                  title={feature.title}
                  description={feature.description}
               />
            ))}
         </div>
         <div className="flex self-center sm:self-start items-center gap-10">
            <Link to="/register"><Button variant="primary">Get Started</Button></Link>
            <Link to="/login" className="hover:underline cursor-pointer">Log In</Link>
         </div>
      </div>
      <div className="hidden xl:flex items-center justify-center w-1/2">
         <img className="w-140 h-140 object-cover" src="graph1.jpg" alt="" />
      </div>
   </div>
  )
}

export default Empower
