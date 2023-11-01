import FaultsStatusCard from "./FaultsStatusCard";


type dataSchema = {
  id: number,
  brand: string,
  model: string,
  imgPath: string,
  availabilityStatus: 'available' | 'notAvailable' | 'rented' | 'onService' | 'damaged',
  pending: number,
  accepted: number,
  finished: number,
  cancelled: number,
}

interface FaultsStatusContainerProps {
  data:dataSchema[];
}


const FaultsStatusContainer = (props: FaultsStatusContainerProps) => {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
        {props.data.map(data => 
          <FaultsStatusCard
          carID={data.id}
          carBrand={data.brand}
          carModel={data.model}
          carImg={data.imgPath}
          numberOfPendingFaults={data.pending}
          numberOfFaultsInProgress={data.accepted}
          numberOfClosedFaults={data.finished}
          />
          )}
          

      </div>
      
    );
  };
  
  export default FaultsStatusContainer;
  