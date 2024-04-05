import React, { useState, useEffect } from "react";
import { Input } from "../components/Input";
import { IoMdCloudDownload } from "react-icons/io";
import { Button } from "react-bootstrap";
import { getAllFile } from "../actions/file";
import { useSelector } from "react-redux";
import FormSearch from "../forms/FormSearch";
import { toast } from "react-toastify";
const VideoTable = ({city,handleContentFile,listFile}) => {
 
  // console.log(listFile)
  const [search, setSearch] = useState("");
  // useEffect(()=>{  
  //   console.log(listFile)
  //   setDataTable(listFile)
  //   // getAllFile(filter)
  //   // .then((response) => {response.ok? setDataTable(response.files):toast.error(response.msg)})
  //   // .catch((error) => console.log(error));    
  // },[])
  const filteredData = listFile.filter((video) =>
  video.nombre.toLowerCase().includes(search.toLowerCase())
);
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };  
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap p-2" style={{backgroundColor:'#ea868f'}}>
        <div>
          <FormSearch 
            city={city}
          />
        </div>
        <div  style={{ width: "30%" }}>
          <Input
            placeholder="BUSCAR EL NOMBRE ..."
            type="search"
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="table-responsive">
      <table className="table  table-sm mb-0 table-hover">
        <thead className="table-primary">
          <tr>
            <th>NRO</th>
            <th>NOMBRE</th>
            <th>PERIODISTA</th>
            <th>CIUDAD</th>
            <th>TIPO</th>
            <th>FECHA ELABORACION</th>
            <th>DESCARGAR</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((video, index) => (
            <tr key={index} className="cursor-pointer" id={video.id_archivo} onClick={handleContentFile}
            >
              <td>{index+1}</td>
              <td>{video.nombre}</td>
              <td>{video.nom_periodista}</td>
              <td>{video.nom_ciudad}</td>
              <td>{video.nom_tipo}</td>
              <td>{video.fecha_elaboracion? video.fecha_elaboracion.split('T')[0]:'' }</td>
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
      </div>

      {/* <nav aria-label="Page navigation example ">
        <ul className="pagination justify-content-end">
          <li className="page-item disabled">
            <a className="page-link">ANTERIOR</a>
          </li>             
          <li className="page-item">
            <a className="page-link" href="#">
              SIGUIENTE
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};
export default VideoTable;
