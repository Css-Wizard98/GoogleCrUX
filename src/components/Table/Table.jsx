import React, { useEffect, useState } from 'react';
import './Table.css';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { capitalizeFirstLetter } from "../../utils/utils"
import {filterOptionValueToLabel} from "../Filter/filterOptions"

const Table = ({ data }) => {
  const [headers,setHeaders] = useState([]);
  const [tableData,setTableData] = useState([]);

  useEffect(()=>{
    if(data && data.length>1){
      const Total = getTotal(data);
      setTableData([...data,Total]);
      const tempHeader = Object.keys(Total).map(el => {
        return {
          key: el,
          label: filterOptionValueToLabel[el]? filterOptionValueToLabel[el] : el,
          tooltip: el,
          minWidth: '150px'
        }
      })
      setHeaders(tempHeader)
    }else if(data.length){
      const tempHeader = Object.keys(data[0]).map(el => {
        return {
          key: el,
          label: filterOptionValueToLabel[el]? filterOptionValueToLabel[el] : el,
          tooltip: el,
          minWidth: '150px'
        }
      })
      setTableData([...data]);
      setHeaders(tempHeader)
    }
  },[data])

  function getTotal(data) {
    const result = {origin: "Total"};
    for (const entry of data) {
      for (const [metricKey, metricValue] of Object.entries(entry)) {
        if (metricKey === "origin") continue;
  
        // Initialize if not present
        if (!result[metricKey]) result[metricKey] = {};
  
        for (const [innerKey, innerValue] of Object.entries(metricValue)) {
          const numericValue = Number(innerValue) || 0;
          if (!result[metricKey][innerKey]) {
            result[metricKey][innerKey] = numericValue;
          } else {
            result[metricKey][innerKey] += numericValue;
          }
        }
      }
    }
    return result;
  }

  
  // data.push(Total);
  

  if(!headers || headers.length === 0) return<></>
  if (!tableData || tableData.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((column) => (
              <th
                key={column.label}

              >
                <div style={{
                  ...column.minWidth ? { minWidth: column.minWidth } : { minWidth: '100px' },
                  ...column.headerStyle,
                }}>
                  {column.tooltip ?
                    (<Tooltip placement="top" title={
                      <Typography color="inherit">{column.tooltip}</Typography>
                    }>
                      <span>{column.label}</span>
                    </Tooltip>) :
                    column.label
                  }
                </div>

              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  style={{
                    ...column.minWidth ? { minWidth: column.minWidth } : { minWidth: '100px' },
                    ...column.cellStyle,
                  }}
                >
                  {
                    typeof (row[column.key]) === "object" ?
                      <>
                        {
                          Object.keys(row[column.key]).map(key => {
                            return <div key={key}>{capitalizeFirstLetter(key)}: {Number(row[column.key][key]).toFixed(3)}</div>
                          })
                        }
                      </>
                      :
                      <>{row[column.key]}</>
                  }

                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
