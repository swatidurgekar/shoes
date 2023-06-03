import logo from "./logo.svg";
import "./App.css";
import Page from "./UI/Page";
import CartContextProvider from "./Store/cartContext";

function App() {
  return (
    <CartContextProvider>
      <div className="App">
        <Page />
      </div>
    </CartContextProvider>
  );
}

export default App;
