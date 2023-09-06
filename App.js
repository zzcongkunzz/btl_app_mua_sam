
import {PageLogin, PageRegister} from "./pages";
import {Provider} from "react-redux";
import { store } from "./stores/index"
import {DefaultLayout} from "./layouts";
export default function App() {
    return (
        <Provider store={store}>
            <DefaultLayout>
                <PageLogin></PageLogin>
            </DefaultLayout>
        </Provider>
    );
}

