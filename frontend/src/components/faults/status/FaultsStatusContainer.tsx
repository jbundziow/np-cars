import useAuth from "../../../hooks/useAuth";
import { db_Car_basic } from "../../../types/db_types";
import FaultsStatusCard from "./FaultsStatusCard";


type dataSchema = db_Car_basic & { pending: number, accepted: number, finished: number, cancelled: number }

interface FaultsStatusContainerProps {
  data:dataSchema[] | [];
}


const FaultsStatusContainer = (props: FaultsStatusContainerProps) => {

  const { auth } = useAuth();



    return (
      <>
      {props.data && props.data.length >0
      ?
      <div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
        {props.data.filter(data => data.availabilityStatus !== 'banned').map(data => 
          <FaultsStatusCard
          carData={ { id: data.id, brand: data.brand, model: data.model, imgPath: data.imgPath, availabilityStatus: data.availabilityStatus } }
          numberOfPendingFaults={data.pending}
          numberOfFaultsInProgress={data.accepted}
          numberOfClosedFaults={data.finished}
          />
        )}
      </div>

      {auth.userRole === 'admin' ?
      <>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white mt-40 mb-3">Auta zbanowane przez admistratorów:</h2>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 2xl:grid-cols-3 2xl:gap-7.5">
          {auth.userRole === 'admin' && props.data.filter(data => data.availabilityStatus === 'banned').map(data => 
            <FaultsStatusCard
            carData={ { id: data.id, brand: data.brand, model: data.model, imgPath: data.imgPath, availabilityStatus: data.availabilityStatus } }
            numberOfPendingFaults={data.pending}
            numberOfFaultsInProgress={data.accepted}
            numberOfClosedFaults={data.finished}
            />
          )}
        </div>
      </>
      :
      null
      }

      </div>
 
      
      :
      <div className=" md:block rounded-sm border border-stroke bg-white px-1 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark md:px-7.5 xl:pb-2">
        <div className="max-w-full overflow-x-auto">
          <p className="text-black dark:text-white text-md text-center mb-4">Nie odznaleziono żadnych aut w bazie danych.</p>  
        </div>
      </div>
      }
      </>
    );
  };
  
  export default FaultsStatusContainer;
  