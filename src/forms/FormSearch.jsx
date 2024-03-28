import { Input } from "../components/Input";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import {  useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { filter } from "../redux/filterSlice";

const FormSearch = ({city}) => {  
  const { dateNow,journalist } = useSelector((state) => state.filter);
  const [cityFilter,setCityFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(dateNow);  
  const dispatch = useDispatch();  
  const submitSearch = (e) => {
    e.preventDefault();
    dispatch(filter({
      dateNow:dateFilter,
      city:cityFilter,
      journalist:journalist
    }))
  };
  return (
    <form className="d-flex w-100" onSubmit={submitSearch}>
      <Input 
        type={`date`}      
        value={dateFilter}
        onChange={(e)=>setDateFilter(e.target.value)}
      />
      <select 
      name="city" 
      id="city" 
      className="form-select form-select-sm"
      value={cityFilter} 
      onChange={(e)=>setCityFilter(e.target.value)} 
      >
        <option value="0">Seleccione el departamento...</option>
        {city.statusCode !== 401 ? (
          Object.keys(city).map((key) => (
            <option value={city[key].id_ciudad} key={key}>{city[key].nombre}</option>
          ))
        ) : (
          <option value="0">No se pudo cargar...</option>
        )}
      </select>
      <Button size="sm" variant="danger" type="submit" className="d-flex fw-bold align-items-center">
        <FaSearch />   BUSCAR
      </Button>
    </form>
  );
};
export default FormSearch;
