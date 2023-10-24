import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styleHeader";
import {useRef, useState} from "react";
import {Ionicons, Feather, AntDesign} from '@expo/vector-icons';
import {useNavigate, useLocation, useSearchParams} from "react-router-native";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../stores/StoreReducer";
import {useFindProductByCriteriaMutation} from "../../stores/API/service";
import SORT_TYPE from "../../constant/sortType";

function Header() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [nameProductOrCategory, setNameProductOrCategory] = useState(searchParams.get('nameProductOrCategory') ?? '');
    const [onFocusSearchInput, setOnFocusSearchInput] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);
    const searchInputRef = useRef(null);

    const enablePageBackButton = !(['/',].indexOf(location.pathname) > -1);

    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();

    const handleFocusSearchInput = () => {
        setOnFocusSearchInput(true);
    }

    const handleOnBlurSearchInput = () => {
        setOnFocusSearchInput(false);
    }

    const handleOnPressCart = () => {
        dispatch(storeSlice.actions.nextPage(`/cart`));
        navigate('/cart');
    }

    const handleOnPressBackButton = () => {
        if (pageHistory.length >= 2) {
            const path = pageHistory[pageHistory.length - 2]
            navigate(path);
            dispatch(storeSlice.actions.backPage());
        }
    }

    const handleOnPressSearchIcon = async () => {

        await findProductByCriteria({
            nameProductOrCategory: nameProductOrCategory != "" ? nameProductOrCategory : null,
            category: [],
            sortBy: SORT_TYPE.NEW,
        }).unwrap()
            .then((originalPromiseResult) => {
                dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                dispatch(storeSlice.actions.setCriteria({
                    nameProductOrCategory: nameProductOrCategory,
                    category: [],
                    sortBy: SORT_TYPE.NEW,
                }));

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })

        searchInputRef.current.blur();

        if(enablePageBackButton){
            dispatch(storeSlice.actions.nextPage(`/?nameProductOrCategory=${nameProductOrCategory}`));
            navigate(`/?nameProductOrCategory=${nameProductOrCategory}`);
        }

    }

    const handleOnSubmitSearchInput = async () => {
        handleOnPressSearchIcon();
    }

    return (
        <View
            style={[styles.container,]}
        >
            <View
                style={[styles.searchProductBox,]}
            >
                {enablePageBackButton &&
                    <TouchableOpacity
                        style={[
                            styles.btnComeBack,
                        ]}
                        onPress={handleOnPressBackButton}
                    >
                        <AntDesign name="arrowleft" size={30} color="white"/>
                    </TouchableOpacity>
                }
                <View
                    style={styles.searchProduct}
                >
                    <TextInput
                        style={[
                            styles.textInputSearch
                        ]}
                        ref={searchInputRef}
                        value={nameProductOrCategory}
                        onChangeText={setNameProductOrCategory}
                        placeholder="Tìm kiếm sản phẩm"
                        placeholderTextColor="#f54c2c"
                        onFocus={handleFocusSearchInput}
                        onBlur={handleOnBlurSearchInput}
                        onSubmitEditing={handleOnSubmitSearchInput}
                    ></TextInput>
                    <TouchableOpacity
                        style={[
                            styles.iconSearch,
                            onFocusSearchInput && styles.iconSearchEnabled,
                        ]}
                        disabled={!onFocusSearchInput}
                        onPress={handleOnPressSearchIcon}
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
                    onPress={handleOnPressCart}
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
