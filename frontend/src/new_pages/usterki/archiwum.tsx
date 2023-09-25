import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const FaultsArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Archiwum napraw aut</h1>
      </>
    );
  };
  
  export default FaultsArchive