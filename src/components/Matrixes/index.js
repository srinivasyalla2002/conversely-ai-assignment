import React, { useState } from 'react';
import './index.css';

const Matrix = () => {
  const initialMatrix = Array(9).fill(''); // 9 empty boxes
  const [matrix, setMatrix] = useState(initialMatrix);
  const [clickedOrder, setClickedOrder] = useState([]);

  const handleClick = (index) => {
    // Prevent further clicks after all boxes turn orange
    if (matrix[index] === 'green' || matrix[index] === 'orange') return;

    const newMatrix = [...matrix];
    newMatrix[index] = 'green'; 
    setMatrix(newMatrix);

    const newClickedOrder = [...clickedOrder, index];
    setClickedOrder(newClickedOrder);

    // If all boxes have been clicked, change them to orange sequentially
    if (newClickedOrder.length === 9) {
      changeToOrangeSequentially(newClickedOrder);
    }
  };

  const changeToOrangeSequentially = (order) => {
    order.forEach((index, i) => {
      setTimeout(() => {
        setMatrix((prevMatrix) => {
          const updatedMatrix = [...prevMatrix];
          updatedMatrix[index] = 'orange';
          return updatedMatrix;
        });
      }, i * 500);
    });
  };

  return (
    <div className="matrix">
      {matrix.map((color, index) => (
        <div
          key={index}
          className="box"
          style={{ backgroundColor: color || 'white' }}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default Matrix;
