import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const ReportFault = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Zgłoś usterkę auta</h1>
      </>
    );
  };
  
  export default ReportFault