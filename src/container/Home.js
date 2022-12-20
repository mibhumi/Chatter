import Chat from "../component/Chat";
import Sidebar from "../component/Sidebar";

function Home() {
    return(
        <div className='home'>
            <div className="container">
                <Sidebar/>
                <Chat/>
            </div>
        </div>
    )
}

export default Home;