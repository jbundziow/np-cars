

type ModalWarningProps = {
  showModal: boolean,
  setShowModal: Function,
  title: string,
  bodyText: string,
  cancelBtnText: string,
  acceptBtnText: string,
  callback: Function,
}


export default function ModalWarning(props: ModalWarningProps) {
  return (
    <>
      {props.showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none shadow-2xl" id="outside-modal"
            onClick={(e)=> {if(e.currentTarget.id === 'outside-modal') {props.setShowModal(false)}}}
          > {/* close modal after clicking outside */}

            <div className="relative w-96 2xl:w-auto my-6 max-w-3xl mx-8">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-black outline-none focus:outline-none border-l-6 border-warning">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-warning rounded-t">
                  <h3 className="text-3xl font-semibold text-warning">
                    {props.title}
                    
                  </h3>
                  <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                      <svg
                        width="19"
                        height="16"
                        viewBox="0 0 19 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                          fill="#FBBF24"
                        ></path>
                      </svg>
                    </div>
                  {/* close button */}
                  {/* <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => props.setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button> */}
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-black dark:text-white text-lg leading-relaxed">
                    {props.bodyText}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-between p-6 border-t border-solid border-warning rounded-b">
                  <button
                    className="text-green-500 hover:text-green-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.setShowModal(false)}
                  >
                    {props.cancelBtnText}
                  </button>
                  <button
                    className="bg-[#F87171] text-white active:bg-warning font-bold uppercase text-sm px-6 py-3 rounded hover:bg-[#f03535] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {props.setShowModal(false); props.callback()}}
                  >
                    {props.acceptBtnText}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div> {/* MODAL SHADOW AROUND */}
        </>
      ) : null}
    </>
  );
}