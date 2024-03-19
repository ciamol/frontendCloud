const CardVideo = ({titulo,id,handleContentFile}) => {
    return (
        <div className="shadow-lg cursor-pointer video" data-name={titulo} id={id} style={{width:'30%',height:'70%'}} onClick={handleContentFile}>
            <div className="h-50 bg-dark">

            </div>
            <div className="h-50 p-2">
                <p className="fw-bold text-center ">{titulo}</p>
            </div>
        </div>
    );
}
export default CardVideo;