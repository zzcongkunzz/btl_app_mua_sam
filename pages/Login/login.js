import {Keyboard, ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import {Feather} from '@expo/vector-icons';
import styles from "./styleLogin"
import generalStyle from "../../assets/GeneralStyle/generalStyle"
import {useRef, useState} from "react";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorTextUsername, setErrorTextUsername] = useState('');
    const [errorTextPassword, setErrorTextPassword] = useState('');
    const passwordInputRef = useRef(null);
    const disabledBtnLogin = errorTextUsername.length > 0 || errorTextPassword.length > 0 || username === '' || password === '';
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChangeUsername = (value) => {
        setErrorTextUsername('')
        value = value.replace(' ', '');
        setUsername(value);
    }

    const handleChangePassword = (value) => {
        setErrorTextPassword('')
        setPassword(value);
    }

    const handleUsernameBlur = () => {
        const regex = new RegExp('^[0-9a-zA-Z!@.?]+$');

        if (username === '') {
            setErrorTextUsername('Vui lòng điền vào mục này.')
        } else if (!regex.test(username)) {
            setErrorTextUsername('Tên đăng nhập chỉ được chứa các chữ cái, số, và các kí tự đặc biệt như !@.?')
        }

    }

    const handlePasswordBlur = () => {
        if (password === '') {
            setErrorTextPassword('Vui lòng điền vào mục này.')
        }
    }

    const handleSubmitEditingUsername = () => {
        passwordInputRef.current.focus();
    }

    const handleLogin = () => {
       //console.log(username, " ", password);
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={[styles.container]}
            keyboardShouldPersistTaps='always'
        >
            <Text
                style={[styles.loginItem, styles.loginText]}
            >
                Đăng nhập
            </Text>
            <View
                style={[styles.loginItem]}
            >
                <TextInput
                    style={[
                        generalStyle.textInput,
                        (errorTextUsername.length > 0) && generalStyle.textInputError,
                    ]}
                    placeholder="Email/Số điện thoại/Tên đăng nhập"
                    textContentType="username"
                    autoComplete="username"
                    value={username}
                    returnKeyType="next"
                    onChangeText={handleChangeUsername}
                    onFocus={() => {
                    }}
                    onSubmitEditing={handleSubmitEditingUsername}
                    onBlur={handleUsernameBlur}
                ></TextInput>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextUsername}</Text>
            </View>
            <View
                style={[styles.loginItem]}
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
                        onBlur={handlePasswordBlur}

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
                style={[styles.loginItem]}
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
                    <TouchableOpacity>
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
