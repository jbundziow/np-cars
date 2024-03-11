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

export enum EditUserDataPageStatus {
  FillingTheForm,
  ErrorWithSendingForm,
  FailOnSendingForm,
  UserDataSuccessfullyEdited,
  UserDataSuccessfullyDeleted,
  ImageSuccessfullyChanged,
  LinkToPasswordResetSuccessfullySent,
  ChangeEmailForm,
  LinkToEmailChangeSuccessfullySent,
}


  export enum generateExcelPageState {
    initial,
    loading,
    ready,
  }