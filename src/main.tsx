import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ReactRouterProvider, TanstackQueryProvider } from "./providers"

import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TanstackQueryProvider>
			<ReactRouterProvider />
		</TanstackQueryProvider>
	</StrictMode>
)
