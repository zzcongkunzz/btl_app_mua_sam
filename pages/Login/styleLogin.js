import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputPasswordBox:{
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: "rgba(150,150,150,0.94)",
        borderRadius: 2,
    },
    textInputPassword:{
        borderWidth: 0,
        flex: 1,
        // outlineWidth: 0,
    },
    textInputPasswordIcon:{
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerAndForgotPassword: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        height: 50,
    },
    btnComeBack: {
        // borderWidth: 1,
        // borderColor: "white",
        // backgroundColor: "#000",
        position: "absolute",
        top: 30,
        left: 10,
        padding: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
});

export default styles;
