import {StyleSheet} from 'react-native';
import appColor from "../../constant/appColor";

const styles = StyleSheet.create({
    container: {

    },
    searchProductBox: {
        backgroundColor: appColor.red,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    btnComeBack: {
        // borderWidth: 1,
        // borderColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchProduct: {
        flexDirection: "row",
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 3,
        height: 40,
        padding: 2,
    },
    textInputSearch: {
        // backgroundColor: "#000",
        flex: 1,
        paddingHorizontal: 5,
        color: "#f54c2c",
    },
    iconSearch: {
        alignItems: "center",
        justifyContent: "center",
        width: 40,
    },
    iconSearchEnabled:{
        borderBottomRightRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: appColor.red,
    },
    shoppingCart: {
        paddingHorizontal: 10
    },
    cartNotification:{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: -7,
        right: -1,
        width: 22,
        height: 22,
        backgroundColor: appColor.red,
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 22,
    },
    cartNotificationText:{
        color: "#fff",
        fontSize: 11,
        fontWeight: 500,
    },
    productSearchHistory:{
        backgroundColor: "#fff",
        flexDirection: "column",
        maxHeight: 210,
        borderBottomWidth: 5,
        borderColor: "rgba(173,168,168,0.1)",
    },
    productSearchHistoryItem: {
        paddingVertical: 10,
        paddingHorizontal: 17,
        borderBottomWidth: 1,
        borderColor: "rgba(173,168,168,0.2)",
    },
    deleteProductSearchHistory:{
        alignItems: "center",
        opacity: 0.5
    }
});

export default styles;
