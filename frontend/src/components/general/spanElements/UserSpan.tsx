import { Link } from "react-router-dom"


type usersData = {
  id: number,
  email: string,
  gender: 'male' | 'female',
  name: string,
  surname: string,
  employedAs: string,
  avatarPath: string | null,
  role: 'unconfirmed' | 'banned' | 'admin' | 'user',
}

type userSpanProps = {
    userObj: usersData | undefined,
    nullText: string,
    linkTarget: '_blank' | '_self'
  }
  
  
  export default function UserSpan(props: userSpanProps) {
    


    return (
      <>
      {props.userObj
      ?
      <span className="whitespace-nowrap">
        {props.userObj.role === 'admin' ?
        <span className="rounded-lg bg-success bg-opacity-10 py-0 px-1 font-medium text-success cursor-default">Admin</span>
        :
        props.userObj.role === 'banned' ?
        <span className="rounded-lg bg-danger bg-opacity-10 py-0 px-1 font-medium text-danger cursor-default">Zabnowany</span>
        : ''}
        &nbsp;
        <Link to={`/uzytkownicy/${props.userObj.id}`} target={props.linkTarget}>
        <span className="text-black dark:text-white underline decoration-[0.5px] underline-offset-1">{props.userObj.name} {props.userObj.surname}
        </span>
        </Link>
      </span>
      :
      <span className="inline-flex rounded-full bg-warning bg-opacity-10 py-1 px-3 font-medium text-warning">{props.nullText}</span>
      }
      </>
    )
  }