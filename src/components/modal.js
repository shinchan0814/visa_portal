import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProgressIndicator from '../components/progressIndicator';

function useWindowWidth() {
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    return windowWidth;
}

const Modal = ({ showModal, closeModal, countryName, currentStep = 1 }) => {
    const { slug } = useParams();
    const [step, setStep] = useState(currentStep);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [travellers, setTravellers] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [employee, setEmployee] = useState('');
    const [sponser, setSponser] = useState('');
    const [reason, setReason] = useState('');
    const [passport, setPassport] = useState('');
    const [personalizedTravelHelp, setPersonalizedTravelHelp] = useState('');
    const [flightTicketHelp, setFlightTicketHelp] = useState('');
    const [accommodationHelp, setAccommodationHelp] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 768;

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (!showModal) {
        return null;
    }

    const validateStep1 = () => {
        return name && email && phone && travellers; // Check if all fields are filled
    };

    const validateStep2 = () => {
        return departure && arrival && employee && sponser && reason && passport; // Check if all fields are filled
    };

    const validateStep3 = () => {
        return personalizedTravelHelp && flightTicketHelp && accommodationHelp; // Check if all radio options are selected
    };
    

    const handlePrevious = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleNext = () => {
        let isValid = true;
    
        switch (step) {
            case 1:
                isValid = validateStep1();
                break;
            case 2:
                isValid = validateStep2();
                break;
            case 3:
                isValid = validateStep3();
                break;
            default:
                isValid = true;
        }
    
        if (isValid) {
            if (step < 4) {
                setStep(prevStep => prevStep + 1); // Increment step only if validation is successful
            }
        } else {
            alert("Please fill all the required fields before proceeding.");
        }
    };
    

    const handleSubmit = async () => {
        setIsSubmitting(true);
        const formData = {
            country: countryName,
            name,
            email,
            phone,
            number_travellers: parseInt(travellers),
            departure_date: departure,
            arrival_date: arrival,
            employment_status: employee,
            travel_reason: reason,
            sponsorship: sponser,
            passport_issued_at: passport,
            Travel_itinerary_needed: personalizedTravelHelp === 'yes',
            Flight_Tickets_Needed: flightTicketHelp === 'yes',
            Hotel_Booking_Needed: accommodationHelp === 'yes',
        };
        const body = JSON.stringify(formData);
        console.log(body);

        try {
            const response = await fetch('https://saathi-visa-backend.vercel.app/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body,
            });

            const responseText = await response.text(); // Get the raw text response
            console.log('Response:', responseText);

            // You can check the response text and show a success message if needed
            if (response.ok) {
                console.log('Form submitted successfully:', responseText);
                setShowSuccessPopup(true);
            } else {
                throw new Error('Failed to submit form');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            setShowErrorPopup(true); // Show error popup on failure
        } finally {
            setIsSubmitting(false);
        }
    };


    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };

    const renderFormStep = () => {
        switch (step) {
            case 1:
                return (
                    <FormStep1
                        name={name}
                        setName={setName}
                        email={email}
                        setEmail={setEmail}
                        phone={phone}
                        setPhone={setPhone}
                        travellers={travellers}
                        setTravellers={setTravellers}
                        isMobile={isMobile}
                    />
                );
            case 2:
                return (
                    <FormStep2
                        departure={departure}
                        setDeparture={setDeparture}
                        arrival={arrival}
                        setArrival={setArrival}
                        employee={employee}
                        setEmployee={setEmployee}
                        sponser={sponser}
                        setSponser={setSponser}
                        reason={reason}
                        setReason={setReason}
                        passport={passport}
                        setPassport={setPassport}
                        isMobile={isMobile}
                    />
                );
            case 3:
                return (

                    <FormStep3
                        personalizedTravelHelp={personalizedTravelHelp}
                        setPersonalizedTravelHelp={setPersonalizedTravelHelp}
                        flightTicketHelp={flightTicketHelp}
                        setFlightTicketHelp={setFlightTicketHelp}
                        accommodationHelp={accommodationHelp}
                        setAccommodationHelp={setAccommodationHelp}
                        isMobile={isMobile}
                    />

                );
            case 4:
                return <FormStep4 onSubmit={handleSubmit} isSubmitting={isSubmitting} />;
            default:
                return null;
        }
    };

    const closeSuccessPopup = () => {
        setShowSuccessPopup(false);
        closeModal();
    };

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modalContent}>
                <span style={styles.closeButton} onClick={closeModal}>&times;</span>
                <h2 style={styles.heading}>
                    Get your {countryName} visa
                </h2>
                <div style={styles.subText}>
                    Please fill the form below to get expert assistance on {countryName} visa. We <br />
                    will get back to you in a few hours with next steps
                </div>
                <div style={styles.progressContainer}>
                    <ProgressIndicator currentStep={step} totalSteps={4} />
                </div>
                <div style={styles.divider}></div>
                <div style={styles.formContainer}>
                    {renderFormStep()}
                </div>
                <div style={styles.buttonContainer}>
                    {step > 1 && (
                        <button style={styles.navPrevious} onClick={handlePrevious}>Previous step</button>
                    )}
                    {step < 4 && (
                        <button style={{ ...styles.navButton, marginLeft: step === 1 ? 'auto' : '0' }} onClick={handleNext}>
                            Next step
                        </button>
                    )}
                </div>
                {showErrorPopup && (
                    <div style={styles.popupOverlay}>
                        <div style={styles.popup}>
                            <h2>Error</h2>
                            <p>The POST request failed. Please try again later.</p>
                            <button onClick={closeErrorPopup} style={styles.popupButton}>Close</button>
                        </div>
                    </div>
                )}
                {showSuccessPopup && (
                <div style={styles.popupOverlay}>
                    <div style={styles.popup}>
                        <h2>Success</h2>
                        <p>Your application has been received. We will shortly get in touch with you.</p>
                        <button onClick={closeSuccessPopup} style={styles.popupButton}>Close</button>
                    </div>
                </div>
            )}
            </div>
        </div>
    );
};

