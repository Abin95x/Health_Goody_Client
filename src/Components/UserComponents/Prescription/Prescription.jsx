import React, { useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, } from '@fortawesome/free-solid-svg-icons';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Prescription = () => {
    const location = useLocation();
    const { _id, name, } = useSelector((state) => state.reducer.userReducer.user);

    const { data } = location.state || {}
    console.log(data.doctorDetails.name);
    const pdfRef = useRef();

    const downloadPdf = () => {
        try {
            const input = pdfRef.current;
            html2canvas(input).then((canvas) => {
                const imageData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4', true);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const imageWidth = canvas.width;
                const imageHeight = canvas.height;
                const aspectRatio = imageWidth / imageHeight;

                // Calculate the width and height to maintain aspect ratio within the PDF
                let imgWidth = pdfWidth;
                let imgHeight = pdfWidth / aspectRatio;

                // If the calculated height is greater than the PDF height, reset the dimensions
                if (imgHeight > pdfHeight) {
                    imgHeight = pdfHeight;
                    imgWidth = pdfHeight * aspectRatio;
                }

                const imageX = (pdfWidth - imgWidth) / 2;
                const imageY = (pdfHeight - imgHeight) / 2;

                pdf.addImage(imageData, "PNG", imageX, imageY, imgWidth, imgHeight);
                pdf.save('prescription.pdf');
            });
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <>
            <div className='bg-blue-50 min-h-screen p-5 '>
                <div className='flex justify-center' >
                    <div className='bg-white min-h-screen mt-10  w-[900px]' ref={pdfRef} >
                        <div className='bg-emerald-500 h-32 w-full '>
                            <h1 className='text-3xl text-white font-bold text-center p-10'>
                                HEALTH GOODY ONLINE  <FontAwesomeIcon icon={faStethoscope} />
                            </h1>
                        </div>
                        <br />
                        <div className='m-5 border'>
                            <hr />
                        </div>
                        <div className='m-5'>
                            DOCTOR DETAILS
                        </div>
                        <div className=''>

                            <div className='m-5'>
                                <h1>DR : {data.doctorDetails.name}</h1>
                                <h1>speciality : {data.doctorDetails.speciality}</h1>
                                <h1>Mobile : {data.doctorDetails.mobile}</h1>
                            </div>


                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5'>
                            PATIENT DETAILS
                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>

                        <div className='m-5'>
                            <h1>MEDICINE</h1>
                        </div>

                        <div className='m-5 border'>
                            <hr />
                        </div>


                    </div>
                </div>
                <div className='flex justify-center p-10 '>
                    <button className='btn btn-success' onClick={downloadPdf}>DOWNLOAD PDF</button>
                </div>

            </div >
        </ >
    )
}


export default Prescription