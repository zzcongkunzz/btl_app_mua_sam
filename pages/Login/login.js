import {Text, TextInput, TouchableOpacity, View, ToastAndroid} from "react-native";
import {AntDesign, Feather} from '@expo/vector-icons';
import styles from "./styleLogin"
import generalStyle from "../../assets/GeneralStyle/generalStyle"
import {useRef, useState} from "react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLocation, useNavigate, useSearchParams} from "react-router-native";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../stores/StoreReducer";
import {useLoginMutation} from "../../stores/API/service";

export default function Login() {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);

    // console.log("login/data: ", searchParams.get('phoneNumber'));

    const [phoneNumber, setPhoneNumber] = useState(searchParams.get('phoneNumber') ?? '');
    const [password, setPassword] = useState(searchParams.get('password') ?? '');
    const [showPassword, setShowPassword] = useState(false);
    const [errorTextPhoneNumber, setErrorTextPhoneNumber] = useState('');
    const [errorTextPassword, setErrorTextPassword] = useState('');
    const passwordInputRef = useRef(null);
    const disabledBtnLogin = errorTextPhoneNumber.length > 0 || errorTextPassword.length > 0 || phoneNumber === '' || password === '';


    // API
    const [login, loginResult] = useLoginMutation();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChangePhoneNumber = (value) => {
        setErrorTextPhoneNumber('')
        value = value.replace(/\s|[^0-9]/, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    }

    const handleChangePassword = (value) => {
        setErrorTextPassword('')
        setPassword(value);
    }

    const handleOnBlurPhoneNumber = () => {
        const regex = new RegExp('^0[0-9]{9}$');

        if (phoneNumber === '') {
            setErrorTextPhoneNumber('Vui lòng điền vào mục này.')
        } else if (!regex.test(phoneNumber)) {
            setErrorTextPhoneNumber('Số điện thoại nhập sai định dạng.')

        }

    }

    const handleOnBlurPassword = () => {
        if (password === '') {
            setErrorTextPassword('Vui lòng điền vào mục này.')
        }
    }

    const handleSubmitEditingUsername = () => {
        passwordInputRef.current.focus();
    }

    const handleLogin = async () => {
        //console.log(phoneNumber, " ", password);
        await login({
            phoneNumber: phoneNumber,
            password: password,
        }).unwrap()
            .then((originalPromiseResult) => {
                console.log(originalPromiseResult);
                if(originalPromiseResult.users != null){
                    dispatch(storeSlice.actions.setUser(originalPromiseResult.users));
                    dispatch(storeSlice.actions.setAccessToken("access token"));
                    ToastAndroid.show('Đăng nhập thành công!', ToastAndroid.SHORT, ToastAndroid.CENTER,);

                    handleOnPressBackButton();
                }
                else {
                    ToastAndroid.show('Sai số điện thoại hoặc mật khẩu!', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                }

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })
    }

    const handleRegister = () => {
        dispatch(storeSlice.actions.nextPage(`/register`));
        navigate('/register');
    }

    const handleOnPressBackButton = () => {
        if (pageHistory.length >= 2) {
            const path = pageHistory[pageHistory.length - 2]
            navigate(path);
            dispatch(storeSlice.actions.backPage());
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[styles.container]}
            keyboardShouldPersistTaps='handled'
        >
            <TouchableOpacity
                style={[
                    styles.btnComeBack,
                ]}
                onPress={handleOnPressBackButton}
            >
                <AntDesign name="arrowleft" size={30} color="red"/>
            </TouchableOpacity>
            <Text
                style={[generalStyle.formItem, generalStyle.formTitle]}
            >
                Đăng nhập
            </Text>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    style={[
                        generalStyle.textInput,
                        (errorTextPhoneNumber.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Số điện thoại"
                    textContentType="username"
                    autoComplete="username"
                    value={phoneNumber}
                    returnKeyType="next"
                    onChangeText={handleChangePhoneNumber}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingUsername}
                    onBlur={handleOnBlurPhoneNumber}
                ></TextInput>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextPhoneNumber}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                <View
                    style={[
                        styles.textInputPasswordBox,
                        (errorTextPassword.length > 0) && generalStyle.textInputError,
                    ]}
                >
                    <TextInput
                        ref={passwordInputRef}
                        style={[
                            generalStyle.textInput,
                            styles.textInputPassword,
                        ]}
                        placeholder="Mật khẩu"
                        secureTextEntry={!showPassword}
                        textContentType="password"
                        autoComplete="password"
                        value={password}
                        onChangeText={handleChangePassword}
                        onFocus={() => {
                        }}
                        onBlur={handleOnBlurPassword}

                    ></TextInput>
                    <TouchableOpacity
                        style={[styles.textInputPasswordIcon]}
                        onPress={handleShowPassword}
                        activeOpacity={1}
                    >
                        {showPassword &&
                            <Feather name="eye" size={24} color="black"/> ||
                            <Feather name="eye-off" size={24} color="black"/>
                        }
                    </TouchableOpacity>
                </View>
                <Text
                    style={[generalStyle.errorText,]}
                >{errorTextPassword}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                {/*btn đăng nhập*/}
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={disabledBtnLogin}
                >
                    <Text
                        style={[generalStyle.button, disabledBtnLogin && generalStyle.disabledButton]}
                    >
                        Đăng Nhập
                    </Text>
                </TouchableOpacity>

                <View
                    style={[
                        styles.registerAndForgotPassword
                    ]}
                >
                    <TouchableOpacity>
                        <Text
                            style={[generalStyle.linkText]}
                        >
                            Quên mật khẩu
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRegister}
                    >
                        <Text
                            style={[generalStyle.linkText]}
                        >
                            Đăng ký
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
}
