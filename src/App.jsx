import { useEffect, useState } from 'react';
import './App.css'
import Input from './components/Input/Input';
import Table from './components/Table/Table';
import Modal from './components/Modal/Modal'
import axios from "axios"
import toast from 'react-hot-toast';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import FilterAlt from '@mui/icons-material/FilterAlt';
import Filter from './components/Filter/Filter'

function App() {
  const [origins, setorigins] = useState([]);
  const [cruxData, setCruxData] = useState([]);
  const [filterData, setfilterData] = useState([])
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showFilterModal, setshowFilterModal] = useState(false);

  const fetchCruxData = async (origins,filterData) => {
    let promiseArr = origins.map(origin =>{
      let payload = {
        "origin": origin,
        "metrics": [...filterData]
      }
      return axios.post(`https://googlecrux-be.onrender.com/getRecords`, payload)
    })
    
    const timoutId = setTimeout(() => {
      setShowSleepModal(true)
    }, 3000)
    try {
      const response = await Promise.all(promiseArr);
      clearTimeout(timoutId);
      setShowSleepModal(false);
    } catch (err) {
      if (err.response.data.details.error.message) {
        toast.error(err.response.data.details.error.message)
      } else {
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

  const handleSearch = () => {
    if(!origins.length){
      toast.error("Please Select at least one origin");
      return;
    }
    fetchCruxData(origins,filterData);
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
      <div className='seach-box'>
        <Input onSelect={setorigins} validate={(value) => {
          if (!value.startsWith("https://")) {
            toast.error("Invalid URL")
            return false;
          }
          return true;
        }} />
        <Button variant="contained" size="large" onClick={handleSearch}>Search</Button>
        <IconButton onClick={() => { setshowFilterModal(true) }} aria-label="filter">
          <Badge color="error" variant={filterData.length ? "dot" : "standard"} invisible={filterData.length == 0}>
            <FilterAlt />
          </Badge>
        </IconButton>
      </div>
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
      <Filter
        onClose={setshowFilterModal}
        onSubmit={(e) => { setfilterData(e); setshowFilterModal(false) }}
        open={showFilterModal}
      />
    </div>
  );
}

export default App;

