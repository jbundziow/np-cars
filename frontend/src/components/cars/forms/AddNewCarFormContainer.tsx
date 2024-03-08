import { useState } from "react";
import OperationResult from "../../general/OperationResult";
import DOMAIN_NAME from "../../../utilities/domainName";
import { warnings } from "../../../types/common";
import { FormPageStatus } from "../../../types/enums";






const AddNewCarFormContainer = () => {



  const [warnings, setWarnings] = useState<warnings[]>([{en: 'Reason unknown. Unable to load error codes from server.', pl: 'Powód nieznany. Nie udało się wczytać kodów błędów z serwera.'}])
  const [pageState, setPageState] = useState<FormPageStatus>(FormPageStatus.FillingTheForm)


    const [brand, setBrand] = useState<string>('')
    const [model, setModel] = useState<string>('')
    const [type, setType] = useState<string>('passengerCar')
    const [image, setImage] = useState<string>('')
    const [plateNumber, setPlateNumber] = useState<string>('')
    const [hasFuelCard, setHasFuelCard] = useState<boolean>(false)
    const [fuelCardPIN, setFuelCardPIN] = useState<number | ''>('')
    const [fuelType, setFuelType] = useState<string>('diesel')
    const [tankCapacity, setTankCapacity] = useState<number | ''>('')
    const [loadCapacity, setLoadCapacity] = useState<number | ''>('')
    const [nextInspectionDate, setNextInspectionDate] = useState<string>('')
    const [nextInsuranceDate, setNextInsuranceDate] = useState<string>('')
    // const [availabilityStatus, setAvailabilityStatus] = useState<string>('available')
    // const [availabilityDescription, setAvailabilityDescription] = useState<string>('')







    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file selected by the user
        if (file) {
            // Convert the selected file to base64 string or any other format you need
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result as string;
                setImage(imageData);
            };
            reader.readAsDataURL(file);
        }
    };




  




    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const finalFuelCardPIN = hasFuelCard ? fuelCardPIN : null;
        const formData = {
            brand,
            model,
            type,
            image,
            plateNumber,
            hasFuelCard,
            fuelCardPIN: finalFuelCardPIN,
            fuelType,
            tankCapacity,
            loadCapacity,
            nextInspectionDate,
            nextInsuranceDate,
            availabilityStatus: 'available',
            availabilityDescription: null,
        }

        try {

        const response = await fetch(`${DOMAIN_NAME}/admin/cars`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'include',
            
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            setPageState(FormPageStatus.FormWasSentCorrectly);
        } else {
            const responseJSON = await response.json();
            if(responseJSON.status === 'fail') {
            setPageState(FormPageStatus.FailOnSendingForm);
            setWarnings(responseJSON.data);
            }
            else {
            setPageState(FormPageStatus.ErrorWithSendingForm);
            }
        }
        }
        catch (error) {
        setPageState(FormPageStatus.ErrorWithSendingForm);
        }
  };


    

    return (
        <>

        <div className="flex flex-col items-center">





            <div className="rounded-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-800 p-2 text-black dark:text-white w-[100%] xl:w-[80%]">
                {pageState === FormPageStatus.FillingTheForm ?
                
                
                
                <form onSubmit={submitHandler} className='p-2'>





                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Marka
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Toyota`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                    />
                    </div>








                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Model
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. Avensis`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                    />
                    </div>








                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Typ samochodu
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                            >
                                <option value="passengerCar">Samochód osobowy</option>
                                <option value="bus">Bus</option>
                                <option value="truck">Samochód ciężarowy</option>
                            </select>
                        </div>
                    </div>










                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Zdjęcie samochodu (1280x720 pikseli)
                    </label>
                    <input
                        required
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        onChange={handleImageChange}
                    />
                    </div>








                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Numer rejestracyjny samochodu
                    </label>
                    <input
                        required
                        type="text"
                        placeholder={`np. FNW22938`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={plateNumber}
                        onChange={e => setPlateNumber(e.target.value)}
                    />
                    </div>







                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Czy auto posiada kartę paliwową?
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={hasFuelCard ? 'true' : 'false'}
                            onChange={(e)=>setHasFuelCard(e.target.value === 'true')}
                            >
                                <option value="true">Tak</option>
                                <option value="false">Nie</option>
                            </select>
                        </div>
                    </div>











                    {hasFuelCard === true ?
                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Pin do karty paliwowej:
                    </label>
                    <input
                        type="number"
                        placeholder={`np. 4821`}
                        step={1}
                        max={999999}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={fuelCardPIN}
                        onChange={e => setFuelCardPIN(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && fuelCardPIN === 0) {
                            setFuelCardPIN('');
                            }
                        }}
                    />
                    </div>
                    :
                    null
                    }












                    <div className="col-span-1 flex flex-col sm:flex-row mb-10 sm:mb-5">
                        <label className="block text-black dark:text-white col-span-2 sm:self-center mb-3 sm:mb-0">
                        Typ paliwa
                        </label>

                        <div className="sm:ml-3 relative z-20 bg-white dark:bg-form-input">
                            <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#3C50E0" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/></svg>
                            </span>
                            <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                            value={fuelType}
                            onChange={(e)=>setFuelType(e.target.value)}
                            >
                                <option value="diesel">Diesel</option>
                                <option value="petrol">Benzyna</option>
                            </select>
                        </div>
                    </div>












                    <div className='mb-5'>
                    <label className="mb-3 block text-black dark:text-white">
                        Pojemność zbiornika paliwa (w litrach)
                    </label>
                    <input
                        required
                        type="number"
                        step="1"
                        max="1600"
                        placeholder={`Posłuży ona do obliczenia pozostałej ilości paliwa w baku. Jednostka to litr.`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={tankCapacity}
                        onChange={e => setTankCapacity(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && tankCapacity === 0) {
                            setTankCapacity('');
                            }
                        }}
                    />
                    </div>











                    <div className='mb-5'>
                    <label className="mb-3 block text-black dark:text-white">
                        Maksymalna dopuszczalna ładowność (w kilogramach)
                    </label>
                    <input
                        required
                        type="number"
                        step="1"
                        max="40000"
                        placeholder={`Obliczysz ją z dowodu rejestracyjnego pojazdu. Wzór to F.1 - G.`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={loadCapacity}
                        onChange={e => setLoadCapacity(Number(e.target.value))}
                        onKeyDown={(e)=>{
                        const { key } = e;
                        if ((key === 'Backspace' || key === 'Delete') && loadCapacity === 0) {
                            setLoadCapacity('');
                            }
                        }}
                    />
                    </div>













                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data następnego przeglądu technicznego:
                      </label>
                      <input
                        required
                        type="date"
                        value={nextInspectionDate}
                        onChange={(e)=>setNextInspectionDate(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>















                    <div className='mb-5'>
                      <label className="mb-3 block text-black dark:text-white">
                        Data końca ubezpieczenia OC lub AC:
                      </label>
                      <input
                        required
                        type="date"
                        value={nextInsuranceDate}
                        onChange={(e)=>setNextInsuranceDate(e.target.value)}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>












                    <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Status dostępności
                    </label>
                    <input
                        disabled
                        type="text"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-not-allowed disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary text-success font-extrabold"
                        value="Dostępny"
                    />
                    </div>













                    {/* <div className="mb-5">
                    <label className="mb-3 block text-black dark:text-white">
                        Komentarz dotyczący dostępności (opcjonalny):
                    </label>
                    <input
                        type="text"
                        placeholder={`np. Auto wróci od mechanika 21.07.2024r.`}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                        value={availabilityDescription}
                        onChange={e => setAvailabilityDescription(e.target.value)}
                    />
                    </div> */}















                    <div className='flex justify-center mb-2'>
                    <button className="flex w-90 justify-center rounded bg-primary p-3 font-medium text-gray hover:opacity-90" type='submit'>
                        Dodaj nowy samochód
                    </button>
                    </div>
                    
                    
                    
                    
                    
                </form>
                :
                pageState === FormPageStatus.FormWasSentCorrectly ?
                <OperationResult status={'success'} title={'Pomyślnie dodano nowy samochód 👍'} description={'Ma on status "Dostępny" i jest widoczny dla pozostałych użytkowników.'} showButton={true} buttonText={'Dalej'} buttonLinkTo={`/samochody/zestawienie`}/>
                :
                pageState === FormPageStatus.ErrorWithSendingForm ?
                <OperationResult status={'error'} title={'Wystąpił błąd podczas dodawania samochodu 😭'} description={'Spróbuj ponownie później lub skontaktuj się z administratorem.'} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                pageState === FormPageStatus.FailOnSendingForm ?
                <OperationResult status={'warning'} title={'Wystąpiły błędy podczas dodawania samochodu 🤯'} warnings={warnings} showButton={true} buttonText={'Spróbuj ponownie'} onClick={()=> setPageState(FormPageStatus.FillingTheForm)}/>
                :
                ''
                }
            </div>
            
        </div>
         
        
        
        </>
    );
  };
  
  export default AddNewCarFormContainer