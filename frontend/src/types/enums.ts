export enum FormPageStatus {
    FillingTheForm,
    FormWasSentCorrectly,
    ErrorWithSendingForm,
    FailOnSendingForm
  }

export enum EditFormPageStatus {
    FillingTheForm,
    DataSuccessfullyEdited,
    DataSuccessfullyDeleted,
    ErrorWithSendingForm,
    FailOnSendingForm
  }


  export enum generateExcelPageState {
    initial,
    loading,
    ready,
  }