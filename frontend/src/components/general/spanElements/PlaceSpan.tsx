import { Link } from "react-router-dom"


type placesData = {
    id: number,
    projectCode: string,
    placeName: string,
    projectName: string,
    status: 'active' | 'banned',
  }

type placeSpanProps = {
    placeObj: placesData | undefined,
    nullText: string,
    linkTarget: '_blank' | '_self'
  }
  
  
  export default function PlaceSpan(props: placeSpanProps) {
    


    return (
      <>
      {props.placeObj
      ?
      <span><Link to={`/projekty/${props.placeObj.id}`} target={props.linkTarget}><span className="underline decoration-[0.5px] underline-offset-1">{props.placeObj.projectCode}</span></Link></span>
      :
      <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{props.nullText}</span>
      }
      </>
    )
  }