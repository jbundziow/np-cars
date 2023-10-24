import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import MakeAReservationTable from '../../components/reservations/make/MakeAReservationTable';

interface Props {
    documentTitle: string;
  }

const MakeAReservation = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Dokonaj rezerwacji" />
      <MakeAReservationTable/>
      </>
    );
  };
  
  export default MakeAReservation