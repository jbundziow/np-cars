import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const FaultsArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Archiwum usterek" />
      </>
    );
  };
  
  export default FaultsArchive