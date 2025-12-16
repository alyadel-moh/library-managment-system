import "./App.css";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <LoginPage />
    </div>
  );
}

export default App;
