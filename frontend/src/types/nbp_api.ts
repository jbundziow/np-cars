//https://api.nbp.pl/


export type nbpAPIrates = {
    no: string,
    effectiveDate: string,
    bid: number,
    ask: number
  }

export type nbp_API_response = {
    table: string,
    currency: string,
    code: string,
    rates: Array<nbpAPIrates>
  }