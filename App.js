
import {PageLogin} from "./pages";
import {Provider} from "react-redux";
import { store } from "./stores/index"
export default function App() {
    return (
        <Provider store={store}>
            <PageLogin></PageLogin>
        </Provider>
    );
}

