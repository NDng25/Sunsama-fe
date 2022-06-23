import AppBar from "./components/AppBar/AppBar";
import BoardBar from "./components/BoardBar/BoardBar";
import MainBoard from "./components/MainBoard/MainBoard";
function App() {
    return (
        <div className="trello-clone">
            <AppBar/>
            <BoardBar/>
            <MainBoard/>
        </div>
    );
}

export default App;
