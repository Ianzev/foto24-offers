import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBigRight } from "lucide-react"
import { Table, Button, Pagination} from 'react-bootstrap';


function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("id"); // Default sort by id
  const [sortOrder, setSortOrder] = useState("asc"); // Default sort order ascending

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleUpdateStock = async () => {
    try {
      await fetch('http://localhost:3001/products/updatestock', { method: 'PUT' });
      // After updating stock, fetch products again to update the UI
      const response = await fetch('http://localhost:3001/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleSort = (criteria) => {
    if (sortBy === criteria) {
      // If already sorted by the same criteria, toggle the order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // If sorting by a new criteria, set the new criteria and default to ascending order
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedProducts = products.slice().sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    // Convert price values to numbers for correct sorting
    if (sortBy === 'price') {
      aValue = parseFloat(aValue.replace(/[^\d.-]/g, ''));
      bValue = parseFloat(bValue.replace(/[^\d.-]/g, ''));
    }

    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  return (
    <>

    <div className="flex justify-between items-center bg-white w-full p-4 ">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className=""variant="primary" onClick={handleUpdateStock}>Update</Button>
    </div>



    <Table striped bordered hover>
      <thead>
        <tr>
          <th  onClick={() => handleSort("id")}>
            ID {sortBy === "id" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sku")}>
            SKU {sortBy === "sku" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("name")}>
            Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("price")}>
            Price {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("foto24")}>
            Foto24 {sortBy === "foto24" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("photo24")}>
            Photo24 {sortBy === "photo24" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("stockmalaga")}>
            Malaga {sortBy === "stockmalaga" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("stockqmedia")}>
            Qmedia {sortBy === "stockqmedia" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales1")}>
            1 day {sortBy === "sales1" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales10")}>
            10 days {sortBy === "sales10" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales30")}>
            30 days {sortBy === "sales30" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales90")}>
            90 days {sortBy === "sales90" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales180")}>
            180 days {sortBy === "sales180" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("sales365")}>
            365 days {sortBy === "sales365" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
          <th  onClick={() => handleSort("brand")}>
            Brand {sortBy === "brand" && (sortOrder === "asc" ? "▲" : "▼")}
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedProducts.map(product => (
          <tr key={product.sku}>
            <td>{product.id}</td>
            <td>
              <Link className='link' to={`/products/${product.sku}`}>{product.sku}</Link>
            </td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td className='link'><a className="link" href={product.urlfoto24}>{<ArrowBigRight size={20}/>}</a></td>
            <td><a className="link" href={product.urlphoto24}>{<ArrowBigRight size={20}/>}</a></td>
            <td>{product.stockmalaga}</td>
            <td>{product.stockqmedia}</td>
            <td>{product.sales1}</td>
            <td>{product.sales10}</td>
            <td>{product.sales30}</td>
            <td>{product.sales90}</td>
            <td>{product.sales180}</td>
            <td>{product.sales365}</td>
            <td>{product.brand}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  );
}

export default ProductsTable;
