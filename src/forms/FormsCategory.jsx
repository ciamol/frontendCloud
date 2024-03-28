import { useState } from "react";
import { Input } from "../components/Input";
import { Button } from "react-bootstrap";
import { AddJournalist,getAllJournalist } from "../actions/journalist";
import { toast } from "react-toastify";
const FormsCategory = ({handleClose,loadJournaList}) => {
    const [journalist,setJournalist] = useState('');    
    const submitCategory = async (e)=>{
        e.preventDefault();
        const formData = {
            name:journalist
        }  
        const response = await AddJournalist(formData);
        if(response.ok){
            toast.success(`¡${response.msg}!`);
            loadJournaList();   
            handleClose();  
        }else{
            toast.error(`¡${response.errors.name.msg}!`)
        }
    } 
    return (
    <div>
        <form onSubmit={submitCategory}>
            <div className="row ">
                <div className="col-md-12">
                    <label htmlFor="category" className="form-label">NOMBRE</label>
                    <Input
                        placeholder={`Ingrese el periodista...`} 
                        value = {journalist}
                        onChange={(e)=>{setJournalist(e.target.value)} }
                    />
                </div>
            </div>
            <div className="row mt-3 ">
                <div className="col-md-6">
                    <Button 
                    type={`submit`}
                    className="w-100 fw-bold"                    
                    >AGREGAR</Button>
                </div>
                <div className="col-md-6 ">
                    <Button                     
                    onClick={handleClose}
                    variant="danger"
                       className="w-100 fw-bold"
                    >CANCELAR</Button>
                </div>
            </div>
        </form>
    </div>
    );
}
export default FormsCategory;