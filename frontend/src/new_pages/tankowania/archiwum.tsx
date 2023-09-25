import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RefuelingArchive = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Archiwum tankowań aut</h1>
      </>
    );
  };
  
  export default RefuelingArchive