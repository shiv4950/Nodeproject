import React, { useState } from 'react';

const Row = ({ index, row, optionsCol1, optionsCol2, onRowChange }) => {
  const [newOption, setNewOption] = useState('');

  const handleCol1Change = (e) => {
    onRowChange(index, 'col1', e.target.value);
  };

  const handleCol2Change = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onRowChange(index, 'col2', selectedOptions);
  };

  const handleAddOption = () => {
    if (newOption && !optionsCol2.includes(newOption)) {
      optionsCol2.push(newOption);
      setNewOption('');
    }
  };

  return (
    <tr>
      <td>
        <select
          value={row.col1}
          onChange={handleCol1Change}
        >
          <option value="">Select an option</option>
          {optionsCol1.filter(option => !row.col1 || row.col1 !== option).map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          multiple
          value={row.col2}
          onChange={handleCol2Change}
        >
          {optionsCol2.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div>
          <input
            type="text"
            placeholder="Add new option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
          />
          <button onClick={handleAddOption}>Add</button>
        </div>
      </td>
    </tr>
  );
};

export default Row;
