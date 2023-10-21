import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FaultsStatusDetailsContainer from '../../components/faults/status/details/FaultsStatusDetailsContainer'

interface Props {
    documentTitle: string;
  }

const RepairsStatusDetails = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Status napraw" />
      <FaultsStatusDetailsContainer/>
      </>
    );
  };
  
  export default RepairsStatusDetails