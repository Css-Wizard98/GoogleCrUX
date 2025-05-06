import React from 'react';
import './Table.css';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import {capitalizeFirstLetter} from "../../utils/utils"

const Table = ({ data, headers }) => {
  if(!headers || headers.length === 0) return <></>
  if (!data || data.length === 0) {
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
                <div  style={{
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
            )) }
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  style={{
                    ...column.minWidth?{minWidth: column.minWidth}:{minWidth: '100px'},
                    ...column.cellStyle,
                  }}
                > 
                  {
                    typeof(row[column.key]) === "object" ? 
                    <>
                      {
                        Object.keys(row[column.key]).map(key => {
                          return <div key={key}>{capitalizeFirstLetter(key)}: {row[column.key][key]}</div>
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
