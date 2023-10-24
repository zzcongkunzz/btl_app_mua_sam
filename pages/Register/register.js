import {Text, TextInput, TouchableOpacity, View, ToastAndroid} from "react-native";
import styles from "./styleRegister"
import generalStyle from "../../assets/GeneralStyle/generalStyle"
import {useRef, useState} from "react";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigate, useNavigation} from 'react-router-native';
import {storeSlice} from "../../stores/StoreReducer";
import {useRegisterMutation} from "../../stores/API/service";
import {useDispatch, useSelector} from "react-redux";
import {AntDesign} from "@expo/vector-icons";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorTextFullName, setErrorTextFullName] = useState('');
    const [errorTextEmail, setErrorTextEmail] = useState('');
    const [errorTextPhoneNumber, setErrorTextPhoneNumber] = useState('');
    const [errorTextPassword, setErrorTextPassword] = useState('');
    const [errorTextConfirmPassword, setErrorTextConfirmPassword] = useState('');

    const emailInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmPasswordInputRef = useRef(null);

    // API
    const [register, registerResult] = useRegisterMutation();

    const disabledBtnRegister = errorTextFullName.length > 0 ||
        errorTextEmail.length > 0 ||
        errorTextPhoneNumber.length > 0 ||
        errorTextPassword.length > 0 ||
        errorTextConfirmPassword.length > 0 ||
        fullName === '' ||
        email === '' ||
        phoneNumber === '' ||
        password === '' ||
        confirmPassword === '' ||
        password !== confirmPassword;

    const handleChangeFullName = (value) => {
        setErrorTextFullName('')
        setFullName(value);
    }

    const handleChangeEmail = (value) => {
        setErrorTextEmail('')
        value = value.replace(' ', '');
        setEmail(value);
    }

    const handleChangePhoneNumber = (value) => {
        setErrorTextPhoneNumber('')
        // \s là ' '
        value = value.replace(/\s|[^0-9]/, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    }


    const handleChangePassword = (value) => {
        setErrorTextPassword('')
        setPassword(value);
    }

    const handleChangeConfirmPassword = (value) => {
        setErrorTextConfirmPassword('')
        setConfirmPassword(value);
    }

    const handleOnBlurFullName = () => {
        if (fullName === '') {
            setErrorTextFullName('Vui lòng điền vào mục này.')
        }

    }

    const handleOnBlurEmail = () => {
        const regex = new RegExp('^[0-9a-zA-Z]+@[0-9a-zA-Z]{2,}(\\.[0-9a-zA-Z]+){1,3}$');

        if (email === '') {
            setErrorTextEmail('Vui lòng điền vào mục này.')
        } else if (!regex.test(email)) {
            setErrorTextEmail('Email nhập sai định dạng.')
        }
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
        } else if (password === confirmPassword) {
            setErrorTextConfirmPassword('')
        } else if (password !== confirmPassword) {
            setErrorTextConfirmPassword('Không khớp với mật khẩu nhập ở trên..')
        }
    }

    const handleOnBlurConfirmPassword = () => {
        if (confirmPassword === '') {
            setErrorTextConfirmPassword('Vui lòng điền vào mục này.')
        } else if (password !== confirmPassword) {
            setErrorTextConfirmPassword('Không khớp với mật khẩu nhập ở trên..')
        }
    }

    const handleSubmitEditingUsername = () => {
        emailInputRef.current.focus();
    }

    const handleSubmitEditingEmail = () => {
        phoneNumberInputRef.current.focus();
    }

    const handleSubmitEditingPhoneNumber = () => {
        passwordInputRef.current.focus();
    }

    const handleSubmitEditingPassword = () => {
        confirmPasswordInputRef.current.focus();
    }

    const handleRegister = async () => {
        // console.group('login value');
        //
        // console.log('username', fullName);
        // console.log('email', email);
        // console.log('phoneNumber', phoneNumber);
        // console.log('password', password);
        //
        // console.groupEnd();

        await register({
            fullName,
            phoneNumber,
            password,
            email
        }).unwrap()
            .then((originalPromiseResult) => {
                console.log(originalPromiseResult);
                if (originalPromiseResult.users != null) {
                    const user = originalPromiseResult.users
                    // dispatch(storeSlice.actions.setUser(originalPromiseResult.users));
                    // dispatch(storeSlice.actions.setAccessToken("access token"));
                    ToastAndroid.show('Đăng kí thành công!', ToastAndroid.SHORT, ToastAndroid.CENTER,);

                    let path = pageHistory[pageHistory.length - 2]
                    if(path === "/login"){
                        path = `${path}?phoneNumber=${phoneNumber}&password=${password}`;
                        navigate(path);
                        dispatch(storeSlice.actions.backPage());
                    }
                    else {
                        navigate(`/login?phoneNumber=${phoneNumber}&password=${password}`);
                        // dispatch(storeSlice.actions.nextPage(`/login?phoneNumber=${phoneNumber}&password=${password}`));
                    }

                }

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })
    }

    const handleLogin = () => {
        dispatch(storeSlice.actions.nextPage('/login'));
        navigate('/login')
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
                Đăng kí
            </Text>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    style={[
                        generalStyle.textInput,
                        (errorTextFullName.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Họ và tên"
                    value={fullName}
                    returnKeyType="next"
                    onChangeText={handleChangeFullName}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingUsername}
                    onBlur={handleOnBlurFullName}
                ></TextInput>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextFullName}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    ref={emailInputRef}
                    style={[
                        generalStyle.textInput,
                        (errorTextEmail.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Email"
                    value={email}
                    returnKeyType="next"
                    onChangeText={handleChangeEmail}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingEmail}
                    onBlur={handleOnBlurEmail}
                ></TextInput>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextEmail}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    ref={phoneNumberInputRef}
                    style={[
                        generalStyle.textInput,
                        (errorTextPhoneNumber.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    returnKeyType="next"
                    onChangeText={handleChangePhoneNumber}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingPhoneNumber}
                    onBlur={handleOnBlurPhoneNumber}
                ></TextInput>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextPhoneNumber}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    ref={passwordInputRef}
                    style={[
                        generalStyle.textInput,
                        (errorTextPassword.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Mật khẩu"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={handleChangePassword}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingPassword}
                    onBlur={handleOnBlurPassword}

                ></TextInput>

                <Text
                    style={[generalStyle.errorText,]}
                >{errorTextPassword}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                <TextInput
                    ref={confirmPasswordInputRef}
                    style={[
                        generalStyle.textInput,
                        (errorTextConfirmPassword.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={handleChangeConfirmPassword}
                    onFocus={() => {
                    }}
                    onBlur={handleOnBlurConfirmPassword}

                ></TextInput>

                <Text
                    style={[generalStyle.errorText,]}
                >{errorTextConfirmPassword}</Text>
            </View>
            <View
                style={[generalStyle.formItem]}
            >
                {/*btn đăng kí*/}
                <TouchableOpacity
                    onPress={handleRegister}
                    disabled={disabledBtnRegister}
                >
                    <Text
                        style={[generalStyle.button, disabledBtnRegister && generalStyle.disabledButton]}
                    >
                        Đăng Kí
                    </Text>
                </TouchableOpacity>

                <View
                    style={[
                        styles.linkLoginPage
                    ]}
                >
                    <TouchableOpacity
                        onPress={handleLogin}
                    >
                        <Text
                            style={[generalStyle.linkText]}
                        >
                            Đăng nhập
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </KeyboardAwareScrollView>
    );
}
