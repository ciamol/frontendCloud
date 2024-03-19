import { Input } from "../components/Input";
import Button from "react-bootstrap/Button";
import { FaSearch } from "react-icons/fa";
import { searchFile } from "../actions/file";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const FormSearch = () => {
  const [search, setSearch] = useState("");
  const submitSearch = (e) => {
    e.preventDefault();
    searchFile(search)
      .then((response) => {
        if (response.content.total_count <= 0) {
          toast.warning(response.content.total_count+" ARCHIVOS ENCONTRADOS");
        } else {
          toast.success(response.content.total_count + " ARCHIVOS ENCONTRADOS");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <form className="d-flex w-100" onSubmit={submitSearch}>
      <ToastContainer autoClose={2000} />
      <Input
        type={`search`}
        placeholder={`Buscar...`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      ></Input>
      <Button size="sm" variant="danger" type="submit">
        <FaSearch />
      </Button>
    </form>
  );
};
export default FormSearch;
