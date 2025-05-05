import { useEffect, useState } from 'react';
import './App.css'
import Input from './components/Input/Input';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal'
import axios from "axios"
import toast from 'react-hot-toast';

function App() {
  const [origins,setorigins] = useState([]);
  const [cruxData, setCruxData] = useState([]);
  const [showSleepModal, setShowSleepModal] = useState();

  useEffect(() => {
    // if(!origins.length) return;
    fetchCruxData(origins);
  }, [origins])

  const fetchCruxData = async (origins) => {
    let payload = {
      "origin": "https://example.com",
      "formFactor": "PHONE",
      "metrics": [
        "largest_contentful_paint",
        "experimental_time_to_first_byte"
      ]
    }

    try {
      const timoutId = setTimeout(() => {
        setShowSleepModal(true)
      }, 3000)
      const response = await axios.post(`https://googlecrux-be.onrender.com/getRecords`, payload)
      console.log("response->", response.data)
      clearTimeout(timoutId);
      setShowSleepModal(false);
    } catch (err) {
      if(err.response.data.details.error.message){
        toast.error(err.response.data.details.error.message)
      }else{
        toast.error("Error in fetching data from google")
      }
      clearTimeout(timoutId);
      setShowSleepModal(false);
    }

  }

  const generateDummyData = () => {
    const data = [];
    for (let i = 1; i <= 5; i++) {
      data.push({
        name: `Name ${i}`,
        age: 20 + i,
        email: `email${i}@example.com`,
        city: `City ${i}`,
      });
    }
    return data;
  };

  const handleClose = () => {
    setShowSleepModal(false)
  }

  const headers = [
    { key: 'name', label: 'Name', minWidth: '150px' },
    { key: 'age', label: 'Age', minWidth: '80px' },
    { key: 'email', label: 'Email', minWidth: '200px' },
    { key: 'city', label: 'City', minWidth: '120px' },
  ];

  const dummyData = generateDummyData();
  return (
    <div className="app-container">
      <div className='header'>
        <img
          src="/chrome.png"
          style={{
            width: '33px',
            marginRight: '10px',
            height: '33px'
          }}
        />
        <h1>Google CrUX</h1>
      </div>
      <Input />
      <Table headers={headers} data={dummyData} />
      <Modal open={showSleepModal}>
          <div className='sleeping-modal'>
          <img
          src="/sleeping.png"
          style={{
            width: '33px',
            marginRight: '10px',
            height: '33px'
          }}
        />
        <p>We are waking up the server. Please wait...</p>
            </div>
      </Modal>
    </div>
  );
}

export default App;

