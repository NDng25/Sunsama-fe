import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";
// import {useEffect} from "react";
// import axios from "axios";
import MainBoard from "./components/MainBoard/MainBoard";
// const  BASE_URL= "http://192.168.101.106:4455";
function App() {
    // useEffect(() => {
    //     const fetchHashtags = async () => {
    //         console.log("Fetching");
    //         try{
    //             let res =await axios.get(`${BASE_URL}/hashtags/`);
    //             let data = ( res).data;
    //             console.log(data);
    //         }
    //         catch (e){
    //             console.log(e);
    //         }
    //
    //     }
    //     fetchHashtags();
    // })
    return (
        <div className="sunsame-clone">
            <AppBar/>
            <BoardBar/>
            <MainBoard/>
        </div>
    );
}

export default App;
