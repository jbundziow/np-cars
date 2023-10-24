import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RentalsReturnCarTable from '../../components/rentals/return/RentalsReturnCarTable';

interface Props {
    documentTitle: string;
  }

const ReturnACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Oddaj auto" />
      <RentalsReturnCarTable/>
      </>
    );
  };
  
  export default ReturnACar
  