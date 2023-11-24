import * as yup from 'yup';
// const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;
const passwordRule = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6}$/;


export const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name must be at least 2 charecters')
    .max(20)
    .matches(/^[a-zA-Z]+$/, 'Only alphabets are allowed')
    .required('Required'),

  email: yup.string()
    .email('Please enter a valid email')
    .required('Required'),

  mobile: yup
    .number('Phone number must be a 10 digit number')
    .positive()
    .integer()
    .test('len', 'Phone number should be a 10 digit number', (val) =>
      /^\d{10}$/.test(val))
    .required('Required'),

  password1: yup
    .string()
    .matches(passwordRule, 'Password must contain at least one digit and be 6 characters long')
    .required('Required'),

  password2: yup
    .string()
    .oneOf([yup.ref('password1'), null], 'Password must match')
    .required('Required'),

});