import {PageCart, PageHome, PageLogin, PageProductDetails, PageRegister} from "./pages";
import {Provider} from "react-redux";
import {store} from "./stores/index"
import {DefaultLayout} from "./layouts";
import {NativeRouter, Route, Routes} from "react-router-native";

export default function App() {
    return (
        // <Provider store={store}>
        //     <DefaultLayout>
        //         <PageLogin></PageLogin>
        //     </DefaultLayout>
        // </Provider>
        <Provider store={store}>
            <NativeRouter>
                <Routes>
                    <Route exact path="/"
                           element={
                               // <DefaultLayout>
                               //     {/*<PageHome></PageHome>*/}
                               //     <PageProductDetails></PageProductDetails>
                               // </DefaultLayout>
                               <PageCart> </PageCart>
                           }
                    />
                    <Route exact path="/register"
                           element={<PageRegister></PageRegister>}
                    />
                    <Route exact path="/login"
                           element={<PageLogin></PageLogin>}
                    />
                </Routes>
            </NativeRouter>
        </Provider>

    );
}

