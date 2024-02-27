import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Alert from '../../components/general/buttons/Alert';

interface Props {
    documentTitle: string;
  }

const RefuelingArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Archiwum tankowań samochodów" />
      <Alert/>
      </>
    );
  };
  
  export default RefuelingArchive