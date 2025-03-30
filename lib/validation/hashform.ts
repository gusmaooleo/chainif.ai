import * as yup from 'yup';

export const hashFormSchema = yup.object().shape({
  content: yup.string().required().max(3000, "Limit of 3000 characters."),
  author: yup.string()
    .required("Autor is required")
    .max(100, "Limit of 100 characters")
});