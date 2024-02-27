
import { TEAlert } from "tw-elements-react";

export default function Alert(): JSX.Element {
  return (
<div className="fixed top-[8%] left-[3%] sm:left-[20%] md:left-[45%] w-full z-9999 m-2">
{/* <div className="justify-center items-start mt-20 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl"> */}
            <TEAlert
            className="max-w-[350px] 2xl:w-auto my-6 max-w-3xl mx-auto"
                dismiss
                staticAlert
                open={true}
                color="bg-warning text-white"
            >
                <strong className='mr-2'>Błąd!</strong>
                <span className="ml-1">
                Nie udało się usunąć rezerwacji. Spróbuj ponownie później
                </span>
            </TEAlert></div>

  );
}