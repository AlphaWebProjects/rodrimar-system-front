import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Home from "./pages/home/Home";
export default function App (){
 
    return(
        <>
            <ToastContainer 
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            />
            <>
                <BrowserRouter>
                    <Routes>
                        <Route 
                            path="/" 
                            element={
                                <>
                                    <Home />
                                </>                                
                            } 
                        />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </Routes>
                </BrowserRouter>
            </>

        </>
    )
}

// function ProtectedRouteGuard({ children }) {
//     const token = useToken();
  
//     if (!token) {
//       return <Navigate to="/auth" />;
//     }
  
//     return <>{children}</>;
// }