import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RentalsArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Archiwum wypożyczeń</h1>
          <h2>aksdkasd</h2>
          <p>sdasd</p>
      </>
    );
  };
  
  export default RentalsArchive
  