import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import store from './Components/ToolKits/store';
import { Provider } from "react-redux";
import { MusicProvider } from './Components/Context/SelectedSongContext';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Maingenre from './Components/Main/MainGenre/Maingenre';
import Sidegenres from './Components/Sidebar/Sidegenres/Sidegenres';
import Genrehappy from './Components/Sidebar/GenreHappy/Genrehappy';
import Genredohori from './Components/Sidebar/GenreDohori/Genredohori';
import Genrebhajan from './Components/Sidebar/GenreBhajan/Genrebhajan';
import Mainartists from './Components/Main/MainArtists/Mainartists';
import Artistprabesh from './Components/Sidebar/Artist1/Artistprabesh';
import Artistbipul from './Components/Sidebar/Artist2/Artistbipul';
import Artistsujan from './Components/Sidebar/Artist3/Artistsujan';
import Artistelements from './Components/Sidebar/Artist4/Artistelements';
import Artisttribalrain from './Components/Sidebar/Artist5/Artisttribalrain';
import Local from './Components/Main/MainLocal/Local';
import Favourites from './Components/Main/MainFavourites/Favourites';
import Playlist from './Components/Sidebar/Playlist/Playlist';
import Main from './Components/Main/Main';
import LogIn from './Components/Login/Login';
import { FormProvider } from './Components/Context/Context';
import SignUp from './Components/SignUp/SignUp';
import User from './Components/Sidebar/UserAccount/User';
import Admin from './Components/Admin/Admin';


function App() {
  return (
      <MusicProvider>
    <Router>
        <FormProvider>
        <Provider store={store}>
          <div style={{ display: "flex" }}>
            <Routes>
              <Route path='/explore' element={<div style={{display: "flex", flexDirection: "", width: "100%"}}>
              <Sidebar />
            <Main/>
            </div>} /> 
              <Route path='/genres' element={<Maingenre />} />
              <Route path='/mood_booster' element={<Sidegenres/>} />
              <Route path='/mood_happy' element={<Genrehappy />} />
              <Route path='/mood_dohori' element={<Genredohori />} />
              <Route path='/mood_bhajan' element={<Genrebhajan />} />
              <Route path='/artists' element={<Mainartists/>}/>
              <Route path='/prabesh_k_shrestha' element={<Artistprabesh/>}/>
              <Route path='/bipul_chhetri' element={<Artistbipul/>}/>
              <Route path='/sujan_chapagain' element={<Artistsujan/>}/>
              <Route path='/the_elements' element={<Artistelements/>}/>
              <Route path='/tribal_rain' element={<Artisttribalrain/>}/>
              <Route path='/local' element={<Local/>}/>
              <Route path='/favourites' element={<Favourites/>}/>
              <Route path="/" element={<LogIn/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path='/playlist' element={<Playlist/>}/>
              <Route path='/userinfo' element={<User/>}/>
              <Route path='/admin' element={<Admin/>}/>
            </Routes>
          </div>
        </Provider>
        </FormProvider>
    </Router>
      </MusicProvider>
  );
}

export default App
