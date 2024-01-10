import { useState } from "react"
import { Router } from "./Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "./utils/trpc"
import { httpLink } from "@trpc/react-query"
import superjson from "superjson"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: superjson,
      links: [
        httpLink({
          url: "http://localhost:5000/trpc",
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: "include",
            })
          },
        }),
      ],
    })
  )

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </trpc.Provider>

      <ToastContainer />
    </>
  )
}

export default App
