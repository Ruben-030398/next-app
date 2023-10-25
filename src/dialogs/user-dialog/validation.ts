import {  number, object, string } from "yup";

export default object({
  name:  string().required('please add name'),
  address: string().required('please add address'),
  company: string().required('please add company'),
  email: string().email().required('please add email'),
  phone: number().required('please add phone number'),
  username: string().typeError('Please use only digits').required('please add username'),
});