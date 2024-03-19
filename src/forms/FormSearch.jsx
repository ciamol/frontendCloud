import { Input } from "../components/Input";
import Button from 'react-bootstrap/Button';
import { FaSearch } from "react-icons/fa";

const FormSearch = () => {
    return (
        <form className="d-flex w-100">
            <Input
                type={`search`}
                placeholder={`Buscar...`}
            ></Input>
            <Button
                size="sm"
                variant="danger"
            >
                <FaSearch />

            </Button>
        </form>
    )
}
export default FormSearch;