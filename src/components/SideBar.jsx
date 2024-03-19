import { Button } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

const SideBar = ({ title,handleShowSideBar }) => {
    return (
    <div
        className="position-fixed z-3 "
        style={{ height: "100vh", width: "100vh" }}
    >
        <div className="d-flex">
            <div className="bg-danger text-white p-2" style={{height:'100vh',width:'20% '}}>
                <span className="fw-bold ">{title}</span>
                <ul className="list-group list-category">
               
                </ul>
            </div>
            <div className="bg-dark text-white opacity-50" style={{height:'100vh',width:'80% '}} onClick={handleShowSideBar}>
                <Button
                    variant="dark"
                    className="text-white fw-bold"

                >
                    <IoClose size={25}/>
                </Button>
            </div>
        </div>
    </div>
    )
};
export default SideBar;
