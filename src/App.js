import Favicon from "react-favicon";
import Main from "./Main";
import Modal from "./components/Modal";
import Upload from "./components/Upload";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./components/SignInPage";

function App() {
    return (
        <main className="w-full">
            <Favicon url="https://icons.iconarchive.com/icons/iconsmind/outline/256/Youtube-icon.png" />

            <Main />
            <Modal>
                <Upload />
            </Modal>
        </main>
    );
}

export default App;
