import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    linkLoginPage:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
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
