import {StyleSheet} from 'react-native';
import appColor from "../../../constant/appColor";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        borderTopWidth: 2,
        borderColor: "rgba(164,162,162,0.05)",
    },
    footerItem: {
        alignItems: "center",
        paddingVertical: 10,
    },
    footerItemText: {
        color: "red"
    }
});

export default styles;