const FormStep1 = ({ name, setName, email, setEmail, phone, setPhone, travellers, setTravellers, isMobile }) => (
    <div style={styles.frame1}>
        <h3 style={styles.title1}>Contact details</h3>
        <div style={styles.subTitle1}>Please let us know about yourself</div>
        <form style={styles.form1}>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.column1}>
                    <label htmlFor="name" style={styles.label1}>Name</label>
                    <div style={styles.inputWrapper}>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Carter" // Hint text
                            style={styles.input1}
                        />
                        <span style={styles.icon}>
                            {/* Replace with your icon component or SVG */}
                            <i className="fa fa-user"></i> {/* Example icon */}
                        </span>
                    </div>
                </div>
                <div style={styles.column1}>
                    <label htmlFor="email" style={styles.label1}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="John@gmail.com" // Hint text
                        style={styles.input1}
                    />
                </div>
            </div>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.column1}>
                    <label htmlFor="phone" style={styles.label1}>Phone Number</label>
                    <div style={styles.inputWrapper}>
                        <input
                            type="phone"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+91 98XX XXX XXX" // Hint text
                            style={styles.input1}
                        />
                        <span style={styles.icon}>
                            {/* Replace with your icon component or SVG */}
                            <i className="fa fa-phone"></i> {/* Example icon */}
                        </span>
                    </div>
                </div>
                <div style={styles.column1}>
                    <label htmlFor="travellers" style={styles.label1}>Number of travellers</label>
                    <input
                        type="number"
                        id="travellers"
                        value={travellers}
                        onChange={(e) => setTravellers(e.target.value)}
                        placeholder="2" // Hint text
                        style={styles.input1}
                    />
                </div>
            </div>
        </form>
    </div>
);


