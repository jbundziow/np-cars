import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RentalsArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Archiwum wypożyczeń</h1>
      </>
    );
  };
  
  export default RentalsArchive
  