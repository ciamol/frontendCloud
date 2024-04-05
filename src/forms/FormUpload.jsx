import { useRef, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "react-bootstrap";
import { FaFileImage } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { addFile } from "../actions/file";
const FormUpload = ({ handleClose, listCategory, listCity,loadFile }) => {
  const inputFileRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [typeFile, setTypeFile] = useState("");
  const [journalist, setJournalist] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [nameFile, setNameFile] = useState("");
  const handleButtonFile = () => {
    inputFileRef.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const type = file.type.split("/").shift();
      if (type !== "image" && type !== "video") {
        toast.warning("SOLO SE ADMITE IMAGENES Y VIDEOS");
      } else {
        setTypeFile(type);
        const reader = new FileReader();
        reader.onload = (event) => setPreview(event.target.result);
        reader.readAsDataURL(file);
      }
    }
  };
  const handleCloseImg = (e) => {
    setTypeFile("");
    setPreview(null);
  };
  const validationForm = (formData) => {
    // console.log(formData);
    for(let key in formData){
      if(!formData[key]){
        return false;
      }
    }
    return true;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      journalist,
      date,
      type,
      city,
      name: nameFile,
      file: preview,
      typeFile: typeFile,
    };
    if(validationForm(formData) ){
      try {
        const loadingToast = toast.loading('Subiendo Archivo',{autoClose:false})        
        const response =  await addFile(formData);
        if(!response.ok){
          toast.dismiss(loadingToast)
          throw new Error('Error al subir');
        }
        handleClose();
        setPreview(null);
        setTypeFile("");
        setJournalist("");
        setDate("");
        setType("");
        setCity("");
        setNameFile("");
        toast.dismiss(loadingToast);
        toast.success(`Se subio correctamente`);
        loadFile();
      }catch(error){
        console.log(error)
        toast.error(`Error al subir`)  
      }
    }else{
      toast.error('No se aceptan campos vacios')
    }
    
    // console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row form-group">
        <div className="col-sm-6">
          <label htmlFor="journalist">PERIODISTA:</label>
          <select
            name="journalist"
            className="form-select form-select-sm"
            onChange={(e) => setJournalist(e.target.value)}
            value={journalist}
          >
            <option value="">Seleccione al periodista...</option>
            {Object.keys(listCategory).map((key) => (
              <option value={listCategory[key].id} key={key}>
                {listCategory[key].name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-6">
          <label htmlFor="city_origin">CIUDAD ORIGEN:</label>
          <select
            name="city_origin"
            id="city_origin"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-select form-select-sm"
          >
            <option value="">Seleccion la ciudad...</option>
            {Object.keys(listCity).map((key) => (
              <option value={listCity[key].id_ciudad} key={key}>
                {listCity[key].nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-sm-6">
          <label htmlFor="date">FECHA ELABORACION NOTA:</label>
          <Input
            type={`date`}
            name="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            value={date}
          />
        </div>
        <div className="col-sm-6">
          <label htmlFor="type">TIPO:</label>
          <select
            name="type"
            onChange={(e) => setType(e.target.value)}
            value={type}
            className="form-select form-select-sm"
          >
            <option value="">SELECCIONE EL TIPO...</option>
            <option value="1">NOTA</option>
            <option value="2">VO</option>
            <option value="3">VTR</option>
            <option value="4">REPORTAJE</option>
          </select>
        </div>
      </div>
      <div className="row form-group">
        <div className="col-sm-12">
          <label htmlFor="name">NOMBRE:</label>
          <Input
            type={`text`}
            onChange={(e) => setNameFile(e.target.value)}
            value={nameFile}
            name="name"
          />
        </div>
      </div>
      <div className="row mt-3 ">
        <div className="col-md-12 ">
          <div
            className="bg-dark text-white text-center fw-bold position-relative"
            style={{ height: "15rem" }}
          >
            <div className="position-absolute end-0 m-2">
              {!!typeFile ? (
                <Button variant={`dark`} onClick={handleCloseImg}>
                  <IoClose size={25} />
                </Button>
              ) : (
                ""
              )}
            </div>
            {!!!typeFile ? (
              `¡AUN NO SE CARGO UN ARCHIVO!`
            ) : typeFile === "video" ? (
              <video
                src={preview}
                type="video"
                controls
                className="cursor-pointer"
                style={{ height: "15rem", width: "80%" }}
              ></video>
            ) : (
              <img
                src={preview}
                style={{ height: "15rem", width: "80%" }}
              ></img>
            )}
          </div>
          <Input
            type={`file`}
            className={`d-none`}
            id={`fileInput`}
            ref={inputFileRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
          ></Input>
          <Button
            variant="success"
            className="w-100 fw-bold"
            onClick={handleButtonFile}
          >
            CARGAR ARCHIVO
            <FaFileImage />
          </Button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <Button type={`submit`} className="w-100 fw-bold">
            SUBIR
          </Button>
        </div>
        <div className="col-md-6 ">
          <Button
            onClick={handleClose}
            variant="danger"
            className="w-100 fw-bold"
          >
            CANCELAR
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormUpload;
