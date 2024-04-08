import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Options from "../components/Options";
import ModalShow from "../components/Modal";
import { useEffect, useState } from "react";
import FormsCategory from "../forms/FormsCategory";
import FormUpload from "../forms/FormUpload";
import { useDispatch, useSelector } from "react-redux";
import { getAllCity } from "../actions/city";
import { getAllFile } from "../actions/file";
import { getFile, getURLDownloadFile } from "../actions/file";
import VideoTable from "../tables/VideoTable";
import { ToastContainer, toast } from "react-toastify";
import { getAllJournalist } from "../actions/journalist";
import { filter } from "../redux/filterSlice";
const Home = () => {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const { rol } = useSelector((state) => state.user);
  const filters = useSelector((state) => state.filter);
  const [listCategory, setListCategory] = useState([]);
  const [listFile, setListFile] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [fileContent, setFileContent] = useState("");
  const [fileInfo, setFileInfo] = useState({
    urlFile: "",
    titleFile: "",
  });
  const dispatch = useDispatch();
  const handleShowSideBar = () => {
    setDisplaySideBar(!displaySideBar);
  };
  const handleClose = () => {
    setShow(false);
    setShowUpload(false);
  };
  const handleShow = (e) => {
    const id = e.target.closest("button").getAttribute("id");
    if (id === "category") {
      setShow(true);
    } else if (id === "upload-file") {
      setShowUpload(true);
    }
  };
  const handleContentCategory = (e) => {
    const items = e.target.closest("ul").querySelectorAll("li");
    if(displaySideBar)
    {
      setDisplaySideBar(!displaySideBar);
    }
    items.forEach((element) => {
      element.classList.remove("active-option");
    });
    const category = e.target.closest("li");
    const idCategory = category.getAttribute("data-id");
    dispatch(
      filter({
        dateNow: filters.dateNow,
        city: filters.city,
        journalist: idCategory,
      })
    );
    category.classList.add("active-option");
  };
  const handleContentFile = (e) => {
    const idFile = e.target.closest("tr").id;
    const titleFile = e.target.closest("tr").querySelector("td:nth-child(1)").textContent;
    const isDowload = !!e.target.closest("button")?.getAttribute('id')       
    if(titleFile !== fileInfo.titleFile){
      getFile(idFile)
        .then((response) => {
          !!response.content? setFileContent(response.content) : toast.error(`Archivo no encontrado :c`);
          setFileInfo({
            titleFile:titleFile
          })
        })
      .catch((error) => {
        // toast.error(`Ocurrio un error`)  
        console.log(error);
      });   
    }
      if(isDowload){
        const loadingToast = toast.loading(`¡Descargando! ${titleFile}`,{autoClose:false})
        getURLDownloadFile(idFile)
        .then((response)=>{
          if(!response.ok)
          {
            toast.error(`Error al descargar el archivo`);
            throw new Error('Error al descargar el archivo')
          }
          return response.blob();
        })
        .then(blob=>{
          toast.dismiss(loadingToast);
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = titleFile; 
          a.click();
          window.URL.revokeObjectURL(url);
          toast.success(`¡Se descargo correctamente!`);
        })
        .catch(error=>{
          toast.dismiss(loadingToast);
          console.log(error);
          // toast.error('Ocurrio un error')
        })
      }  
  };
  const loadFile = async() => {
      try{
        const response = await getAllFile(filters);
        setListFile(response.files);
      }catch(error){
        console.log(error);
      }
  } 
  const loadJournaList = async() => {
    try{
      const response = await getAllJournalist()
      setListCategory(response);
    }catch(error)
    {
      console.log(error);
    }
  }
  useEffect(()=>{
    loadFile();
  },[filters])
  useEffect(() => {        
    getAllCity()
      .then((result) => setListCity(result))
      .catch((error) => console.log(error));
    loadJournaList();
    
  }, []);
  return (
    <div className="">
      <ToastContainer autoClose={2000} />
      {rol === 1 && (
        <ModalShow
          title="AGREGAR CATEGORIA"
          show={show}
          handleClose={handleClose}
        >
          <FormsCategory handleClose={handleClose} loadJournaList={loadJournaList}/>
        </ModalShow>
      )}
      {rol === 1 && (
        <ModalShow
          title={"SUBIR ARCHIVO"}
          show={showUpload}
          handleClose={handleClose}
        >
          <FormUpload listCategory={listCategory} listCity={listCity} handleClose={handleClose} loadFile={loadFile}/>
        </ModalShow>
      )}
      <NavBar
        title={`BOLIVISION`}
        handleShow={handleShow}
        handleShowSideBar={handleShowSideBar}
      />
      {displaySideBar ? (
        <SideBar title={`BOLIVISION`} handleShowSideBar={handleShowSideBar}>
          {" "}
          {listCategory.statusCode !== 401 ? (
            Object.keys(listCategory).map((key) => (
              <li
                className="list-group-item list-group-item-danger cursor-pointer"
                key={listCategory[key].id}
                data-id={listCategory[key].id}
                id="optionsCat"
                onClick={handleContentCategory}
              >
                <span>{listCategory[key].name}</span>
                <div
                  className="relative flex flex-column"
                  id="toolCategory"
                  data-id={listCategory[key].id}
                ></div>
              </li>
            ))
          ) : (
            <li className="font-bold text-gray-600 text-center">
              No se encontraron datos comuniquese con el administrador...
            </li>
          )}
        </SideBar>
      ) : (
        ""
      )}
      <div
        className="position-relative"
        style={{ height: "100vh", background: "#EBEBEB" }}
      >
        <div
          className="position-absolute h-80 w-100 "
          style={{ top: "3.5em", bottom: "4em" }}
        >
          <div className="d-flex justify-content-between h-100 ">
            <div
              className="h-100 overflow-auto d-none d-sm-block"
              style={{ width: "20%" }}
            >
              <Options
                handleShow={handleShow}
                handleContentCategory={handleContentCategory}
              >
                {listCategory.statusCode !== 401 ? (
                  Object.keys(listCategory).map((key) => (
                    <li
                      className=" list-group-item list-group-item-primary cursor-pointer"
                      key={listCategory[key].id}
                      data-id={listCategory[key].id}
                      id="optionsCat"
                      onClick={handleContentCategory}
                    >
                      <span>{listCategory[key].name}</span>
                    </li>
                  ))
                ) : (
                  <li className="font-bold text-gray-600 text-center">
                    No se encontraron datos comuniquese con el administrador...
                  </li>
                )}
              </Options>
            </div>
            <div
              className="h-100 flex-grow-1 overflow-auto"
              style={{ width: "70%" }}
            >
              <div className="d-flex justify-content-between align-items-center bg-danger p-1  top-0">
                <div className="fw-bold">
                  <span className="text-white">{fileInfo.titleFile}</span>
                </div>    
              </div>
              <div className=" bg-dark" style={{height:"65%"}}>
                <iframe
                  width="300"
                  height="100%"                  
                  src={fileContent}
                  style={{ width: "100%",border: "1px solid black" }}
                ></iframe>
              </div>
              <VideoTable city={listCity} handleContentFile={handleContentFile} listFile={listFile}/>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
