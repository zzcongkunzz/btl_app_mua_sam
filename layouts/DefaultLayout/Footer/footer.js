import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styleFooter";
import {AntDesign, Foundation, Ionicons, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../../stores/StoreReducer";

function Footer() {
    const dispatch = useDispatch();
    const pageIndex = useSelector((state) => state.storeReducer.pageIndex);
    console.log("pageIndex", pageIndex);

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={() => {
                    dispatch(storeSlice.actions.setPageIndex("Home"))
                }}
            >
                <MaterialCommunityIcons name="home-outline" size={24} color={pageIndex === 'Home' ? "red" : "black"}/>
                <Text
                    style={[(pageIndex === 'Home') && styles.footerItemText]}
                >Trang chủ</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={() => {
                    dispatch(storeSlice.actions.setPageIndex("Notification"))
                    console.log("pageIndex", pageIndex);

                }}
            >
                <Ionicons name="notifications-outline" size={24} color={pageIndex === 'Notification' ? "red" : "black"}/>
                <Text
                    style={[(pageIndex === 'Notification') && styles.footerItemText]}
                >Thông báo</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={() => {
                    dispatch(storeSlice.actions.setPageIndex("Message"))
                }}
            >
                <AntDesign name="message1" size={24} color={pageIndex === 'Message' ? "red" : "black"}/>
                <Text
                    style={[(pageIndex === 'Message') && styles.footerItemText]}
                >Tin nhắn</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={() => {
                    dispatch(storeSlice.actions.setPageIndex("User"))

                }}
            >
                <SimpleLineIcons name="user" size={24} color={pageIndex === 'User' ? "red" : "black"}/>
                <Text
                    style={[(pageIndex === 'User') && styles.footerItemText]}
                >Tôi</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Footer
