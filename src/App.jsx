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
import {  filterOptions } from "./components/Filter/filterOptions"
import Instruction from './components/Instruction/Instruction';

function App() {
  const [origins, setorigins] = useState([]);
  const [cruxData, setCruxData] = useState({});
  const [filterData, setfilterData] = useState({ metrics: [], threshold: {}, thresholdFilterOn: false })
  const [showSleepModal, setShowSleepModal] = useState(false);
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [loading, setloading] = useState(false);
  // const [showTable, setshowTable] = useState(true);

  useEffect(() => {
    let obj = {};
    filterOptions.forEach(el => obj[el.value] = 0);
    setfilterData((prev) => ({ ...prev, threshold: obj }))
  }, [])

  useEffect(() => {
    if (!origins.length) setCruxData({});
  }, [origins])

  const fetchCruxData = async (origins, filterData) => {
    if (!origins.length) return;

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
        if (!tempData[item?.data?.record?.key?.origin]) tempData[item?.data?.record?.key?.origin] = {};
        let key = item?.data?.record?.key?.origin;
        Object.keys(item?.data?.record?.metrics).forEach(metricKey => {
          tempData[key][metricKey] = item.data.record.metrics[metricKey].percentiles || item.data.record.metrics[metricKey].fractions
        });
      })
      // filter response
      if (filterData.thresholdFilterOn) {
        Object.keys(tempData).forEach(originKey => {
          Object.keys(tempData[originKey]).forEach(metricKey => {
            const metricData = tempData[originKey][metricKey];
            const threshold = filterData.threshold[metricKey];

            if (threshold > 0) {
              Object.keys(metricData).forEach(data => {
                if (metricData[data] < threshold) {
                  delete metricData[data];
                }
              })
              if (!Object.keys(metricData).length) delete tempData[originKey][metricKey];
            }
          });
        });
      }
      setCruxData(tempData)
      clearTimeout(timoutId);
      setShowSleepModal(false);
      setloading(false)
    } catch (err) {
      if (err?.response?.data?.details?.error?.message) {
        toast.error(err.response.data.details.error.message)
      } else {
        toast.error("Error in fetching data from google")
      }
      setCruxData({});
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
          {/* {!!Object.keys(cruxData).length && <IconButton onClick={() => { setshowTable(!showTable) }} aria-label="filter">
            <SwapHorizIcon />
          </IconButton>} */}
        </div>
      </div>
      <Table data={Object.keys(cruxData).map(data => {
        return {
          origin: data,
          ...cruxData[data]
        }
      })} />
      {/* {!showTable && <BorderTable headers={headers} data={cruxData} />} */}

      <Modal open={showSleepModal} onClose={() => { }}>
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

      <Instruction />
    </div>

  );
}

export default App;

