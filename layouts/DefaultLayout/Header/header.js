import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styleHeader";
import {useState} from "react";
import {Ionicons, Feather, AntDesign} from '@expo/vector-icons';

function Header() {
    const [nameProduct, setNameProduct] = useState('');
    const [onFocusSearchInput, setOnFocusSearchInput] = useState(false);

    const handleFocusSearchInput = () => {
        setOnFocusSearchInput(true);
    }

    const handleBlurSearchInput = () => {
        setOnFocusSearchInput(false);
    }

    return (
        <View
            style={[styles.container,]}
        >
            <View
                style={[styles.searchProductBox,]}
            >
                {/*<TouchableOpacity*/}
                {/*    style={[*/}
                {/*        styles.btnComeBack,*/}
                {/*    ]}*/}
                {/*>*/}
                {/*    <AntDesign name="arrowleft" size={30} color="white" />*/}
                {/*</TouchableOpacity>*/}
                <View
                    style={styles.searchProduct}
                >
                    <TextInput
                        style={[
                            styles.textInputSearch
                        ]}
                        value={nameProduct}
                        onChangeText={setNameProduct}
                        placeholder="Tìm kiếm sản phẩm"
                        placeholderTextColor="#f54c2c"
                        onFocus={handleFocusSearchInput}
                        onBlur={handleBlurSearchInput}
                    ></TextInput>
                    <TouchableOpacity
                        style={[
                            styles.iconSearch,
                            onFocusSearchInput && styles.iconSearchEnabled,
                        ]}
                        disabled={!onFocusSearchInput}
                    >
                        <Ionicons name="search-outline"
                                  size={24}
                                  color={onFocusSearchInput ? "white" : "black"}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[
                        styles.shoppingCart,
                    ]}
                >
                    <View>
                        <Feather name="shopping-cart" size={30} color="white"/>
                    </View>

                    <View
                        style={[
                            styles.cartNotification,
                        ]}
                    >
                        <Text
                            style={[
                                styles.cartNotificationText,
                            ]}
                        >13</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {/*{onFocusSearchInput &&*/}
            {/*    <View*/}
            {/*        style={[styles.productSearchHistory,]}*/}
            {/*    >*/}
            {/*        <ScrollView>*/}
            {/*            <TouchableOpacity*/}
            {/*                onPress={() => {console.log("press history")}}*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>aaaaaaaaaaaa</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*            <TouchableOpacity*/}
            {/*                style={[*/}
            {/*                    styles.productSearchHistoryItem,*/}
            {/*                    styles.deleteProductSearchHistory,*/}
            {/*                ]}*/}
            {/*            >*/}
            {/*                <Text>Xoá lịch sử tìm kiếm</Text>*/}
            {/*            </TouchableOpacity>*/}
            {/*        </ScrollView>*/}
            {/*    </View>*/}
            {/*}*/}

        </View>
    );
}

export default Header
