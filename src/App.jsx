import "remixicon/fonts/remixicon.css";
import MainComponent from "./Components/MainComponent/MainComponent";
import UserProvider from "./Components/Context/Context";
import { ThemeProvider, createTheme } from "@mui/material/styles";
function App() {
  const defaultTheme = createTheme();
  return (
    <UserProvider>
      <ThemeProvider theme={defaultTheme}>
        <MainComponent />
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
