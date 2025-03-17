import PortfolioAssetChart from '../components/AssetChart'
import AssetsWrapper from "../components/AssetsWrapper";

const Assets = () => {
 
  return (
   <>
    <div className="div-primary p-10">
      <PortfolioAssetChart height={550} />
    </div>
    <AssetsWrapper />
   </>   
  )
}

export default Assets
