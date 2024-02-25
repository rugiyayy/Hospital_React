import * as Yup from "yup";

const sendEmailSchema = Yup.object().shape({
  to: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

    from: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

    subject: Yup.string().required("Subject field is required"),
    body: Yup.string().required("Message field is required"),

});
export default sendEmailSchema;
