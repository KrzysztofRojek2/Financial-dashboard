interface EmpowerFeatureProps {
   title: string;
   description: string;
}
const EmpowerFeature: React.FC<EmpowerFeatureProps> = ({ title, description}) => {
  return (
   <div className="sm:w-1/2">
      <h3 className="text-xl xl:text-2xl font-bold">{title}</h3>
      <p className="text-base md:text-xl">{description}</p>
   </div>
  )
}

export default EmpowerFeature
