import React from 'react';
import './Table.css';

const Table = ({ data, headers }) => {
  console.log(data)
  console.log(headers)
  if (!data || data.length === 0 || !headers || headers.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((column) => (
              <th
                key={column.key}
                style={{
                  ...column.minWidth?{minWidth: column.minWidth}:{minWidth: '100px'},
                  ...column.headerStyle,
                }}
              >
                {column.key}
              </th>
            ))}
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
                  {row[column.key]}
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
