import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const RefuelingsConfirm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Tankowania użytkowników wymagające potwierdzenia" />
      </>
    );
  };
  
  export default RefuelingsConfirm