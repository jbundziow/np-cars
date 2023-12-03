
type httpMethods = 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT';
const fetchData = async (method: httpMethods, url: string, setData: Function, setWarning: Function, setError: Function ) => {
    try {
        const response = await fetch(url, {
            method: method
        });
        if (!response.ok) {
          const responseJSON = await response.json();
          if(responseJSON.status === 'fail') {
            setWarning(responseJSON.data);
            setData(responseJSON);
            setError(null);
          }
          else {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
        }
        else {
          let responseData = await response.json();
          setData(responseData);
          setError(null);
        }
      }
      catch(err: any) {
        setError(err.message);
        setData(null);
      } 
    
}

export default fetchData;