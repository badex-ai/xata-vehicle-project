import React, { useState } from 'react';

interface Column {
  name: string;
  type: string;
}

const collisionColumns: Column[] = [
  { name: 'id', type: 'text' },
  { name: 'timestamp', type: 'timestamptz' },
  { name: 'state_name', type: 'text' },
  { name: 'state_abbr', type: 'text' },
  { name: 'location_of_collision', type: 'text' },
  { name: 'driver_sex', type: 'text' },
  { name: 'driver_experience', type: 'int8' },
  { name: 'cause_of_collision', type: 'text' },
  { name: 'vehicle_plate_number', type: 'text' },
  { name: 'vehicle_brands', type: 'text' }
];

const vehicleBrandsColumns: Column[] = [
  { name: "name", type: "string" },
  { name: "model", type: "string" },
  { name: "vehicle_image", type: "file" },
  { name: "vehicle_type", type: "string" },
];

const SQLQueryBuilder: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [whereClause, setWhereClause] = useState<string>('');
  const [orderByClause, setOrderByClause] = useState<string>('');
  const [limit, setLimit] = useState<number | null>(null);

  const handleSelectColumn = (columnName: string) => {
    setSelectedColumns(prev => 
      prev.includes(columnName) 
        ? prev.filter(col => col !== columnName)
        : [...prev, columnName]
    );
  };

  const handleWhereClause = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhereClause(event.target.value);
  };

  const handleOrderByClause = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderByClause(event.target.value);
  };

  const handleLimit = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(parseInt(event.target.value) || null);
  };

  const buildQuery = () => {
    let queryString = 'SELECT ';
    
    if (selectedColumns.length === 0) {
      queryString += '* ';
    } else {
      queryString += selectedColumns.join(', ') + ' ';
    }
    
    queryString += 'FROM collisions ';
    
    if (whereClause) {
      queryString += `WHERE ${whereClause} `;
    }
    
    if (orderByClause) {
      queryString += `ORDER BY ${orderByClause} `;
    }
    
    if (limit !== null) {
      queryString += `LIMIT ${limit}`;
    }
    
    setQuery(queryString.trim());
  };

  return (
    <div>
      <h2>SQL Query Builder</h2>
      
      <div>
        <h3>Select Columns:</h3>
        {collisionColumns.map(col => (
          <button 
            key={col.name}
            onClick={() => handleSelectColumn(col.name)}
            style={{ backgroundColor: selectedColumns.includes(col.name) ? 'lightblue' : 'white' }}
          >
            {col.name}
          </button>
        ))}
      </div>
      
      <div>
        <h3>Where Clause:</h3>
        <input 
          type="text" 
          value={whereClause} 
          onChange={handleWhereClause} 
          placeholder="e.g. state_name = 'California'"
        />
      </div>
      
      <div>
        <h3>Order By:</h3>
        <select value={orderByClause} onChange={handleOrderByClause}>
          <option value="">Select column</option>
          {collisionColumns.map(col => (
            <option key={col.name} value={col.name}>{col.name}</option>
          ))}
        </select>
      </div>
      
      <div>
        <h3>Limit:</h3>
        <input 
          type="number" 
          value={limit || ''} 
          onChange={handleLimit} 
          placeholder="Enter limit"
        />
      </div>
      
      <button onClick={buildQuery}>Build Query</button>
      
      <div>
        <h3>Generated Query:</h3>
        <pre>{query}</pre>
      </div>
    </div>
  );
};

export default SQLQueryBuilder;