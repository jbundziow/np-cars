import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const ReservationArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Archiwum rezerwacji</h1>
      </>
    );
  };
  
  export default ReservationArchive