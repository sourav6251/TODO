import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";
import { ClerkProvider } from "@clerk/clerk-react";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            // afterSignUp={() => {
            //     console.log("hi");
            // }}
        >
            <App />
        </ClerkProvider>
    </ThemeProvider>
);
