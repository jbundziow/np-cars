import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const CarsInsurances = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Terminy obowiązywania OC/AC dla samochodów" />
      </>
    );
  };
  
  export default CarsInsurances;