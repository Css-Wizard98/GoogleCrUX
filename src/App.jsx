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
import { filterOptionValueToLabel, filterOptions } from "./components/Filter/filterOptions"

function App() {
  const [origins, setorigins] = useState([]);
  const [cruxData, setCruxData] = useState([]);
  const [filterData, setfilterData] = useState({ metrics: [], threshold:{} , thresholdFilterOn: false })
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(()=>{
    let obj = {};
    filterOptions.forEach(el => obj[el.value] = 0);
    setfilterData((prev) => ({...prev,threshold:obj}))
  },[])

  const fetchCruxData = async (origins, filterData) => {
    if(!origins.length) return;
    
    setloading(true)
    let promiseArr = origins.map(origin => {
      let payload = {
        "origin": origin,
        "metrics": [...filterData.metrics]
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
      if (filterData.thresholdFilterOn) {
        Object.keys(tempData).forEach(metric => {
          if (filterData.threshold[metric] && filterData.threshold[metric] !== "") {
            Object.keys(tempData[metric]).forEach(key => {
              if(tempData[metric][key] < Number(filterData.threshold[metric])){
                delete tempData[metric][key];
              }
            });
          }
          if(Object.keys(tempData[metric]).length === 0){
            delete tempData[metric];
          }
        });
      }
      console.log(tempData)
      setCruxData(tempData);
      clearTimeout(timoutId);
      setShowSleepModal(false);
      setloading(false)
    } catch (err) {
      if (err?.response?.data?.details?.error?.message) {
        toast.error(err.response.data.details.error.message)
      } else {
        toast.error("Error in fetching data from google")
      }
      clearTimeout(timoutId);
      setShowSleepModal(false);
      setloading(false)
    }

  }

  const handleSearch = () => {
    if (!origins.length) {
      toast.error("Please Select at least one origin");
      return;
    }
    setloading(true);
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
  console.log("cruxData", cruxData)
  console.log("headers", headers)

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
          <Button disabled={loading} variant="contained" size="large" onClick={handleSearch}>{loading ? 'Loading...' : 'Search'}</Button>
          <IconButton onClick={() => { setshowFilterModal(true) }} aria-label="filter">
            <Badge color="error" variant={(filterData.metrics.length || filterData.thresholdFilterOn) ? "dot" : "standard"} invisible={filterData.length == 0}>
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
      {showFilterModal &&
        <Filter
          filterData={filterData}
          onClose={setshowFilterModal}
          onSubmit={(data) => { 
            setfilterData(data); 
            setshowFilterModal(false);
            fetchCruxData(origins, data)
          }}
          open={showFilterModal}
        />}
    </div>
  );
}

export default App;

