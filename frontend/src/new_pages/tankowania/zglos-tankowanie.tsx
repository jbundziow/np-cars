import { useEffect} from 'react';

interface Props {
    documentTitle: string;
  }

const ReportRefueling = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
          <h1>Zgłoś tankowanie auta</h1>
      </>
    );
  };
  
  export default ReportRefueling