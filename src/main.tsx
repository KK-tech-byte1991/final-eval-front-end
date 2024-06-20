
import ReactDOM from 'react-dom/client'

import { router } from "./router.tsx"
import './index.css'
import {

  RouterProvider,
} from "react-router-dom";
import { Toaster } from 'sonner';
import React from 'react';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster richColors/>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
