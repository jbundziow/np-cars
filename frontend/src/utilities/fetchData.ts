
// type httpMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT';


interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}

// type responseSchema = {
//   isSuccess: boolean,
//   isFail: boolean,
//   isError: boolean,
//   data: ApiResponse
// }


const fetchData = async (url: string, setFailData: Function, isFail: Function, isError: Function ): Promise<ApiResponse> => {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const responseJSON = await response.json();

        if(responseJSON.status === 'success') {
          // setData(responseJSON)
          return responseJSON;
        }
        else if(responseJSON.status === 'fail') {
          // setData(responseJSON)
          setFailData(responseJSON)
          isFail(true);
          return responseJSON;
        }
        else { //responseJSON.status === 'error')
          // setData(responseJSON)
          isError(true);
          return responseJSON;
        }
      }
      catch(err: any) {
        // setData({status: 'error', message: err?.message});
        isError(true);
        return {status: 'error', message: err?.message};
      }
      
    
}

export default fetchData;