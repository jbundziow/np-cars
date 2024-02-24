import { useEffect, useState } from "react"
import { ApiResponse } from "../../types/common";
import { CSVLink } from "react-csv";


type GenerateExcelProps = {
    url: string,
  }
  
  
  export default function GenerateExcel(props: GenerateExcelProps) {
    const [data1, setData1] = useState<ApiResponse>();  //rentals data from backend

    useEffect(() => {
        const getData = async () => {

            

            try {
                const response = await fetch(props.url, {
                    method: 'GET',
                    credentials: 'include'
                });
                const responseJSON = await response.json();
        
                if(responseJSON.status === 'success') {
                  setData1({status: 'success', data: responseJSON});
                }
            }
            
            catch(err: any) {
                ;
                }


        }

        getData()
      }, [])


      const headers = [
        { label: "First Name", key: "travelDestination" },
        { label: "Last Name", key: "placeID" },
        { label: "Email", key: "email" }
      ];
      
      const data = [
        { firstname: null, lastname: "Tomi", email: "ah@smthing.co.com" },
        { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
        { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
      ];

console.log(data1?.data.data[1]);
const dd = data1?.data.data || [];
    return (
        <div>
        <h1>GenerateExcel</h1>
        <CSVLink data={dd} headers={headers} separator={";"}>
        Download me
      </CSVLink>;
        </div>
        
    )
  }
