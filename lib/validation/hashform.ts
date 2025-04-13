import { SerializableFile } from '@/types/serializable-file';

import * as yup from 'yup';

export const RequestFormSchema = yup.object().shape({
  content: yup
  .mixed<string | SerializableFile>()
  .required("Content is required")
  .test({
    name: 'content-type',
    message: 'Content must be string or SerializableForm',
    test: (value) => 
      typeof value === 'string' || 
      (typeof value === 'object' && value !== null)
  })
  .test({
    name: 'string-length',
    message: 'Limit of 3000 characters when content is a string',
    test: (value) => 
      typeof value !== 'string' || value.length <= 3000
  }),
  author: yup.string()
    .required("Autor is required")
    .max(100, "Limit of 100 characters")
});