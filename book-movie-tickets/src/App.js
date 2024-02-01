
import './App.css';
import router from './router/router';
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    // <Router>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/sign-in" element={<SignIn />} />
    //       <Route path="/sign-up" element={<SignUp />} />
    //       <Route path="/" exact element={<HomePage />} />
    //       <Route path="/movie-detail" element={<MovieDetail />} />
    //       <Route path="/seat-selection" element={<SeatSelection />} />
    //       <Route path="/pay-ment" element={<Payment />} />
    //     </Routes>
    //   </div>
    // </Router>
    <>
      <RouterProvider router={router} />
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
