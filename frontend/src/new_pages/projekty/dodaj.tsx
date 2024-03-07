import { useEffect} from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import AddNewPlaceFormContainer from '../../components/places/forms/AddNewPlaceFormContainer';

interface Props {
    documentTitle: string;
  }

const AddPlace = (props: Props) => {
    useEffect(() => {document.title = `${props.documentTitle}`}, []);
    return (
      <>
      <Breadcrumb pageName="Dodaj nowy projekt" />
      <AddNewPlaceFormContainer/>
      </>
    );
  };
  
  export default AddPlace