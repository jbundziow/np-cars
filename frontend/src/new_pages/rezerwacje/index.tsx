import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const ReservationsOverview = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Przegląd rezerwacji</h1>
      </>
    );
  };
  
  export default ReservationsOverview