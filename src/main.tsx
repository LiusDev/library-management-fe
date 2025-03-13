import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import {
	ReactRouterProvider,
	TanstackQueryProvider,
	DialogProvider,
} from "./providers"

import "./index.css"

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<TanstackQueryProvider>
			<DialogProvider>
				<ReactRouterProvider />
			</DialogProvider>
		</TanstackQueryProvider>
	</StrictMode>
)
