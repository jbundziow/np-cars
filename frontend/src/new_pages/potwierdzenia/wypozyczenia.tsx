import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const RentalsConfirm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Wypożyczenia użytkowników wymagające potwierdzenia" />
      </>
    );
  };
  
  export default RentalsConfirm