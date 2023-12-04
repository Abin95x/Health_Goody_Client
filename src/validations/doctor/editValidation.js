import * as yup from 'yup';

export const drEditSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    mobile: yup
        .string()
        .matches(/^\d{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
    experience: yup
        .string()
        .matches(/^\d+$/, 'Experience must be a number')
        .required('Experience is required'),
    // Add validation for other fields as needed
    speciality: yup.string().required('Speciality is required'),
    bio: yup.string(),
    // Add validation for the 'photo' field if needed
});

