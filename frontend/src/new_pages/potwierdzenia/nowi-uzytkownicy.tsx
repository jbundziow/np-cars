import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
    documentTitle: string;
  }

const NewUsersConfirm = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Nowi użytkownicy do potwierdzenia" />
      </>
    );
  };
  
  export default NewUsersConfirm