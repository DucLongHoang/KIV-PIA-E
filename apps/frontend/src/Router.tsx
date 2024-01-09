import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/auth/Login"
import { Create } from "./pages/auth/Create"
import { AuthRoute } from "./components/AuthRoute"
import { ProjectPage } from "./pages/project/ProjectPage"
import { LINKS } from "./constants/Links"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LINKS.login} element={<Login />} />
        <Route path={LINKS.create} element={<Create />} />

        {/* <AuthRoute> */}
        <Route path={LINKS.home} element={<Home />} />
        <Route path={LINKS.project(":projectId")} element={<ProjectPage />} />
        {/* </AuthRoute> */}
      </Routes>
    </BrowserRouter>
  )
}
