export interface variablesType {
  name: string
  newEmail: string
  profile: string
  image: string
  specialty: string
  address: string
  newPass: string
  age: number | string
  plan: string
  contents: string
  email: string
  pass: string
  storage: string
  coachName: string
  planName: string
  planContents: string
  coachID: string
  userID: string
}
export interface stateType {
  age: number | string
  address: string
  coachSpecialty: string
  coachImage: string
  loginUserName: string
  loginUserMail: string
  loginUserPass: string
  loginUserID: string
  loginCoachID: string
  profile: string
  targetUserID: string
  targetCoachID: string
  searchText: string
  userNum: number
  messages: Array<string>
  userContractID: string
  coachContractID: string
  provider: any
  image: string
  name: string
  email: string
  pass: string
}
export interface coachType {
  name: string
  image: any
  age: number
  specialty: string
  address: string
  profile: string
  email: string
  pass: string
}
export interface planType {
  coachName: string
  name: string
  contents: string
  review: string
}
export interface makePlanType {
  name: string
  contents: string
  review: string
}
export interface contractType {
  coachName: string
  userName: string
  planName: string
  contents: string
  coachID: string
  userID: string
}
export interface coachContractType {
  userName: string
  userProfile: string
  planName: string
  contents: string
  userID: string
}
export interface userContractType {
  coachName: string
  planName: string
  contents: string
  coachID: string
}
export interface rankType {
  coachName: string
  userNum: number
}