const FormStep2 = ({ departure, setDeparture, arrival, setArrival, employee, setEmployee, sponser, setSponser, reason, setReason, passport, setPassport, isMobile }) => (
    <div style={styles.frame1}>
        <h3 style={styles.title2}>Travelling information</h3>
        <div style={styles.subTitle2}>Please tell us something about your upcoming travel plans</div>
        <form style={styles.form1}>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.column1}>
                    <label htmlFor="departure" style={styles.label1}>Departure Date</label>
                    <div style={styles.inputWrapper}>
                        <input
                            type="date"
                            id="departure"
                            value={departure}
                            onChange={(e) => setDeparture(e.target.value)}
                            placeholder="DD/MM/YY" // Hint text
                            style={styles.input2}
                            min={(() => {
                                const today = new Date();
                                today.setDate(today.getDate() + 1);
                                const minDate = today.toISOString().split('T')[0];
                                console.log("Calculated min date:", minDate); // Debugging line
                                return minDate;
                            })()} // Disable today and future dates
                        />
                    </div>
                </div>
                <div style={styles.column1}>
                    <label htmlFor="arrival" style={styles.label1}>Tentative Arrival Date</label>
                    <input
                        type="date"
                        id="arrival"
                        value={arrival}
                        onChange={(e) => setArrival(e.target.value)}
                        placeholder="DD/MM/YY" // Hint text
                        style={styles.input2}
                        min={(() => {
                            const today = new Date();
                            today.setDate(today.getDate() + 1);
                            const minDate = today.toISOString().split('T')[0];
                            console.log("Calculated min date:", minDate); // Debugging line
                            return minDate;
                        })()} // Disable today and past dates
                    />
                </div>
            </div>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.column1}>
                    <label htmlFor="employee" style={styles.label1}>Employment status</label>
                    <div style={styles.inputWrapper}>
                        <select
                            id="employee"
                            value={employee}
                            onChange={(e) => setEmployee(e.target.value)}
                            style={{
                                ...styles.input3,
                            }}
                        >
                            <option value="" disabled>Select Employment</option>
                            <option value="Salaried">Salaried</option>
                            <option value="Self Employed">Self Employed</option>
                            <option value="Student">Student</option>
                            <option value="Other">Other</option>
                        </select>


                    </div>
                </div>
                <div style={styles.column1}>
                    <label htmlFor="sponser" style={styles.label1}>Who is sponsoring your trip?</label>
                    <select
                        id="sponser"
                        value={sponser}
                        onChange={(e) => setSponser(e.target.value)}
                        style={{
                            ...styles.input3,
                        }}
                    >
                        <option value="" disabled>Select Sponsorship</option>
                        <option value="Self">Self</option>
                        <option value="Employer">Employer</option>
                        <option value="Inviter">Inviter</option>
                        <option value="Family">Family</option>
                    </select>

                </div>
            </div>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.column1}>
                    <label htmlFor="reason" style={styles.label1}>Reason of travel</label>
                    <div style={styles.inputWrapper}>
                        <select
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            style={{
                                ...styles.input3,
                            }}
                        >
                            <option value="" disabled>Select reason</option>
                            <option value="Tourism">Tourism</option>
                            <option value="Business">Business</option>
                            <option value="Study/Internship">Study/Internship</option>
                            <option value="Meeting friends and Family">Meeting friends and Family</option>
                        </select>

                    </div>
                </div>
                <div style={styles.column1}>
                    <label htmlFor="passport" style={styles.label1}>Passport issued at </label>
                    <select
                        id="passport"
                        value={passport}
                        onChange={(e) => setPassport(e.target.value)}
                        style={{
                            ...styles.input3,
                        }}
                    >
                        <option value="" disabled>Select location</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Andaman and Nicobar">Andaman and Nicobar</option>
                        <option value="Bareilly">Bareilly</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Cochin">Cochin</option>
                        <option value="Coimbatore">Coimbatore</option>
                        <option value="Dehradun">Dehradun</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Ghaziabad">Ghaziabad</option>
                        <option value="Goa">Goa</option>
                        <option value="Guwahati">Guwahati</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Jalandhar">Jalandhar</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Kota">Kota</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Madurai">Madurai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Patna">Patna</option>
                        <option value="Pune">Pune</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Shimla">Shimla</option>
                        <option value="Srinagar">Srinagar</option>
                        <option value="Surat">Surat</option>
                        <option value="Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Trivandrum">Trivandrum</option>
                        <option value="Vijayawada">Vijayawada</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                    </select>

                </div>
            </div>
        </form>
    </div>
);

