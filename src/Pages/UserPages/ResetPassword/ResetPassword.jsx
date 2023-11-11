import React from 'react';
import Header from '../../../Components/UserComponents/Header/Header';
import Footer from '../../../Components/UserComponents/Footer/Footer';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  console.log("reset password log");
  return (
    <>
      <Header />
      <div>
        <div className="hero min-h-screen bg-teal-700">
          <div className="hero-content flex-col lg:flex-col">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Reset Password</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-5xl shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">New Password</span>
                  </label>
                  <input type="password" placeholder="new password" className="input input-bordered w-96" required />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input type="password" placeholder="confirm password" className="input input-bordered w-96" required />
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Reset Password</button>
                </div>
                <div>
                  <br />
                  Remember your password?{" "}
                  <Link to={"/login"} className="font-medium text-orange-900">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
