
import {PageLogin, PageRegister} from "./pages";
import {Provider} from "react-redux";
import { store } from "./stores/index"
export default function App() {
    return (
        <Provider store={store}>
            <PageRegister></PageRegister>
        </Provider>
    );
}

