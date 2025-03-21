import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import '../styles/styles.module.css';// or import './styles.scss';

const Process = ({ data }) => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    console.log(data); // Log the data to see its structure

    const parseIcon = (iconData) => {
        // Parse the icon data to extract the icon name
        const match = iconData.match(/class="([^"]+)"/);
        if (match && match[1]) {
            const classNames = match[1].split(" ");
            const iconClassName = classNames.find(name => name.startsWith("fa-"));
            if (iconClassName) {
                return iconClassName.replace("fa-", "");
            }
        }
        return null;
    };

    return (
        <div style={{ width: isMobile ? '91%' : '55%', marginLeft: isMobile ? '5px' : '30px', marginTop: '20px' }}>
            <div style={{ marginTop: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: '-24px', border: '1px solid #ccc', padding: '18px', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px', fontWeight: 'bold' }}>Documents for {data.countryName} visa</span>
                </div>

                <div style={{ width: '100%', border: '1px solid #ccc', padding: '11px', display: 'flex' }}>
                    <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '19px', fontWeight: '600', marginLeft: '6px' }}>Mandatory Docs</span>
                </div>
            </div>

            {Object.entries(data).map(([country, touristDocuments], index) => (
                <div key={index}>
                    {touristDocuments && touristDocuments.map((item, itemIndex) => (
                        <div key={itemIndex} style={{ width: '100%', border: '1px solid #ccc', padding: '11px', display: 'flex', alignItems: 'center', background: 'white' }}>
                            {item.icon && (
                                <FontAwesomeIcon icon={parseIcon(item.icon)} style={{ marginRight: '20px', marginLeft: '20px', width: '20px', height: '20px', color: 'black' }} />
                            )}
                            <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '17px', margin: 0 }}>{item.document}</p>
                        </div>

                    ))}
                </div>
            ))}
        </div>
    );
};

export default Process;
