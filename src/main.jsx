import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      {/* Toast Notifications */}
      <Toaster
        // position="top-right"
        toastOptions={{
          className: "",
          style: {
            fontSize: "16px",
            fontWeight: "bold",
          },
        }}
      />
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
