import "remixicon/fonts/remixicon.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import UserProvider from "./Components/Context/UserProvider";

function App() {
  return (
    <UserProvider>
      <MainComponent />
    </UserProvider>
  );
}

export default App;
