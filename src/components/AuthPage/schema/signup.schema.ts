import * as yup from 'yup';

const signupSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email address").required("Email is required"),
  password: yup.string().min(6, "Min length is 6 symbols").required("Password is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
});

export default signupSchema