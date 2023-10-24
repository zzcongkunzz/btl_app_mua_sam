import styles from "./styleUserWithoutLogin"
import {Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import UserLogin from "../UserLogin/userLogin";
import {useNavigate} from "react-router-native";
import {storeSlice} from "../../../stores/StoreReducer";


export default function UserWithoutLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnPressLogin = () => {
        dispatch(storeSlice.actions.nextPage(`/login`));
        navigate('/login');
    }

    const handleOnPressRegister = () => {
        dispatch(storeSlice.actions.nextPage(`/register`));
        navigate('/register');

    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.userWithoutLoginText]} >Bạn chưa đăng nhập !</Text>
            <View style={[styles.loginAndRegisterBox]}>
                <TouchableOpacity
                    style={[styles.loginAndRegisterBtn]}
                    onPress={handleOnPressLogin}
                >
                    <Text style={[styles.loginAndRegisterBtnText]} >Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.loginAndRegisterBtn]}
                    onPress={handleOnPressRegister}
                >
                    <Text  style={[styles.loginAndRegisterBtnText]} >Đăng kí</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
