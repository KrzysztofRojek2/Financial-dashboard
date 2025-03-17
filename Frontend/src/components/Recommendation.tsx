const Recommendation = () => {
  return (
    <div id="recommendation" className="bg-[#121826] text-white flex flex-col items-center py-20 px-8 md:px-20 text-center gap-8">
      <img src="webflowlogo.png" className="w-10 rounded-2xl" alt="" />
      <h2 className="text-lg md:text-2xl font-bold lg:w-2/3">"Using this financial dashboard has transformed the way I manage my finances. It's intuitive, insightful, and has saved me countless hours of work!"</h2>
      <div className="flex flex-col gap-5 items-center">
        <img className="w-16 h-16 rounded-full object-cover" src="person1.jpg" alt="" />
        <p className="font-bold">John Doe</p>
        <p className="text-xl">CEO, FinTech Inc.</p>
      </div>
    </div>
  )
}

export default Recommendation
