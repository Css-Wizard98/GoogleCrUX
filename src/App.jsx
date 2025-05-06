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
import {filterOptionValueToLabel} from "./components/Filter/filterOptions"

function App() {
  const [origins, setorigins] = useState([]);
  const [cruxData, setCruxData] = useState([]);
  const [filterData, setfilterData] = useState([])
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showFilterModal, setshowFilterModal] = useState(false);

  const fetchCruxData = async (origins, filterData) => {
    let promiseArr = origins.map(origin => {
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
      let count = response.length;
      let tempData = {};
      response.forEach(item => {
        Object.keys(item?.data?.record?.metrics).forEach(data => {
          if (tempData[data]) {
            let obj1 = tempData[data];
            let obj2 = item.data.record.metrics[data].percentiles || item.data.record.metrics[data].fractions;
            tempData[data] = Object.keys(obj1).reduce((acc, key) => {
              acc[key] = Number(obj1[key]) + Number(obj2[key]);
              return acc;
            }, {});
          } else {
            if (item.data.record.metrics[data].percentiles) {
              tempData[data] = item.data.record.metrics[data].percentiles
            } else tempData[data] = item.data.record.metrics[data].fractions
          }
        })
      })
      //calculate average
      Object.keys(tempData).forEach(data => {
        Object.keys(tempData[data]).forEach(key => {
          tempData[data][key] = tempData[data][key] / count
        })
      })
      console.log(tempData)
      setCruxData(tempData);
      clearTimeout(timoutId);
      setShowSleepModal(false);
    } catch (err) {
      if (err?.response?.data?.details?.error?.message) {
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
    if (!origins.length) {
      toast.error("Please Select at least one origin");
      return;
    }handleSearch
    fetchCruxData(origins, filterData);
  }

  const headers = Object.keys(cruxData).map(el => {
    return {
      key: el,
      label: filterOptionValueToLabel[el],
      tooltip: el,
      minWidth: '150px'
    }
  })
  console.log("cruxData",cruxData)
  console.log("headers",headers)

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
        <div className='seach-box-btn'>
          <Button variant="contained" size="large" onClick={handleSearch}>Search</Button>
          <IconButton onClick={() => { setshowFilterModal(true) }} aria-label="filter">
            <Badge color="error" variant={filterData.length ? "dot" : "standard"} invisible={filterData.length == 0}>
              <FilterAlt />
            </Badge>
          </IconButton>
        </div>
      </div>
      <Table headers={headers} data={[cruxData]} />
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

