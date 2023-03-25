import React from "react";
import { Formik } from "formik";
import { Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { batch, useDispatch } from "react-redux";
import { login, setLoading } from "../../../store/user";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillExclamationCircle } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).":
        toast.error("Sorry, user not found!", {
          position: toast.POSITION.TOP_LEFT,
        });
        break;
      case "Firebase: Error (auth/wrong-password).":
        toast.warning("Sorry, wrong password!", {
          position: toast.POSITION.TOP_LEFT,
        });
        break;

      default:
        break;
    }
  }, [error]);

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
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then(async (res) => {
              const user = (
                await getDoc(doc(db, "users", res.user.uid))
              ).data();
              batch(() => {
                dispatch(login(user));
              });
            })
            .catch((err) => {
              setError(err);
            });
          setSubmitting(false);
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
          setSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="login-form">
            <React.Fragment>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Username"
              />
              <span
                className={
                  errors.email && touched.email && errors.email
                    ? "error-show"
                    : "error-hide"
                }
              >
                <AiFillExclamationCircle />
                {errors.email && touched.email && errors.email}
              </span>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Password"
              />
              {errors.password && touched.password && errors.password}
            </React.Fragment>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              login
            </Button>
            <ToastContainer />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
