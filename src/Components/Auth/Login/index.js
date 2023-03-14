import React from "react";
import { Formik } from "formik";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const Login = () => {
  // const { user } = useSelector((state) => state.user);
  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(async () => {
            const { user } = signInWithEmailAndPassword(
              auth,
              values.email,
              values.password
            ).then(res=>console.log(res)).catch(err=>console.log(err));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Username"
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Password"
            />
            {errors.password && touched.password && errors.password}
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              login
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
