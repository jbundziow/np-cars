import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RentalsTable from '../../components/rentals/rent/RentalsTable'

interface Props {
    documentTitle: string;
  }

const RentACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Wypożycz samochód" />
      <RentalsTable/>
      </>
    );
  };
  
  export default RentACar
  