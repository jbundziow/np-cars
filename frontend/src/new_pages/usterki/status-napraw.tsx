import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FaultsStatusContainer from '../../components/faults/status/FaultsStatusContainer';

interface Props {
    documentTitle: string;
  }

const RepairsStatus = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Status napraw" />
      <FaultsStatusContainer/>
      </>
    );
  };
  
  export default RepairsStatus