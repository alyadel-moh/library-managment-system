export default interface User {
  username: string;
  password: string;
  firstName: string;
  lastname: string;
  phoneNumber: string;
  shippingAddress: string;
  emailAddress: string;
  photoUrl?: string;
}