import styles from "./styleUserLogin"
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {useRef, useState} from "react";
import generalStyle from "../../../assets/GeneralStyle/generalStyle";
import {useDispatch} from "react-redux";
import {storeSlice} from "../../../stores/StoreReducer";


export default function UserLogin() {
    const dispatch = useDispatch();

    const [name, setName] = useState('Đặng Thành Công');
    const [gender, setGender] = useState('Nam');
    const [dateOfBirth, setDateOfBirth] = useState('20/05/2002');
    const [email, setEmail] = useState('dangcong200502@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('0914133971');

    const [errorTextName, setErrorTextName] = useState('');
    const [errorTextGender, setErrorTextGender] = useState('');
    const [errorTextDateOfBirth, setErrorTextDateOfBirth] = useState('');
    const [errorTextEmail, setErrorTextEmail] = useState('');
    const [errorTextPhoneNumber, setErrorTextPhoneNumber] = useState('');
    const [changeInformation, setChangeInformation] = useState(false);

    const nameInputRef = useRef(null);
    const genderInputRef = useRef(null);
    const dateOfBirthInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const phoneNumberInputRef = useRef(null);

    const disabledBtnSaveInformation = errorTextName.length > 0 ||
        errorTextEmail.length > 0 ||
        errorTextPhoneNumber.length > 0 ||
        errorTextGender.length > 0 ||
        errorTextDateOfBirth.length > 0 ||
        email === '' ||
        phoneNumber === '' ||
        changeInformation === false;

    const handleChangeName = (value) => {
        setChangeInformation(true);
        setErrorTextName('')
        setName(value);
    }
    const handleChangeGender = (value) => {
        setChangeInformation(true);
        setErrorTextGender('')
        setGender(value);
    }
    const handleChangeDateOfBirth = (value) => {
        setChangeInformation(true);
        setErrorTextDateOfBirth('')
        setDateOfBirth(value);
    }
    const handleChangeEmail= (value) => {
        setChangeInformation(true);
        setErrorTextEmail('')
        value = value.replace(' ', '');
        setEmail(value);
    }
    const handleChangePhoneNumber = (value) => {
        setChangeInformation(true);
        setErrorTextPhoneNumber('')
        value = value.replace(/\s|[^0-9]/, '');
        if (value.length <= 10) {
            setPhoneNumber(value);
        }
    }

    const handleOnBlurGender = () => {
       if(gender !== '' && gender !== 'Nam' && gender !== 'Nữ'){
           setErrorTextGender('Giới tính phải là Nam hoặc Nữ.')
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

    const handleLogOut = () => {
        dispatch(storeSlice.actions.setAccessToken(null));
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.accountInformationText]}>Thông tin tài khoản</Text>
            <View style={[styles.line]}>
                <View style={[styles.accountInformation]}>
                    <Text onPress={() => {
                        nameInputRef.current.focus()
                    }}>Tên</Text>
                    <TextInput
                        ref={nameInputRef}
                        style={[styles.lineTextInput]}
                        value={name}
                        textAlign={"right"}
                        onChangeText={handleChangeName}
                        // onSubmitEditing={handleSubmitEditingUsername}
                        // onBlur={handleOnBlurUsername}
                    ></TextInput>
                </View>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextName}</Text>
            </View>
            <View style={[styles.line]}>
                <View style={[styles.accountInformation]}>
                    <Text onPress={() => {
                        genderInputRef.current.focus()
                    }}>Giới tính</Text>
                    <TextInput
                        ref={genderInputRef}
                        style={[styles.lineTextInput]}
                        value={gender}
                        textAlign={"right"}
                        onChangeText={handleChangeGender}
                        // onSubmitEditing={handleSubmitEditingUsername}
                        onBlur={handleOnBlurGender}
                    ></TextInput>
                </View>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextGender}</Text>
            </View>
            <View style={[styles.line]}>
                <View style={[styles.accountInformation]}>
                    <Text onPress={() => {
                        dateOfBirthInputRef.current.focus()
                    }}>Ngày sinh</Text>
                    <TextInput
                        ref={dateOfBirthInputRef}
                        style={[styles.lineTextInput]}
                        value={dateOfBirth}
                        textAlign={"right"}
                        onChangeText={handleChangeDateOfBirth}
                        // onSubmitEditing={handleSubmitEditingUsername}
                        // onBlur={handleOnBlurUsername}
                    ></TextInput>
                </View>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextDateOfBirth}</Text>
            </View>
            <View style={[styles.line]}>
                <View style={[styles.accountInformation]}>
                    <Text onPress={() => {
                        phoneNumberInputRef.current.focus()
                    }}>Số điện thoại</Text>
                    <TextInput
                        ref={phoneNumberInputRef}
                        style={[styles.lineTextInput]}
                        value={phoneNumber}
                        textAlign={"right"}
                        onChangeText={handleChangePhoneNumber}
                        // onSubmitEditing={handleSubmitEditingUsername}
                        onBlur={handleOnBlurPhoneNumber}
                    ></TextInput>
                </View>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextPhoneNumber}</Text>
            </View>
            <View style={[styles.line]}>
                <View style={[styles.accountInformation]}>
                    <Text onPress={() => {
                        emailInputRef.current.focus()
                    }}>Email</Text>
                    <TextInput
                        ref={emailInputRef}
                        style={[styles.lineTextInput]}
                        value={email}
                        textAlign={"right"}
                        onChangeText={handleChangeEmail}
                        // onSubmitEditing={handleSubmitEditingUsername}
                        onBlur={handleOnBlurEmail}
                    ></TextInput>
                </View>
                <Text
                    style={[generalStyle.errorText]}
                >{errorTextEmail}</Text>
            </View>

            <TouchableOpacity
                // onPress={handleRegister}
                disabled={disabledBtnSaveInformation}
                style={[disabledBtnSaveInformation && styles.disabledBtnSaveInformation]}
            >
                <Text style={[generalStyle.button, styles.btn]}>Lưu thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleLogOut}
            >
                <Text style={[generalStyle.button, styles.btn]}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};
