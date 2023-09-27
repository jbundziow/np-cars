import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const RentACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />
      </>
    );
  };
  
  export default RentACar
  