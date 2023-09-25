import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const ReturnACar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Oddaj auto</h1>
      </>
    );
  };
  
  export default ReturnACar
  