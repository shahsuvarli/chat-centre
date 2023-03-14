import React from "react";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../store/user";

const Register = () => {
  const [image, setImage] = React.useState();
  const dispatch = useDispatch();
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
            const result = await createUserWithEmailAndPassword(
              auth,
              values.email,
              values.password
            );
            const userRef = doc(db, "users", result.user.uid);
            const storageRef = ref(storage, `images/${values.image.name}`);

            await uploadBytesResumable(storageRef, values.image).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                await setDoc(userRef, {
                  id: result.user.uid,
                  email: values.email,
                  password: values.password,
                  username: values.username,
                  fullName: values.fullName,
                  phone: values.phone,
                  about: values.about,
                  image: downloadURL,
                });
              });
            });
            setSubmitting(false);
            dispatch(register((await getDoc(userRef)).data()));
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
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && errors.fullName}
            <input
              type="number"
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone && errors.phone}
            <input
              type="textarea"
              name="about"
              placeholder="About"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.about}
            />
            {errors.about && touched.about && errors.about}
            <input
              type="file"
              name="image"
              value={image}
              onChange={(event) => {
                setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
