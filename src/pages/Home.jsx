import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Options from "../components/Options";
import CardVideo from "../components/CardVideo";
import ModalShow from "../components/Modal";
import { useState } from "react";
import FormsCategory from "../forms/FormsCategory";
import FormUpload from "../forms/FormUpload";
import { useSelector } from "react-redux";
const Home = () => {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [displaySideBar,setDisplaySideBar] = useState(false);
  const {id,name,rol} = useSelector((state)=>state.user)

  const handleShowSideBar = () =>
  {    
    setDisplaySideBar(!displaySideBar)
  }
  const handleClose = () => {
    setShow(false);
    setShowUpload(false);
  };
  const handleShow = (e) => {
    const id = e.target.closest("button").getAttribute("id");
    console.log(id);
    if (id === "category") {
      setShow(true);
    } else if (id === "upload-file") {
      setShowUpload(true);
    }
  };
  
  return (
    <div className="">
      {rol===1 && <ModalShow
        title="AGREGAR CATEGORIA"
        show={show}
        handleClose={handleClose}
      >
        <FormsCategory handleClose={handleClose} />
      </ModalShow>}
      {rol ===1 && <ModalShow
        title={"SUBIR ARCHIVO"}
        show={showUpload}
        handleClose={handleClose}
      >
        <FormUpload handleClose={handleClose} />
      </ModalShow>}
      <NavBar title={`BOLIVISION`} handleShow={handleShow} handleShowSideBar={handleShowSideBar}/>
      {displaySideBar? <SideBar title={`BOLIVISION`} handleShowSideBar={handleShowSideBar}></SideBar>:''}
      <div
        className="position-relative"
        style={{ height: "100vh", background: "#EBEBEB" }}
      >
        <div
          className="position-absolute h-80 w-100 "
          style={{ top: "5em", bottom: "4em" }}
        >
          <div className="d-flex justify-content-between h-100 ">
            <div className="h-100 overflow-auto p-2 d-none d-sm-block" style={{ width: "20%" }}>
              <Options handleShow={handleShow}></Options>
            </div>
            <div
              className="h-100 flex-grow-1  overflow-auto "
              style={{ width: "70%" }}
            >
              <div className="h-50 bg-dark"></div>
              <div className="d-flex flex-wrap justify-content-center h-50 p-2 gap-2">
                <CardVideo titulo={`Titulo del video`}></CardVideo>
                <CardVideo titulo={`Titulo del video`}></CardVideo>
                <CardVideo titulo={`Titulo del video`}></CardVideo>
                <CardVideo titulo={`Titulo del video`}></CardVideo>
                <CardVideo titulo={`Titulo del video`}></CardVideo>
                <CardVideo titulo={`Titulo del video`}></CardVideo>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
