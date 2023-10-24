import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ReservationsOverviewTable from '../../components/reservations/overview/ReservationsOverviewTable';

interface Props {
    documentTitle: string;
  }

const ReservationsOverview = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Przegląd rezerwacji" />
      <ReservationsOverviewTable/>
      </>
    );
  };
  
  export default ReservationsOverview