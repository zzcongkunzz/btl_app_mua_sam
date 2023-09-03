import {StyleSheet} from 'react-native';
import appColor from "../../constant/appColor";

const generalStyle = StyleSheet.create({
    formItem: {
        width: '80%',
        marginTop: 10,
    },
    formTitle: {
        fontSize: 30,
        marginBottom: 10,
        textAlign: "center",
    },
    textInput: {
        borderWidth: 1,
        height: 50,
        padding: 15,
        borderColor: "rgba(150,150,150,0.94)",
        borderRadius: 2,
    },
    textInputError: {
        borderColor: appColor.red,

    },
    errorText: {
        marginTop: 2,
        color: appColor.errorText,
    },
    linkText: {
        color: appColor.linkText,
    },
    button: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: appColor.red,
        height: 50,
        color: "#fff",
        fontSize: 16,
        fontWeight: "500",
        borderRadius: 3,
    },
    disabledButton: {
        opacity: 0.7,
    }

});

export default generalStyle;
