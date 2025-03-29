interface InsightFeaturesProps {
  title: string;
  description: string;
}

const InsightFeatures: React.FC<InsightFeaturesProps> = ({
  title,
  description,
}) => {
  return (
    <div className="flex flex-col gap-4 lg:gap-10 lg:w-1/3">
      <img src="logo.svg" className="w-16 lg:w-24" alt="" />
      <h3 className=" text-2xl xl:text-3xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default InsightFeatures;
