
import {useSelector} from "react-redux";
import UserLogin from "./UserLogin/userLogin";
import UserWithoutLogin from "./UserWithoutLogin/userWithoutLogin";


export default function User() {
    const ACCESS_TOKEN = useSelector((state) => state.storeReducer.ACCESS_TOKEN);
    if (!!ACCESS_TOKEN) {
        return <UserLogin></UserLogin>;
    } else {
        return <UserWithoutLogin></UserWithoutLogin>
    }
};
