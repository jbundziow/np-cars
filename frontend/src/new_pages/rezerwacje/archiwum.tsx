import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const ReservationArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Archiwum rezerwacji" />
      <p>Archiwum rezerwacji</p>
      </>
    );
  };
  
  export default ReservationArchive