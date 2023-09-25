import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const MyReservations = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Moje rezerwacje</h1>
      </>
    );
  };
  
  export default MyReservations