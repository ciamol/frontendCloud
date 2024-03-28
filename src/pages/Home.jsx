import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Footer from "../components/Footer";
import Options from "../components/Options";
// import CardVideo from "../components/CardVideo";
import ModalShow from "../components/Modal";
import { Button } from "react-bootstrap";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import FormsCategory from "../forms/FormsCategory";
import FormUpload from "../forms/FormUpload";
import { useDispatch, useSelector } from "react-redux";
import { getContentCategory } from "../actions/category";
import { getAllCity } from "../actions/city";
import { getFile, downloadFile } from "../actions/file";
import VideoTable from "../tables/VideoTable";
import { ToastContainer, toast } from "react-toastify";
import { getAllJournalist } from "../actions/journalist";
import { filter } from "../redux/filterSlice";
const Home = () => {
  const [show, setShow] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [displaySideBar, setDisplaySideBar] = useState(false);
  const { id, name, rol } = useSelector((state) => state.user);
  const { dateNow, city } = useSelector((state) => state.filter);
  const [listCategory, setListCategory] = useState([]);
  const [listCity, setListCity] = useState([]);
  const [listFile, setListFile] = useState([]);
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
    items.forEach((element) => {
      element.classList.remove("active-option");
    });
    const category = e.target.closest("li");
    const idCategory = category.getAttribute("data-id");
    dispatch(
      filter({
        dateNow: dateNow,
        city: city,
        journalist: idCategory,
      })
    );
    category.classList.add("active-option");
  };
  const handleContentFile = (e) => {
    const idFile = e.target.closest("tr").id;
    const titleFile = e.target.closest("tr").querySelector("td:nth-child(2)").textContent;
    getFile(idFile)
      .then((response) => {
        setFileContent(response.content);
      })
      .catch((error) => console.log(error));
    downloadFile(idFile)
      .then((response) => {
        setFileInfo({
          urlFile: response.url,
          titleFile: titleFile,
        });
      })
      .catch((error) => console.log(error));
  };
  const handleDownload = (e) => {
    const urlFile = e.target.closest("button").getAttribute("data-url");
    window.open(urlFile);
  };

  useEffect(() => {
    // getAllCategory()
    getAllCity()
      .then((result) => setListCity(result))
      .catch((error) => console.log(error));
    getAllJournalist()
      .then((response) => {
        setListCategory(response);
      })
      .catch((error) => console.log(error));
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
          <FormsCategory handleClose={handleClose} />
        </ModalShow>
      )}
      {rol === 1 && (
        <ModalShow
          title={"SUBIR ARCHIVO"}
          show={showUpload}
          handleClose={handleClose}
        >
          <FormUpload listCategory={listCategory} handleClose={handleClose} />
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
              className="h-100 overflow-auto p-2 d-none d-sm-block"
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
                <div className="fw-bold text-white cursor-pointer">
                  <Button
                    variant="danger"
                    data-url={fileInfo.urlFile}
                    title={`DESCARGAR ${fileInfo.titleFile}`}
                    onClick={handleDownload}
                  >
                    <span>DESCARGAR</span>
                    <FaCloudDownloadAlt size={25} />
                  </Button>
                </div>
              </div>
              <div className="h-50 bg-dark">
                <iframe
                  src={fileContent}
                  frameBorder="0"
                  style={{ width: "100%", height: "100%" }}
                ></iframe>
              </div>
              <VideoTable city={listCity} handleContentFile={handleContentFile}/>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default Home;
