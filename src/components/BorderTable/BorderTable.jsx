import React from 'react';
import { capitalizeFirstLetter } from '../../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const BorderTable = ({ headers, data }) => {
  if (!headers || headers.length === 0) return <></>
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <table style={{ borderCollapse: 'collapse', width: '100%',marginBottom:100 }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ddd', padding: '18px', width: '50%', background: '#f0f0f0', fontWeight: 'bold' }}>Metrics</th>
          <th style={{ border: '1px solid #ddd', padding: '18px', width: '50%', background: '#f0f0f0', fontWeight: 'bold' }}>Data</th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header) => (
          <tr key={header.key}>
            <td style={{ border: '1px solid #ddd', padding: '12px', width: '50%', background: '#f0f0f0', fontWeight: 'bold' }}>
              {header.tooltip ?
                (<Tooltip placement="top" title={
                  <Typography color="inherit">{header.tooltip}</Typography>
                }>
                  <span>{header.label}</span>
                </Tooltip>) :
                header.label
              }
            </td>
            <td style={{ border: '1px solid #ddd', padding: '12px', width: '50%' }}>
              {typeof data[header.key] === 'object'
                ? Object.keys(data[header.key]).map((key) => (
                  <div key={key}>
                    <span style={{ color: 'rgb(132 126 126)', marginRight: 5 }}>{capitalizeFirstLetter(key)}</span>: {data[header.key][key]}
                  </div>
                ))
                : data[header.key]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BorderTable;