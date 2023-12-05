import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { appointmentList } from '../../../Api/userApi';

const AppointmentList = () => {
    const [app, setApp] = useState();
    const user = useSelector((state) => state.reducer); 
    const userData = user.userReducer.user;
    const id = userData._id;

    const formatDateTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          timeZoneName: 'short',
        });
      };

    useEffect(() => {
        appointmentList(id).then((res) => {
            setApp(res.data);
            
        }).catch((error) => {
            console.log(error.message);
        });

    }, []);
    console.log(app,'appdatttttttttttttttttt');
    return (
        <div>
           <br />
              <div className='flex justify-center text-4xl'>
              <h1>Your Appointment</h1>
           </div>
          {app && app.length > 0 && (
            <div className="flex flex-col gap-4">
            
              {app.map((item) => {
                return (
                  <div key={item._id} className="bg-white shadow-2xl  w-[700px] h-80 m-10 rounded-xl border">
                    <div className='m-5'>
                    <h1 className="text-blue-500 text-2xl font-bold mb-2">
                      Consultation Date: {formatDateTime(item.consultationDate)}
                    </h1>
                    <br />
                    <p className="text-gray-600">Booked Date: {formatDateTime(item.createdAt)}</p>
                    <br />
                    <p className="text-gray-600">Doctor: {}</p>
                    <br />
                    <p className="text-gray-600">Start Time: {item.start}</p>
                    <br />
                    <p className="text-gray-600">End Time: {item.end}</p>
                    <button className="btn btn-active mx-[570px]">More</button>
                    </div>
                    <br />
                   

                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
      
      
};

export default AppointmentList;