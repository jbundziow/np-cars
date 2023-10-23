import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import {useParams} from "react-router-dom";
import RefuelingReportForm from '../../components/refuelings/report/RefuelingReportForm';
          

interface Props {
    documentTitle: string;
  }

const ReportRefueling = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);

    const {id} = useParams();

    return (
      <>
      <Breadcrumb pageName="Zgłoś zatankowanie samochodu" />
      <RefuelingReportForm carID={2} carFullname='Skoda Fabia' carImg='https://www.autocentrum.pl/MjAwNy5qYgsgFThKGgpvH2NNbFZUEmAMKBsrVlQDOQMiGytWAEl0WXJDfhsASX8JdhMvSFdDLF4lRHpMGh0oGjINL1RbGDdHLA49FVwCN0cyHCEdVFwrCyMeL1QESHRTbEV-SQJfJxomVTM'/>
      </>
    );
  };
  
  export default ReportRefueling