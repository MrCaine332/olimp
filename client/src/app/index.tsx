import React from "react"
import ReactDOM from "react-dom/client"

import "@/shared/global.css"

import App from "@/app/App"
import { Toaster } from "@/shared/ui/sonner"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
    <Toaster richColors />
  </React.StrictMode>
)
