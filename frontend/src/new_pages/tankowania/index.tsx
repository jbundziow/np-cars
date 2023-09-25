import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const RefuelingOverview = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Przegląd aut</h1>
      </>
    );
  };
  
  export default RefuelingOverview