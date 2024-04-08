import FormSearch from "../forms/FormSearch";
import Button from 'react-bootstrap/Button';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloudUpload } from "react-icons/io";
import { useSelector } from "react-redux";
import { logout } from "../actions/auth";
import { TbHistoryToggle } from "react-icons/tb";
const NavBar = ({ title,handleShow,handleShowSideBar }) => {
    const {rol} = useSelector((state)=>state.user)   
    const handleLogout =()=>{
        logout()            
        window.location.reload();        
    }
    return (
        <div className="w-100 position-fixed top-0 z-2" >
        <div className='d-flex  justify-content-between pt-2 pb-2 p-2 text-white align-items-center' style={{background:"#FF9393"}}>
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
            <div className="d-flex gap-4 fw-bold align-items-center">
                <Button
                    variant={`outline-danger`}
                    size="sm"   
                    id="history"
                    className="text-white fw-bold" title="HISTORIAL"
                    onClick={handleShow}                
                >
                    <TbHistoryToggle size={30}/>
                </Button>
                {rol===1 && <Button
                    onClick={handleShow}
                    variant={`outline-danger`}
                    size="sm"
                    id="upload-file"
                    className="text-white"
                >
                    <span className="cursor-pointer d-flex align-items-center"                   
                    ><span className="d-none d-sm-block fw-bold"> SUBIR ARCHIVO </span><IoMdCloudUpload size={30}/> </span>            
                </Button>}
                <Button
                    variant={`outline-danger`}
                    size="sm"   
                    className="text-white" 
                    onClick={handleLogout}                
                >
                    <span className="cursor-pointer fw-bold">SALIR</span>
                </Button>
            </div>
        </div>
            
        </div>
    )
}
export default NavBar;