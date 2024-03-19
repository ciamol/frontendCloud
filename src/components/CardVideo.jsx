const CardVideo = ({titulo}) => {
    return (
        <div className="shadow-lg cursor-pointer" style={{width:'30%',height:'70%'}}>
            <div className="h-50 bg-dark">

            </div>
            <div className="h-50 p-2">
                <p className="fw-bold text-center">{titulo}</p>
            </div>
        </div>
    );
}
export default CardVideo;