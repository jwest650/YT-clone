import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
let persistor = persistStore(store);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <BrowserRouter>
                    <PersistGate persistor={persistor}>
                        <App />
                    </PersistGate>
                </BrowserRouter>
            </Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
