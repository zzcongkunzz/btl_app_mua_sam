import {Text, TouchableOpacity, View} from "react-native";
import styles from "./styleFooter";
import {AntDesign, Foundation, Ionicons, MaterialCommunityIcons, SimpleLineIcons} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../stores/StoreReducer";
import {useNavigate, useSearchParams} from "react-router-native";
import SORT_TYPE from "../../constant/sortType";
import {useFindProductByCriteriaMutation} from "../../stores/API/service";

function Footer() {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const pageIndex = useSelector((state) => state.storeReducer.pageIndex);
    const listProduct = useSelector((state) => state.storeReducer.listProduct);
    const [searchParams, setSearchParams] = useSearchParams();
    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();

    // const getData = async () => {
    //     await findProductByCriteria({
    //         nameProductOrCategory: null,
    //         category: [],
    //         sortBy: SORT_TYPE.NEW,
    //     }).unwrap()
    //         .then((originalPromiseResult) => {
    //             dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
    //             dispatch(storeSlice.actions.setCriteria({
    //                 nameProductOrCategory: null,
    //                 category: [],
    //                 sortBy: SORT_TYPE.NEW,
    //             }));
    //
    //         })
    //         .catch((ex) => {
    //             console.log("Exception: ,", ex)
    //         })
    // }

    const handleOnPressHome = () => {
        dispatch(storeSlice.actions.setPageIndex("Home"));
        dispatch(storeSlice.actions.nextPage('/'));
        // getData();
        navigate(`/`);
    }

    const handleOnPressUser = () => {
        dispatch(storeSlice.actions.setPageIndex("User"));
        dispatch(storeSlice.actions.nextPage('/user'));
        navigate(`/user`);
    }

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                style={[styles.footerItem]}
                onPress={handleOnPressHome}
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
                onPress={handleOnPressUser}
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
