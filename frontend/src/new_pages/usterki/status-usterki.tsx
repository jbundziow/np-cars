// import { useEffect} from 'react';
// import Breadcrumb from '../../components/Breadcrumb';
// import FaultDetailsContainer from '../../components/faults/details/FaultDetailsContainer'

// interface Props {
//     documentTitle: string;
//   }

// const RepairsStatusDetails = (props: Props) => {
//     useEffect(() => {document.title = `${props.documentTitle}`}, []);
//     return (
//       <>
//       <Breadcrumb pageName="Szczegóły dotyczące usterki" />
//       <FaultDetailsContainer
//       id={1}
//       carID={1}
//       carFullname={'Mercedes Sprinter'}
//       carImg={'https://upload.wikimedia.org/wikipedia/commons/2/2f/Mercedes_sprinter_1_v_sst.jpg'}
//       userID={1}
//       userFullname={'Andrzej Nowak'}
//       moderatorID={2}
//       moderatorFullname={'Jan Kowalski'}
//       lastChangeAt={'12.10.2023 14:20'}
//       createdAt={'11.10.2023 12:34'}
//       title={'Porysowany zderzak'}
//       description={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta inventore quia numquam obcaecati nemo quaerat id aut, nobis animi possimus eum iure necessitatibus voluptate voluptatibus placeat beatae, nam, nulla quos.'}
//       status={'pending'} //'pending' | 'accepted' | 'finished' | 'cancelled';
//       resultDesctiption={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta inventore quia numquam obcaecati nemo quaerat id aut, nobis animi possimus eum iure necessitatibus voluptate voluptatibus placeat beatae, nam, nulla quos.'}
//       repairCost={881.23}
//       />
//       </>
//     );
//   };
  
//   export default RepairsStatusDetails


import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../common/Loader";
import OperationResult from "../../components/general/OperationResult";
import Breadcrumb from '../../components/Breadcrumb';

import FaultDetailsContainer from '../../components/faults/details/FaultDetailsContainer'

interface Props {
    documentTitle: string;
  }

interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

const RepairsStatusDetails = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const params = useParams();

    const [data, setData] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:3000/faults/getall/${params.carID}?basicdata=true`
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData);
          setError(null);
        } catch(err: any) {
          setError(err.message);
          setData(null);
        } finally {
          setLoading(false);
          
        }  
      }
      getData()
    }, [])


    return (
      <>
      <Breadcrumb pageName="Zgłoś usterkę" />

      {loading === true ? <Loader/> : (error === null && data?.status==='success' && data?.data !== null) ? <FaultDetailsContainer data={data.data}/> : <OperationResult status="error" title="Wystąpił problem podczas ładowania zawartości." description="Skontaktuj się z administratorem lub spróbuj ponownie później." showButton={false}/>}
      
      </>
    );
  };
  
  export default RepairsStatusDetails;