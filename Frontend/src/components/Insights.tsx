import InsightFeatures from "./InsightFeatures"
import Button from "./Button";
import { Link } from "react-router-dom";
const featureData = [
   {
     title: "Stay Updated with Real-Time Data",
     description: "Access live updates that keep you informed.",
   },
   {
     title: "Tailor Reports to Your Unique Needs",
     description: "Create customized reports that highlight key metrics.",
   },
   {
     title: "Experience a User-Friendly Interface",
     description: "Navigate effortlessly with our intuitive design.",
   }
 ];

const Insights = () => {
  return (
   <div id="insights" className="bg-[#121826] text-white flex flex-col p-10 gap-20 xl:p-20 xl:gap-30">
      <div className="flex flex-col lg:flex-row gap-10">
         <div className="flex flex-col lg:w-1/2 gap-6">
            <p className="text-sm font-bold">Insights</p>
            <h2 className="text-3xl xl:text-4xl font-bold">Explore the Power of Real-Time Financial Data</h2>
         </div>
         <p className="text-xl lg:w-1/2">Our financial dashboard provides you with real-time data that empowers your decision-making. Customize reports to fit your specific needs, ensuring you have the insights that matter most. Enjoy a user-friendly interface designed for efficiency and ease of use.</p>
      </div>
      <div className="flex flex-col justify-between items-center gap-10 sm:gap-20 lg:flex-row">
         {featureData.map((feature,index) => (
            <InsightFeatures
            key={index}
            title={feature.title}
            description={feature.description} />
         ))}
      </div>
      <div className="flex self-center sm:self-start items-center gap-10">
         <Link to="/register"><Button variant="primary">Get Started</Button></Link>
         <Link to="/login" className="hover:underline cursor-pointer">Log In</Link>
      </div>
   </div>
  )
}

export default Insights
