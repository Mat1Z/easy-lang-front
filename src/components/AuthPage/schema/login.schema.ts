import * as yup from 'yup';

const loginSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Min length is 6 symbols").required("Password is required"),
});

export default loginSchema