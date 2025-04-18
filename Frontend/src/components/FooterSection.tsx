interface FooterSectionProps {
  header: string;
  points: string[];
}

const FooterSection: React.FC<FooterSectionProps> = ({ header, points }) => {
  return (
    <>
      <h2 className="font-medium pb-2">{header}</h2>
      {points.map((point, index) => (
        <p key={index} className="text-sm cursor-pointer hover:underline">
          {point}
        </p>
      ))}
    </>
  );
};

export default FooterSection;
