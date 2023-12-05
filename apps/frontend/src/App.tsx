import { useState } from "react"
import { Router } from "./Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { trpc } from "./utils/trpc"
import { httpLink } from "@trpc/react-query"

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: "http://localhost:5000/trpc",
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
