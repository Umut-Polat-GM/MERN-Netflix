import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authUser";

import HomePage from "./pages/home/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

import { useEffect } from "react";

function App() {
    const { user, isCheckingAuth, authCheck } = useAuthStore();
    console.log("User: ", user);

    useEffect(() => {
        authCheck();
    }, [authCheck]);

    if (isCheckingAuth) {
        return (
            <div className="h-screen">
                <div className="flex justify-center items-center bg-black h-full">
                    <Loader className="animate-spin text-red-600 size-10" />
                </div>
            </div>
        );
    }
    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
				<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
