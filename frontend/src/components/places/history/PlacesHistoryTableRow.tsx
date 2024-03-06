import { dateFormatterAsObject } from "../../../utilities/dateFormatter";
import { db_Place } from "../../../types/db_types";
import EditButton from "../../general/buttons/EditButton";
import useAuth from "../../../hooks/useAuth";
import PlaceSpan from "../../general/spanElements/PlaceSpan";
import StyledSpan from "../../general/spanElements/StyledSpan";




interface PlacesHistoryTableRowProps {
    placeData: db_Place;
  }

const PlacesHistoryTableRow = (props: PlacesHistoryTableRowProps) => {





    const { auth } = useAuth();

    
    return (
    <>
    
    <tr className="hover:bg-gray-2 dark:hover:bg-meta-4 text-center">

    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'><PlaceSpan placeObj={props.placeData} nullText="#ERR" linkTarget="_self" /></p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm'>
                {props.placeData.placeName}
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
            <p className='dark:text-white text-black text-xs xl:text-sm'>
                {props.placeData.projectName}
            </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm cursor-default'>{props.placeData.status === 'active' ? <StyledSpan color={'success'} text={'Aktywny'}/> : props.placeData.status === 'closed' ? <StyledSpan color={'warning'} text={'Nieaktywny'}/> : <StyledSpan color={'danger'} text={'Zbanowany'}/>}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm'>{props.placeData.id}</p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.placeData.createdAt ? `${dateFormatterAsObject(props.placeData.createdAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.placeData.createdAt ? `${dateFormatterAsObject(props.placeData.createdAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-center">
        <p className='dark:text-white text-black text-xs xl:text-sm text-center'>
            <span className="block">{`${props.placeData.updatedAt ? `${dateFormatterAsObject(props.placeData.updatedAt.toString()).date}` : 'brak'}`}</span>
            <span className="block">{`${props.placeData.updatedAt ? `${dateFormatterAsObject(props.placeData.updatedAt.toString()).time}` : ''}`}</span>
        </p>
        </div>
    </td>
    {auth.userRole === 'admin' ?
    <td className="border-b border-[#eee] py-5 px-2 dark:border-strokedark">
        <div className="flex justify-end space-x-3.5">
            <EditButton linkTo={`/projekty/edycja/${props.placeData.id}`} linkTarget="_self"/>
        </div>
    </td>
    :
    null
    }

    </tr>
    
    </>
    );
  };
  
  export default PlacesHistoryTableRow;