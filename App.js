import {PageCart, PageHome, PageLogin, PageProductDetails, PageRegister} from "./pages";
import {Provider} from "react-redux";
import {store} from "./stores/index"
import {DefaultLayout} from "./layouts";
import {NativeRouter, Route, Routes} from "react-router-native";
import {publicRouter} from "./routes";

export default function App() {
    return (
        <Provider store={store}>
            <NativeRouter>
                <Routes>
                    {publicRouter.map((route, index) => {
                        return <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    })}
                </Routes>
            </NativeRouter>
        </Provider>

    );
}

