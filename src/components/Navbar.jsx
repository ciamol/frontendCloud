import FormSearch from "../forms/FormSearch";
import Button from 'react-bootstrap/Button';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
const NavBar = ({ title,handleShow,handleShowSideBar }) => {
    const {id,name,rol} = useSelector((state)=>state.user)
    const navigate = useNavigate();
    const handleLogout =()=>{
        logout()            
        window.location.reload();        
    }
    return (
        <div className="w-100 position-fixed top-0 z-2" >
        <div className='d-flex  justify-content-between pt-3 pb-3 p-3 text-white align-items-center' style={{background:"#FF9393"}}>
            <div className="d-flex ">
                <span className="fw-bold d-none d-sm-block cursor-pointer">{title}</span>
                <Button
                    onClick={handleShowSideBar}
                    size="sm"
                    variant={`danger`}
                    className="d-block d-sm-none"
                >
                    <GiHamburgerMenu size={20}/>
                </Button>
            </div>
            <div className="d-flex " style={{width:"40%"}}>
                <FormSearch />
            </div>
            <div className="d-flex gap-4 fw-bold align-items-center">
                {rol===1 && <Button
                    onClick={handleShow}
                    variant={`outline-danger`}
                    size="sm"
                    id="upload-file"
                    className="text-white"
                >
                    <span className="cursor-pointer d-flex align-items-center" 
                  
                    ><span className="d-none d-sm-block"> SUBIR ARCHIVO </span><IoMdCloudUpload size={30}/> </span>            
                </Button>}
                <Button
                    variant={`outline-danger`}
                    size="sm"   
                    className="text-white" 
                    onClick={handleLogout}                
                >
                    <span className="cursor-pointer ">SALIR</span>
                </Button>
            </div>
        </div>
            
        </div>
    )
}
export default NavBar;