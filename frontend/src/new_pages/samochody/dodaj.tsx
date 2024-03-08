import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import AddNewCarFormContainer from '../../components/cars/forms/AddNewCarFormContainer';

interface Props {
    documentTitle: string;
  }

const AddCar = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Dodaj nowy samochód" />
      <AddNewCarFormContainer/>
      </>
    );
  };
  
  export default AddCar