import {Navigate} from 'react-router-dom';

function VideoProtect(props){
    if(localStorage.getItem('doctortoken') || localStorage.getItem('usertoken')){
        return props.children;
    }else{
        return <Navigate to='/' />;
    }
}

export default VideoProtect;


