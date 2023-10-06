import styles from "./styleUserWithoutLogin"
import {Text, TouchableOpacity, View} from "react-native";
import {useSelector} from "react-redux";
import UserLogin from "../UserLogin/userLogin";
import {useNavigate} from "react-router-native";


export default function UserWithoutLogin() {

    const navigate = useNavigate();

    const handleOnPressLogin = () => {
        navigate('/login');
    }

    const handleOnPressRegister = () => {
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
