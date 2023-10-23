import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import ReportFaultFormContainer from '../../components/faults/report/ReportFaultFormContainer';

interface Props {
    documentTitle: string;
  }

const ReportFaultForm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Zgłoś usterkę" />
      <ReportFaultFormContainer carID={3} carFullname='Citroen C4' carImg='https://ocdn.eu/pulscms-transforms/1/1Xbk9kpTURBXy9mNzUwNGQ5YzUwOGFhMDg5NjQzNzBlMDYyMWNlMjI1YS5qcGeSlQM2AM0EAM0CP5MFzQSwzQKk3gACoTABoTEA'/>
      </>
    );
  };
  
  export default ReportFaultForm