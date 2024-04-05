import { Link } from "react-router-dom";
const NotFound = ()=>{
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:'100vh'}}>
            <div className="text-center">
                <h2>PAGINA NO ENCONTRADA 404 :C</h2>
                <Link to="/">VOLVER ATRAS</Link>
            </div>
        </div>
    );
}
export default NotFound;