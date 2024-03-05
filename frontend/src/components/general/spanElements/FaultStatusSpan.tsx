
import { db_Fault } from "../../../types/db_types"



type FaultStatusSpanProps = {
    status: db_Fault["status"],
  }
  
  
  export default function FaultStatusSpan(props: FaultStatusSpanProps) {
    


    return (
      <>
        {props.status === 'pending' ?
            <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">
                Do akceptacji
            </span>
        : props.status === 'accepted' ?
            <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-warning cursor-default">
                W trakcie
            </span>
        : props.status === 'finished' ?
            <span className="inline-flex rounded-full bg-success bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-success cursor-default">
                Rozwiązana
            </span>
        : props.status === 'cancelled' ?
            <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">
                Anulowana
            </span>
        :
            <span className="inline-flex rounded-full bg-danger bg-opacity-10 py-1 px-3 text-xs sm:text-base font-medium text-danger cursor-default">
                ##Błąd!
            </span>
        }
      </>
    )
  }