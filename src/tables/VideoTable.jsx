import React, { useState } from "react";
import { Input } from "../components/Input";
import { IoMdCloudDownload } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { Button } from "react-bootstrap";
import FormSearch from "../forms/FormSearch";
const VideoTable = ({city,handleContentFile,listFile}) => {
  const [search, setSearch] = useState("");
  const [next,setNext] = useState(5);
  const [prev,setPrev] = useState(0);
  const filteredData = listFile.filter((video) =>
    video.nombre.toLowerCase().includes(search.toLowerCase())
  );
  const pagination = () =>{
    return filteredData.slice(prev,next);
  }
  const nextPagination = ()=>{    
    if(next < listFile.length)
    {
      setNext(next+5);
      setPrev(prev+5)    
    }
  }
  const prevPagination = () => {
    if(prev >0)
    {
      setNext(next-5);
      setPrev(prev-5);
    }
  }
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
            <th>NOMBRE</th>
            <th>PERIODISTA</th>
            <th>CIUDAD</th>
            <th>TIPO</th>
            <th>FECHA ELABORACION</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          {pagination().map((video, index) => (
            <tr key={index} className="cursor-pointer" id={video.id_archivo} onClick={handleContentFile}
            >         
              <td>{video.nombre}</td>
              <td>{video.nom_periodista}</td>
              <td>{video.nom_ciudad}</td>
              <td>{video.nom_tipo}</td>
              <td>{video.fecha_elaboracion? video.fecha_elaboracion.split('T')[0]:'' }</td>
              <td>
                {/* <Button 
                  variant="outline-primary" 
                  size="sm" 
                 id="edit"
                 title="EDITAR"
                 >
                  <FaRegEdit size={20} />
                </Button> */}
                <Button variant="outline-success" size="sm" 
                 id="download"
                 className="w-100"
                 title="DESCARGAR"
                 >
                  <IoMdCloudDownload size={25} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <nav aria-label="Page-navigation" className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold">TOTAL {listFile.length} ARCHIVOS ENCONTRADOS</h5>
        <ul className="pagination justify-content-end gap-2 mt-2">
          <li className="page-item ">
            <Button variant="secondary" onClick={prevPagination}>ANTERIOR</Button>
          </li>             
          <li className="page-item">
            <Button variant="secondary" onClick={nextPagination}>SIGUIENTE</Button>        
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default VideoTable;
