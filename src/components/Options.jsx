import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const Options = ({handleShow,children }) => {
    const {id,name,rol} = useSelector((state)=>state.user)
    
    return (
        <div className="w-100 ">
            <ul className="list-group" >
                <li className="text-center ">
                    {rol===1 && <Button 
                        variant="secondary"
                        onClick={handleShow}
                        id="category"
                    className="p-2" style={{width:'100%',height:'100%'}}>
                        <FaPlus size={30} />
                        <p className="p-0 m-0 cursor-pointer">AGREGAR</p>
                    </Button>}
                </li>
                {children}            
            </ul>
        </div>
    )
}
export default Options