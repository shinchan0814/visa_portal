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
                marginLeft: '100px',
                border: 'none', fontSize: '18px',
                color: activeTab === 'About' ? 'blue' : 'grey',
                background: 'transparent'
            }}
            onClick={() => setActiveTab('About')}>
            About
        </button>
        <button style={{ border: 'none', fontSize: '18px', color: activeTab === 'Process' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Process')}>Process</button>
        <button style={{ marginRight: '80px', border: 'none', fontSize: '18px', color: activeTab === 'Documents' ? 'blue' : 'grey', background: 'transparent' }} onClick={() => setActiveTab('Documents')}>Documents</button>
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
