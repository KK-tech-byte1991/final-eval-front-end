
import ReactDOM from 'react-dom/client'
import React from 'react';
import { router } from "./router.tsx"
import './index.module.css'
import {

  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
;
// import 'normalize.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      richColors
      position="top-right"
      icons={{
        success: <></>
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
