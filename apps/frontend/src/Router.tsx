import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/auth/Login"
import { Create } from "./pages/create/Create"
import { AuthRoute } from "./components/routes/AuthRoute"
import { AdminRoute } from "./components/routes/AdminRoute"
import { ProjectPage } from "./pages/project/ProjectPage"
import { LINKS } from "./constants/Links"
import { NotFound } from "./pages/NotFound"

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LINKS.login} element={<Login />} />
        <Route
          path=""
          element={
            <AuthRoute>
              <Outlet />
            </AuthRoute>
          }
        >
          {/* Non-admin routes */}
          <Route path={LINKS.home} element={<Home />} />
          <Route path={LINKS.project(":projectId")} element={<ProjectPage />} />
          {/* Admin routes - they need to be below non-admin routes. Don't ask me why */}
          <Route
            path=""
            element={
              <AdminRoute>
                <Outlet />
              </AdminRoute>
            }
          >
            <Route path={LINKS.create} element={<Create />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
