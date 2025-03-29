import * as yup from 'yup';

export const hashFormSchema = yup.object().shape({
  content: yup.string().required(),
  author: yup.string()
    .required("Autor is required")
    .max(100, "Limit of 100 characters")
});