const FormStep3 = ({ personalizedTravelHelp, setPersonalizedTravelHelp, flightTicketHelp, setFlightTicketHelp, accommodationHelp, setAccommodationHelp, isMobile }) => (
    <div style={styles.frame1}>
        <h3 style={styles.title1}>Additional information</h3>
        <div style={styles.subTitle1}>
            If you don't have everything sorted out, let us know
        </div>
        <form style={styles.form1}>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.questionText}>
                    Do you need any help with personalized travel planning?
                </div>
                <div style={styles.radioContainer}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="personalizedTravelHelp"
                            value="yes"
                            checked={personalizedTravelHelp === 'yes'}
                            onChange={(e) => setPersonalizedTravelHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        Yes
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="personalizedTravelHelp"
                            value="no"
                            checked={personalizedTravelHelp === 'no'}
                            onChange={(e) => setPersonalizedTravelHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        No
                    </label>
                </div>
            </div>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.questionText}>
                    Do you need help with flight tickets for visa?
                </div>
                <div style={styles.radioContainer}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="flightTicketHelp"
                            value="yes"
                            checked={flightTicketHelp === 'yes'}
                            onChange={(e) => setFlightTicketHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        Yes
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="flightTicketHelp"
                            value="no"
                            checked={flightTicketHelp === 'no'}
                            onChange={(e) => setFlightTicketHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        No
                    </label>
                </div>
            </div>
            <div style={isMobile ? styles.columnMobile : styles.row1}>
                <div style={styles.questionText}>
                    Do you need help with accommodation for visa?
                </div>
                <div style={styles.radioContainer}>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="accommodationHelp"
                            value="yes"
                            checked={accommodationHelp === 'yes'}
                            onChange={(e) => setAccommodationHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        Yes
                    </label>
                    <label style={styles.radioLabel}>
                        <input
                            type="radio"
                            name="accommodationHelp"
                            value="no"
                            checked={accommodationHelp === 'no'}
                            onChange={(e) => setAccommodationHelp(e.target.value)}
                            style={styles.radioInput}
                        />
                        No
                    </label>
                </div>
            </div>
        </form>
    </div>
);

const FormStep4 = ({ onSubmit, isSubmitting }) => (
    <div style={styles.frame2}>
        <img src="/images/website/submit.png" alt="Logo" style={{ width: '120.36px', height: '107.41px' }} />
        <h3 style={styles.title1}>Submit your visa request</h3>
        <div style={styles.subTitle3}>
            Please review all the information you previously typed in<br></br>the past steps, and if all is okay, submit your message to<br></br>receive your visa ASAP
        </div>
        <button
            style={{ ...styles.navButton, opacity: isSubmitting ? 0.5 : 1 }}
            onClick={onSubmit}
            disabled={isSubmitting}
        >
         
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
    </div>
);

const styles = {
    columnMobile: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '20px',
    },
    popupOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    popup: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
        fontFamily: "'DM Sans'",
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(23, 15, 73, 1)',
    },
    popupButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    questionText: {
        fontSize: '16px',
        fontWeight: '500',
        marginBottom: '10px',
        color: 'rgba(23, 15, 73, 1)',
        fontFamily: "'DM Sans'",
    },
    radioContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '25px'
    },
    radioLabel: {
        marginRight: '20px',
        display: 'flex',
        alignItems: 'center',
    },
    radioInput: {
        marginRight: '5px',
        fontSize: '16px',
        fontWeight: '500',
        color: 'rgba(0, 0, 0, 1)',
        fontFamily: "'DM Sans'",
    },
    frame1: {
        marginLeft: '20px',
        marginRight: '20px',
    },
    frame2: {
        marginLeft: '20px',
        marginRight: '20px',
        display: 'flex',
        flexDirection: 'column',  // Stack items vertically
        justifyContent: 'flex-start',  // Align items at the top
        alignItems: 'center',  // Center horizontally
        height: '100vh',  // Adjust based on your needs
    },
    heading: {
        fontFamily: "'DM Sans'",
        fontWeight: '750',
        fontSize: '26px',
        color: 'rgba(23, 15, 73, 1)',
        textAlign: 'center',
        marginBottom: '15px',
    },
    title2: {
        fontFamily: "'DM Sans'",
        fontWeight: '700',
        fontSize: '18px',
        color: 'rgba(23, 15, 73, 1)',
        textAlign: 'start',
        marginBottom: '7px',
        marginTop: '0px'
    },
    title1: {
        fontFamily: "'DM Sans'",
        fontWeight: '700',
        fontSize: '18px',
        color: 'rgba(23, 15, 73, 1)',
        textAlign: 'start',
        marginBottom: '7px',
        marginTop: '15px'
    },
    subTitle1: {
        fontFamily: "'DM Sans'",
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(111, 108, 144, 1)',
        textAlign: 'start',
        marginBottom: '25px',
    },
    subTitle2: {
        fontFamily: "'DM Sans'",
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(111, 108, 144, 1)',
        textAlign: 'start',
        marginBottom: '15px',
    },
    subTitle3: {
        fontFamily: "'DM Sans'",
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(111, 108, 144, 1)',
        textAlign: 'start',
        marginBottom: '25px',
        textAlign: 'center'
    },
    subText: {
        fontFamily: "'DM Sans'",
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(111, 108, 144, 1)',
        textAlign: 'center',
        lineHeight: '1.5',
        marginBottom: '20px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: '5px',
        borderRadius: '25px',
        width: '80vw',
        maxWidth: '600px',
        height: '90vh',
        maxHeight: '805px',
        boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.5)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '15px',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1001,
    },
    progressContainer: {
        display: 'flex',
        justifyContent: 'center',
        width: '105%',
        marginTop: '10px',
        marginLeft: '85px'
    },
    formContainer: {
        width: '100%',
        padding: '20px',
        boxSizing: 'border-box',
        flex: 1,
        overflowY: 'auto', // Scroll only if content exceeds
        marginBottom: '20px', // Space for the button container
        paddingRight: '10px',
        maxHeight: 'calc(100vh - 40px)', // Ensure it fits within the viewport
    },    
    buttonContainer: {
        display: 'flex',
        width: '100%',
        padding: '10px',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        borderRadius: '56px',
    },
    navButton: {
        backgroundColor: 'rgba(74, 58, 255, 1)',
        color: 'white',
        border: 'none',
        width: '130px',
        height: '45px',
        borderRadius: '56px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: "'DM Sans'",
        fontWeight: '600',
        fontSize: '14px',
        marginRight: '10px'
    },
    navPrevious: {
        backgroundColor: 'white',
        color: 'rgba(74, 58, 255, 1)',
        border: '1px solid rgba(74, 58, 255, 1)',
        width: '140px',
        height: '45px',
        borderRadius: '56px',
        padding: '10px 20px',
        cursor: 'pointer',
        fontFamily: "'DM Sans'",
        fontWeight: '600',
        fontSize: '14px',
        marginLeft: '10px'
    },
    divider: {
        borderTop: '1px solid rgba(0, 0, 0, 0.2)', // Change the color and style as needed
        width: 'calc(100% - 200px)', // 35px padding on both sides
        margin: '0 auto', // Center the divider
        padding: '0 35px',
    },
    form1: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    row1: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '20px',
    },
    column1: {
        flex: 1,
    },
    label1: {
        display: 'block',
        marginBottom: '15px',
        fontFamily: "'DM Sans'",
        fontWeight: '500',
        fontSize: '14px',
        color: 'rgba(23, 15, 73, 1)',
    },
    input1: {
        width: '85%',
        padding: '10px',
        borderRadius: '46px',
        height: '45px',
        border: 'none', // Removed border
        boxSizing: 'border-box',
        fontFamily: "'DM Sans'",
        fontSize: '14px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.17)' // Added shadow
    },
    input3: {
        width: '85%',
        padding: '10px',
        paddingRight: '30px', // Add extra padding on the right
        borderRadius: '46px',
        height: '45px',
        border: 'none',
        boxSizing: 'border-box',
        fontFamily: "'DM Sans'",
        fontSize: '14px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.17)',
        appearance: 'none', // Remove default appearance
        backgroundImage: 'linear-gradient(45deg, transparent 50%, #333 50%), linear-gradient(135deg, #333 50%, transparent 50%)',
        backgroundPosition: 'calc(100% - 20px) center, calc(100% - 15px) center',
        backgroundSize: '5px 5px, 5px 5px',
        backgroundRepeat: 'no-repeat',
    },
    input2: {
        width: '85%',
        padding: '10px',
        textTransform: 'uppercase',
        borderRadius: '46px',
        height: '45px',
        border: 'none', // Removed border
        boxSizing: 'border-box',
        fontFamily: "'DM Sans'",
        fontSize: '14px',
        boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.17)' // Added shadow
    },
    icon: {
        position: 'absolute',
        right: '10px', // Space from the right
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'black', // Adjust color as needed
    }
};

export default Modal;
