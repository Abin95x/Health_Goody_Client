import React from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import { loginSchema } from '../../../validations/user/loginValidation';
import { userLogin } from '../../../Api/userApi';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../Redux/UserSlice/UserSlice.js';
import backgroundImage from '../../../Assets/image/loginImg.jpg';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    try {
      const response = await userLogin(values);
      if (response?.status === 200) {
        localStorage.setItem('usertoken', response?.data?.usertoken);
        const userData = response?.data?.userData;
        dispatch(
          setUser({
            user: userData,
          })
        );

        const Toast = Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
        });

        Toast.fire({
          icon: 'success',
          title: 'Logged in successfully',
        });

        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit
  });



  return (
    <>

      <Header />

      <div className='hero min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white h-screen' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <div className='card flex-shrink-0 w-full max-w-md shadow-2xl bg-transparent'>
          <div className='card-body'>
            <div className='text-center lg:text-left'>
              <h1 className='text-2xl text-black font-bold'>Login now!</h1>
            </div>
            <br />
            <form onSubmit={handleSubmit} >
              <div>
                <input
                  name='email'
                  type='email'
                  placeholder='Type email'
                  className='w-full text-black rounded-xl'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div>
                  {errors.email && touched.email && (
                    <p className='text-red-600'>{errors.email}</p>
                  )}
                </div>
                <br />

                <input
                  name='password'
                  type='password'
                  placeholder='Type password'
                  className='w-full  text-black rounded-xl '
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <div>
                  {errors.password && touched.password && (
                    <p className='text-red-600'>{errors.password}</p>
                  )}

                </div>
                <br />
                <Link to={'/forgotpassword'} className='font-medium text-orange-900 ' >Forgot Password</Link>


              </div>

              <div className='form-control mt-6'>
                <button className='btn btn-primary' type='submit'>
                  Login
                </button>
              </div>
              <br />

              Not a user?{' '}
              <Link to={'/signup'} className='font-medium text-orange-900'>Sign Up</Link>

            </form>

            <div>
                <h3 className="text-center text-black">Demo user</h3>
                <h2 className="text-center text-black">Email : user@gmail.com</h2>
                <h2 className="text-center text-black">Password : User123</h2>
              </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LoginPage;