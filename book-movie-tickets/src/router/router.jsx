import { createBrowserRouter } from "react-router-dom";
import Layout from "../management/Layout";
import ListCinema from "../management/cinema/ListCinema";
import SignIn from "../pages/sign-in";
import ManageHome from "../management/ManageHome";
import ListMovie from "../management/movie/ListMovie";
import PrivateRoute from "../management/PrivateRoute";
import ListSchedule from "../management/schedule/ListSchedule";
import AddCinema from "../management/cinema/AddCinema";
import AddMovie from "../management/movie/AddMovie";
import AddSchedule from "../management/schedule/AddSchedule";
import UpdateMovie from "../management/movie/UpdateMovie";
import UpdateSchedule from "../management/schedule/UpdateSchedule";
import SignUp from "../pages/sign-up";
import HomePage from "../pages/home";
import SeatSelection from "../pages/seat-selection";
import MovieDetail from "../pages/movie-detail";
import Payment from "../pages/pay-ment";

const router = createBrowserRouter([
    {
        path:"/management/",
        element:(
            <PrivateRoute>
                <Layout/>
            </PrivateRoute>
            
        ),
        children: [
            {
              index:true,
              path:"home",
              element: <ManageHome />,
            },
            {
                path: "cinema",
                element: <ListCinema />,
              },
              {
                path: "addCinema",
                element: <AddCinema />,
              },
            {
                path: "movie",
                element: <ListMovie />,
            },
            {
                path: "addMovie",
                element: <AddMovie />,
              },
              {
                path: "updateMovie/:id",
                element: <UpdateMovie />,
              },
            {
                path: "schedule",
                element: <ListSchedule />,
            },
            {
              path: "updateSchedule/:id",
              element: <UpdateSchedule />,
            },
            {
              path: "addSchedule",
              element: <AddSchedule />,
            },
        ],
    },
    {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie-detail/:id",
        element: <MovieDetail />,
      },
      {
        path: "/seat-selection",
        element: <SeatSelection />,
      },
      {
        path: "/pay-ment",
        element: <Payment />,
      },
      
      
    
]);
export default router;