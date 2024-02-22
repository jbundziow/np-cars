type styledSpanProps = {
    color: 'danger' | 'warning' | 'success',
    text: string,
  }
  
  
  export default function StyledSpan(props: styledSpanProps) {
    return (
    <span className={`inline-flex text-center rounded-full bg-opacity-10 py-1 px-3 font-medium ${props.color === 'danger' ? 'bg-danger text-danger' : props.color === 'success' ? 'bg-success text-success'  : 'bg-warning text-warning'}`}>{props.text}</span>
    )
  }