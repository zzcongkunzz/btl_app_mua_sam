import {StyleSheet} from 'react-native';
import appColor from "../../../constant/appColor";

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    listProductHeaderItem: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-around",
        backgroundColor: "#fff",
    },
    productHeaderItem: {
        // backgroundColor: "#000",
        flexDirection: "row",
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    productHeaderItemIcon: {
        marginLeft: 3,
    },
    productHeaderItemFollowText: {
        color: "red",
    },
    splittingLine: {
        borderColor: "#000",
        borderRightWidth: 1,
        height: "50%",
        opacity: 0.2
    },
    listCategoryContainer: {
        alignItems: "center",
        position: "absolute",
        top: 43,
        backgroundColor: "rgba(178,172,172,0.2)",
        width: "100%",
        height: "100%",
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    listCategory: {
        width: "100%",
        maxHeight: "50%",
        backgroundColor: "#fff",
        padding: 10,
    },
    listCategoryScrollView: {
        flexDirection: "row",
        flexWrap: "wrap",
        // justifyContent: "space-around",
    },
    categoryItem: {
        width: "48%",
        alignItems: "center",
        padding: 10,
        marginHorizontal: 3,
        marginVertical: 8,
        borderRadius: 3,
        backgroundColor: "rgba(108,104,104,0.1)",
        borderColor: "rgba(218,215,215,0.1)",
        borderWidth: 1,
    },
    categoryItemFollow: {
        backgroundColor: "red"
    },
    categoryItemText: {
        fontWeight: 500,
    },
    categoryItemTextFollow:{
        color: "white",
    }
});

export default styles;
