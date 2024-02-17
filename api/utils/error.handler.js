function ErrorHandler(statuscode,message){
    let error=new Error()
    error.message=message
    error.statuscode=statuscode
    return error;
}

// m.exports=ErrorHandler;
export default ErrorHandler