import './styles.css'; // or import './styles.scss';

const CountryTabs = ({ activeTab, setActiveTab }) => (
    <div
        style={{
            marginTop: '30px',
            width: '60%',
            display: 'flex',
            justifyContent: 'space-between',
            position: 'relative',
            marginBottom: '10px'
        }}>
        <button
            style={{
                marginLeft: '90px',
                border: 'none', fontSize: '18px',
                color: activeTab === 'About' ? 'blue' : 'grey',
                background: 'transparent'
            }}
            onClick={() => setActiveTab('About')}>
            <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20, fontWeight: 'bold'}}>About</span>
        </button>
        <button style={{ border: 'none', fontSize: '18px', color: activeTab === 'Process' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Process')}>
            <span style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: 20 , fontWeight: 'bold'}}>Process</span>
        </button>
        <button style={{ marginRight: '80px', border: 'none', fontSize: '18px', color: activeTab === 'Documents' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Documents')}>
            <span style={{ fontFamily: 'Nunito Sans, sans-serif' , fontSize: 20, fontWeight: 'bold'}}>Documents</span>
        </button>
        <div
            style={{
                position: 'absolute',
                top: 'calc(100% + 15px)', // position below buttons with some space
                left: '30px', // margin from left
                right: '15px', // margin from right
                height: '1.5px',
                background: 'black',
            }}
        ></div>
    </div>
);

export default CountryTabs;
