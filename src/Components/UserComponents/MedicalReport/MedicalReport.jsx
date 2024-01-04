import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStethoscope, } from '@fortawesome/free-solid-svg-icons';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { reportDetails } from '../../../Api/userApi';

const MedicalReport = () => {
    const location = useLocation();
    // const { _id, name, age, email, mobile } = useSelector((state) => state.reducer.userReducer.user);
    const [report, setReport] = useState()
    const { data } = location.state || {}
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
                pdf.save('MedicalReport.pdf');
            });
        } catch (error) {
            console.log(error);
        }
    };



    console.log(report);

    useEffect(() => {
        reportDetails(data._id).then((res) => {
            console.log(res.data, "ghjghhgghgjhg");
            setReport(res.data.result)
        }).catch((error) => {
            console.log(error);
        })
    }, [])




    return (
        <>
            {report ? (
                <div className='bg-blue-50 min-h-screen p-5'>
                    <div className='flex justify-center'>
                        <div className='bg-white min-h-screen mt-10 w-[900px] shadow-lg rounded-lg overflow-hidden'>
                            <div className='bg-emerald-500 h-32 w-full'>
                                <h1 className='text-3xl text-white font-bold text-center p-10'>
                                    HEALTH GOODY ONLINE <FontAwesomeIcon icon={faStethoscope} />
                                </h1>
                            </div>
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Bio Data</h1>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div>
                                        <p className='text-lg'>
                                            Name: {report.patientName}
                                        </p>
                                        <p className='text-lg'>
                                            Age: {report.age}
                                        </p>
                                    </div>
                                    <div>
                                        <p className='text-lg'>
                                            Sex: {report.gender}
                                        </p>
                                        <p className='text-lg'>
                                            Weight: {report.weight}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className='m-5' />
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Presenting Complaint</h1>
                                <p className='text-lg'>
                                    {report.complaint}
                                </p>
                            </div>
                            <hr className='m-5' />
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Past Medical and Surgical History</h1>
                                <p className='text-lg'>
                                    {report.medicalHistory}
                                </p>
                            </div>
                            <hr className='m-5' />
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Investigation</h1>
                                <p className='text-lg'>
                                    {report.investigation}
                                </p>
                            </div>
                            <hr className='m-5' />
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Diagnosis</h1>
                                <p className='text-lg'>
                                    {report.diagnosis}
                                </p>
                            </div>
                            <hr className='m-5' />
                            <div className='p-8'>
                                <h1 className='text-2xl font-bold mb-4'>Doctor</h1>
                                <p className='text-lg'>
                                    Doctor: {report.doctorName}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center p-10'>
                        {report && (
                            <button className='btn btn-success' onClick={downloadPdf}>
                                DOWNLOAD PDF
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className='text-center text-gray-500'>
                    Medical report not added
                </div>
            )}



        </ >
    )
}



export default MedicalReport

