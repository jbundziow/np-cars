
interface ApiResponse {
  status: 'success' | 'fail' | 'error',
  data?: any,
  message?: any,
}



const fetchData = async (url: string, setFailData: Function, isFail: Function, isError: Function ): Promise<ApiResponse> => {
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        const responseJSON = await response.json();

        if(responseJSON.status === 'success') {
          return responseJSON;
        }
        else if(responseJSON.status === 'fail') {
          setFailData(responseJSON)
          isFail(true);
          return responseJSON;
        }
        else { //responseJSON.status === 'error')
          isError(true);
          return responseJSON;
        }
      }
      catch(err: any) {
        isError(true);
        return {status: 'error', message: err?.message};
      }
}


export default fetchData;