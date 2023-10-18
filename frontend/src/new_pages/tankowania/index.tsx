import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import RefuelingOverviewTable from '../../components/refuelings/overview/RefuelingsOverviewTable';

interface Props {
    documentTitle: string;
  }

const RefuelingOverview = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Przegląd zatankowania aut" />
      <RefuelingOverviewTable/>
      </>
    );
  };
  
  export default RefuelingOverview