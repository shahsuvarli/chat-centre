import React from "react";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/material";
import { register, setLoading } from "../../../store/user";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { AiFillExclamationCircle } from "react-icons/ai";

const Register = () => {
  const [image, setImage] = React.useState();
  const inputs = [
    {
      id: 0,
      placeholder: "Email *",
      name: "email",
      type: "email",
      value: "email",
    },
    {
      id: 1,
      placeholder: "Password *",
      name: "password",
      type: "password",
      value: "password",
    },
    {
      id: 2,
      placeholder: "Username *",
      name: "username",
      type: "text",
      value: "username",
    },
    {
      id: 3,
      placeholder: "Fullname",
      name: "fullName",
      type: "text",
      value: "fullName",
    },
    {
      id: 4,
      placeholder: "Phone *",
      name: "phone",
      type: "number",
      value: "phone",
    },
    {
      id: 5,
      placeholder: "About",
      name: "about",
      type: "textarea",
      values: "about",
    },
  ];
  const dispatch = useDispatch();
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    switch (error.message) {
      case "Firebase: Error (auth/email-already-in-use).":
        toast.error("Sorry, this email is already in us!", {
          position: toast.POSITION.TOP_LEFT,
        });
        break;
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        toast.warning("Sorry, your password is weak!", {
          position: toast.POSITION.TOP_LEFT,
        });
        break;

      default:
        break;
    }
  }, [error]);
  return (
    <div className="register-container">
      <h2>Register</h2>
      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          fullName: "",
          phone: "",
          about: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Email required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Password required";
          }
          if (!values.username) {
            errors.username = "Username required";
          }
          if (!values.phone) {
            errors.phone = "Phone number required";
          }
          if (!values.image) {
            values.image = {
              url: "https://linkpicture.com/Images/nlogo.png",
              name: "no-image",
            };
          }
          return errors;
        }}
        onSubmit={(values) => {
          setTimeout(async () => {
            await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            )
              .then(async (res) => {
                dispatch(setLoading(true));
                const userRef = doc(db, "users", res.user.uid);
                const storageRef = ref(storage, `images/${values.image.name}`);
                await uploadBytesResumable(storageRef, values.image).then(
                  () => {
                    getDownloadURL(storageRef)
                      .then(async (downloadURL) => {
                        const userObject = {
                          id: res.user.uid,
                          email: values.email,
                          password: values.password,
                          username: values.username,
                          fullName: values.fullName || String(values.phone),
                          phone: values.phone,
                          about:
                            values.about || "Hey! I am using WhatsApp-clone!",
                          image: downloadURL,
                          chats: [],
                        };
                        await setDoc(userRef, userObject);
                        dispatch(setLoading(false));
                        return userObject;
                      })
                      .then((userObject) => {
                        dispatch(register(userObject));
                        setError("");
                      });
                  }
                );
              })
              .then((res) => setError("no error"))
              .catch((err) => setError(err));
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="login-form">
            {inputs.map((input) => {
              return (
                <React.Fragment key={input.id}>
                  <input
                    key={input.id}
                    type={input.type}
                    name={input.name}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[input.value]}
                  />
                  <span
                    className={
                      errors[input.value] &&
                      touched[input.value] &&
                      errors[input.value]
                        ? "error-show"
                        : "error-hide"
                    }
                  >
                    <AiFillExclamationCircle />
                    {errors[input.value] &&
                      touched[input.value] &&
                      errors[input.value]}
                  </span>
                </React.Fragment>
              );
            })}
            <input
              type="file"
              name="image"
              value={image}
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
              Submit
            </Button>
            <ToastContainer />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
