import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FaultDetailsContainer from '../../components/faults/details/FaultDetailsContainer'

interface Props {
    documentTitle: string;
  }

const RepairsStatusDetails = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Szczegóły dotyczące usterki" />
      <FaultDetailsContainer/>
      </>
    );
  };
  
  export default RepairsStatusDetails