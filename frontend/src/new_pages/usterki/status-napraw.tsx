import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const RepairsStatus = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Status napraw" />
      <p>Auto // 2 zgłoszonych, 1 w trakcie, 6 rozwiązanych, BTN szczegóły</p>
      </>
    );
  };
  
  export default RepairsStatus