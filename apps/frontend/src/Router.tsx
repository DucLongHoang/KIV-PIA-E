import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/auth/Login"
import { Register } from "./pages/auth/Register"
import { AuthRoute } from "./components/AuthRoute"
import { Project } from "./pages/project/Project"
import { LINKS } from "./constants/Links"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LINKS.login} element={<Login />} />
        <Route path={LINKS.register} element={<Register />} />

        {/* <AuthRoute> */}
        <Route path={LINKS.home} element={<Home />} />
        <Route path={LINKS.project(":projectId")} element={<Project />} />
        {/* </AuthRoute> */}
      </Routes>
    </BrowserRouter>
  )
}
