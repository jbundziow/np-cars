import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FaultsReportTable from '../../components/faults/report/FaultsReportTable';

interface Props {
    documentTitle: string;
  }

const ReportFault = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Zgłoś usterkę" />
      <FaultsReportTable/>
      </>
    );
  };
  
  export default ReportFault