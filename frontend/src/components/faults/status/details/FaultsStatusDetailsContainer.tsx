import { Link } from "react-router-dom";
import FaultsStatusDetailsAccordion from "./FaultsStatusDetailsAccordion";
import { db_Car_basic } from "../../../../types/db_types";
import CarRowInFormImg from "../../../general/CarRowInFormImg";

type faultsDataArr = {
  id: number,
  title: string,
}

type dataSchema = {
  carData: db_Car_basic,
  pending: faultsDataArr[],
  accepted: faultsDataArr[],
  finished: faultsDataArr[],
  cancelled: faultsDataArr[]
}

interface FaultsStatusDetailsContainerProps {
  data: dataSchema;
}

const FaultsStatusDetailsContainer = (props: FaultsStatusDetailsContainerProps) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-1 xl:grid-cols-4">

        <div className="flex flex-col items-center pb-10">

        <CarRowInFormImg carData={props.data.carData}/>

        <Link
        to={`/usterki/zglos/${props.data.carData.id}`}
        className={`inline-flex items-center justify-center rounded-full bg-primary py-2 px-7 text-center text-base font-medium text-white hover:bg-opacity-90 lg:px-6 xl:px-8 mt-2`}
        >
        Zgłoś nową usterkę
        </Link>
        </div>

        <div className='col-span-3'>
        <FaultsStatusDetailsAccordion pending={props.data.pending} accepted={props.data.accepted} finished={props.data.finished} cancelled={props.data.cancelled}/>
        </div>

      </div>
      
    );
  };
  
  export default FaultsStatusDetailsContainer;
  