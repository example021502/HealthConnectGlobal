import { AuthContext } from "./Components/Context/Contexts";
import { useContext } from "react";

function MainComponent() {
  const contexValue = useContext(AuthContext);
  console.log(contexValue);
  const { view, setView } = useContext(AuthContext);
  return <div></div>;
}

export default MainComponent;
