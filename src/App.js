import "./styles.css";
import { parseExlsPacks } from "./parseExlsPacks";
import calcsParser from "./parseExlsPacks/calcsParser";

export default function App() {
  console.log(calcsParser());

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
//-13.7419413919414
