import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Layout from "./components/Layout";
import MovieList from "./components/MovieList/MovieList";
import LoginForm from "./components/UserAuth/LoginForm";
import RegistrationForm from "./components/UserAuth/RegistrationForm";
import { UserProvider } from "./UserContext";

function App() {
    return (
        <div className="App">
            {/* //     <Header />
        //     <MovieList /> */}

            <UserProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route element={<PrivateRoute />}>
                            <Route path="/movies" element={<MovieList />} />
                        </Route>
                        <Route path="/login" element={<LoginForm />} />
                        <Route
                            path="/register"
                            element={<RegistrationForm />}
                        />
                    </Route>
                </Routes>
            </UserProvider>
        </div>
    );
}

export default App;
