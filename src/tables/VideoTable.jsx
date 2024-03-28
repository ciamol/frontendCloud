import React, { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { IoMdCloudDownload } from "react-icons/io";
import { Button } from "react-bootstrap";
import { getAllFile } from "../actions/file";
import { useSelector } from "react-redux";
import FormSearch from "../forms/FormSearch";
const VideoTable = ({city,handleContentFile}) => {
  const [dataTable, setDataTable] = useState([]);  
  const filter  = useSelector((state) => state.filter);
  const [search, setSearch] = useState("");
  useEffect(()=>{  
    // console.log(filter)
    getAllFile(filter)
    .then((response) => setDataTable(response))
    .catch((error) => console.log(error));
    
  },[filter])
  const filteredData = dataTable.filter((video) =>
  video.nombre.toLowerCase().includes(search.toLowerCase())
);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };  
  return (
    <div>
      <div className="d-flex justify-content-between p-2" style={{backgroundColor:'#ea868f'}}>
        <div>
          <FormSearch 
            city={city}
          />
        </div>
        <div style={{ width: "30%" }}>
          <Input
            placeholder="Buscar..."
            type="search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="table  table-sm mb-0 table-hover">
        <thead className="bg-dark">
          <tr>
            <th>NRO</th>
            <th>NOMBRE</th>
            <th>DESCRIPCION</th>
            <th>PERIODISTA</th>
            <th>TIPO</th>
            <th>DESCARGAR</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((video, index) => (
            <tr key={index} className="cursor-pointer" id={video.id_archivo} onClick={handleContentFile}
            >
              <td>{index+1}</td>
              <td>{video.nombre}</td>
              <td>{video.descripcion}</td>
              <td>{video.nom_periodista}</td>
              <td>{video.nom_tipo}</td>
              <td>
                <Button variant="outline-success" size="sm" className="w-100"
                 id="download"
                 >
                  <IoMdCloudDownload size={25} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-end">
          <li className="page-item disabled">
            <a className="page-link">ANTERIOR</a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>       
          <li className="page-item">
            <a className="page-link" href="#">
              SIGUIENTE
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default VideoTable;
