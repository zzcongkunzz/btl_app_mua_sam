import {StyleSheet} from 'react-native';
import appColor from "../../../constant/appColor";


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    userWithoutLoginText: {
        fontSize: 24,
        color: appColor.red,
    },
    loginAndRegisterBox: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 50,
    },
    loginAndRegisterBtn: {
        width: "45%",
        height: 50,
        backgroundColor: "#ee4d2d",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 3,
    },
    loginAndRegisterBtnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: 500,
    }
});

export default styles;
