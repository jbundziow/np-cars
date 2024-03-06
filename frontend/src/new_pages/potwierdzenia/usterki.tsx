import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const FaultsConfirm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Zgłoszone usterki wymagające potwierdzenia" />
      </>
    );
  };
  
  export default FaultsConfirm