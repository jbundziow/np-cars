import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const ReturnACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />
      </>
    );
  };
  
  export default ReturnACar
  