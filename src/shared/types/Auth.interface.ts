export type AuthData = {
  email: string;
  password: string;
};

export type AuthPageProps = {
  authType: "signup" | "login";
};

export type PageContent = {
  [key in AuthPageProps["authType"]]: {
    title: string;
    buttonText: string;
    link: string;
    altButtonText: string;
  };
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = LoginFormData & {
  name: string;
  surname: string;
};