
import { TEAlert } from "tw-elements-react";


export type alertOptionsObject = {
  showAlert: boolean,
  color: 'success' | 'warning' | 'danger'
  text: string,
  dismiss_button: boolean,
  autohide: boolean,
  delay_ms?: number,
  key: number,
}

type FixedAlertProps = {
  options: alertOptionsObject;
}


export default function FixedAlert(props: FixedAlertProps): JSX.Element {
  
  return (

            <TEAlert
                key={props.options.key}
                className="max-[420px]:max-w-[250px] max-w-[350px]    2xl:w-auto my-6 max-w-3xl mx-auto top-[10%] left-0"
                color={`${props.options.color === 'success' ? 'bg-success' : props.options.color === 'warning' ? 'bg-warning' : 'bg-danger'} text-white`} 
                // staticAlert
                dismiss={props.options.dismiss_button}
                autohide={props.options.autohide}
                delay={props.options.delay_ms}
                open={props.options.showAlert}
            >
                <span className="ml-1">
                {props.options.text}
                </span>
            </TEAlert>


  );
}