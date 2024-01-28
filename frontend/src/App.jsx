import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignUp } from "./SignUp";
import { Dashboard } from "./Dashboard";
import { SignIn } from "./Signin";
import { SendMoney } from "./SendMoney";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/send" element={<SendMoney />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
