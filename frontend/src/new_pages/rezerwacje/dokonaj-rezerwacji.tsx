import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const MakeAReservation = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Dokonaj rezerwacji</h1>
      </>
    );
  };
  
  export default MakeAReservation