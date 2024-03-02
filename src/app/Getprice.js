import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { PDFDocument } from "pdf-lib";
import {Link} from 'react-router-dom';

function Getprice() {

  const [numPages, setNumPages] = useState(null);
  const [printColor, setPrintColor] = useState(true); // Default to color printing
  const [duplexPrinting, setDuplexPrinting] = useState(false); // Default to single-sided printing
  const [totalPrice, setTotalPrice] = useState(null);

 
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file.type === "application/pdf") {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setNumPages(pdfDoc.getPages().length);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleColorChange = (event) => {
    setPrintColor(event.target.value === 'color');
  };

  const handleDuplexChange = (event) => {
    setDuplexPrinting(event.target.checked);
  };

  const calculateTotalPrice = () => {
    const pricePerPage = printColor ? 5 : 2;
    let totalPages = numPages;

    // Adjust total pages for duplex printing
    if (duplexPrinting) {
      // If duplex printing, we assume one physical page per PDF page
    } else {
      // If not duplex printing, we assume two PDF pages per physical page
      totalPages = Math.ceil(numPages / 2);
    }

    const totalPrice = totalPages * pricePerPage;
    setTotalPrice(totalPrice);
  };

  const handlePrint = () => {
    // Calculate total price before printing
    calculateTotalPrice();
    // Add your logic for printing here
  };



  return (
    <div className="container-prices">
    <div className="form-prices">
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {numPages !== null && (
        <div>
          <p>Number of pages: {numPages}</p>
          <div>
            <input
              type="radio"
              id="color"
              name="printColor"
              value="color"
              checked={printColor}
              onChange={handleColorChange}
            />
            <label htmlFor="color">Color</label>
            <input
              type="radio"
              id="bw"
              name="printColor"
              value="bw"
              checked={!printColor}
              onChange={handleColorChange}
            />
            <label htmlFor="bw">Black & White</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="duplex"
              checked={duplexPrinting}
              onChange={handleDuplexChange}
            />
            <label htmlFor="duplex">One side</label>

            {
              totalPrice !=null && (
                <p>Total Price: {totalPrice} Rs</p>
              )
            }
          </div>
          <button onClick={handlePrint} className='btn-prices'> Get price</button>
        </div>
      )}
    </div>
   
      <div className="prices-prices">
        <p>Prices:</p>
        <p>Color: 5 Rs per page</p>
        <p>Black & White: 2 Rs per page</p>
        <p>One side: Double the price</p>
      </div>
  <Link to='/' className='to-home-btn'>TO HOME PAGE</Link>
  </div>
  );
}

export default Getprice;
  