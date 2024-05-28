import { AuthPageProps, LoginFormData, SignupFormData } from "@/shared";
import { Button, TextField } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { PAGE_CONTENT } from "./constants";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import loginSchema from "./schema/login.schema";
import signupSchema from "./schema/signup.schema";
import { useSnackbar } from "notistack";
import api from "@/shared/api/api";
import { login } from "@/shared/util/login";

const DEFAULT_LOGIN_FORM_DATA: LoginFormData = {
  email: "",
  password: "",
};

const DEFAULT_SIGNUP_FORM_DATA: SignupFormData = {
  email: "",
  password: "",
  name: "",
  surname: "",
};

export const AuthPage: FC<AuthPageProps> = ({ authType }) => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const isLogin = authType === "login";

  const initialValues = (
    isLogin ? { ...DEFAULT_LOGIN_FORM_DATA } : { ...DEFAULT_SIGNUP_FORM_DATA }
  ) as SignupFormData & LoginFormData;

  const validationSchema = isLogin ? loginSchema : signupSchema;

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    isSubmitting,
    isValid,
    handleSubmit,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    isInitialValid: false,
    onSubmit: async (values) => {
      try {
        if (isLogin) {
          const hasLoggedIn = await login(values);
          if (hasLoggedIn) {
            push("/");
            enqueueSnackbar("Logged in successfully", { variant: "success" });
          } else {
            enqueueSnackbar("Invalid credentials", { variant: "error" });
          }
        } else {
          const hasSignedUp = await api.signUp(values);
          if (hasSignedUp) {
            push("/auth/login");
            enqueueSnackbar("Signed up successfully", { variant: "success" });
          } else {
            enqueueSnackbar("Couldn't sign in", { variant: "error" });
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    validationSchema,
  });

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col bg-white w-1/2 h-full items-center justify-center">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="font-black text-5xl self-center">
            {PAGE_CONTENT[authType].title}
          </h1>
          <TextField
            label="Email"
            type="email"
            id="email"
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            value={values.email}
            helperText={touched.email && errors.email}
            className="w-[300px] bg-[#f3f3f3]"
          />
          <TextField
            label="Password"
            type="password"
            id="password"
            value={values.password}
            onChange={(e) => handleChange(e)}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            className="w-[300px] bg-[#f3f3f3]"
          />
          {!isLogin && (
            <>
              <TextField
                label="Name"
                type="text"
                id="name"
                value={(values as any).name}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                className="w-[300px] bg-[#f3f3f3]"
              />
              <TextField
                label="Surname"
                type="text"
                id="surname"
                value={(values as any).surname}
                onChange={(e) => handleChange(e)}
                onBlur={handleBlur}
                error={touched.surname && Boolean(errors.surname)}
                helperText={touched.surname && errors.surname}
                className="w-[300px] bg-[#f3f3f3]"
              />
            </>
          )}
          <Button
            variant="contained"
            type="submit"
            className="bg-white w-[150px] self-center h-10"
            sx={{ color: "#fff", borderRadius: "20px" }}
            disabled={isSubmitting || !isValid}
          >
            {PAGE_CONTENT[authType].buttonText}
          </Button>
        </form>
      </div>
      <div className="flex flex-col bg-[#00d264] w-1/2 h-full items-center justify-center gap-10">
        <h1 className="text-5xl self-center text-white font-black">
          Welcome Back!
        </h1>
        <div className="flex flex-col">
          <span className="text-white text-3xl self-center">
            To keep connected with us please login
          </span>
          <span className="text-white text-3xl self-center">
            with your personal info
          </span>
        </div>
        <Button
          variant="contained"
          className="bg-transparent w-[150px] self-center h-10 border-white shadow-none"
          sx={{ borderRadius: "20px", border: "1px solid white" }}
        >
          <Link href={PAGE_CONTENT[authType].link} className="text-white">
            {PAGE_CONTENT[authType].altButtonText}
          </Link>
        </Button>
      </div>
    </div>
  );
};
