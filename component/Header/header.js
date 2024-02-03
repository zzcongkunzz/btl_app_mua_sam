import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styleHeader";
import {useEffect, useRef, useState} from "react";
import {Ionicons, Feather, AntDesign} from '@expo/vector-icons';
import {useNavigate, useLocation, useSearchParams} from "react-router-native";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../stores/StoreReducer";
import {useFindProductByCriteriaMutation, useGetCartByUserMutation} from "../../stores/API/service";
import SORT_TYPE from "../../constant/sortType";

function Header() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);
    const user = useSelector((state) => state.storeReducer.user);
    const listCart = useSelector((state) => state.storeReducer.listCart);
    const cartNotication = useSelector((state) => state.storeReducer.cartNotication);
    const criteria = useSelector((state) => state.storeReducer.criteria);

    const [nameProductOrCategory, setNameProductOrCategory] = useState(searchParams.get('nameProductOrCategory') ?? '');
    const [onFocusSearchInput, setOnFocusSearchInput] = useState(false);
    const searchInputRef = useRef(null);

    const enablePageBackButton = !(['/',].indexOf(location.pathname) > -1);

    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();
    const [getCartByUser, getCartByUserResult] = useGetCartByUserMutation();

    useEffect(() => {
        const getData = async () => {
            await getCartByUser({
                user,
            }).unwrap()
                .then((originalPromiseResult) => {
                    const coutcartNotication = originalPromiseResult.listCart.reduce((total, cart) => {
                        return total + cart.quantity;
                    }, 0)
                    dispatch(storeSlice.actions.setCartNotication(coutcartNotication));
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        if(user != null){
            getData();
        }
        else {
            dispatch(storeSlice.actions.setCartNotication(0));
        }
    }, []);

    useEffect(() => {
        setNameProductOrCategory(criteria.nameProductOrCategory);
    }, [criteria.nameProductOrCategory]);

    const handleFocusSearchInput = () => {
        setOnFocusSearchInput(true);
    }

    const handleOnBlurSearchInput = () => {
        setOnFocusSearchInput(false);
    }

    const handleOnPressCart = () => {
        if(user != null){
            dispatch(storeSlice.actions.nextPage(`/cart`));
            navigate('/cart');
        }
        else {
            dispatch(storeSlice.actions.nextPage(`/login`));
            navigate(`/login`)
        }


    }

    const handleOnPressBackButton = () => {
        if (pageHistory.length >= 2) {
            const path = pageHistory[pageHistory.length - 2]
            navigate(path);
            dispatch(storeSlice.actions.backPage());
        }
    }

    const handleOnPressSearchIcon = async () => {

        dispatch(storeSlice.actions.setCriteria({
            nameProductOrCategory: nameProductOrCategory != "" ? nameProductOrCategory : null,
            category: [],
            sortBy: SORT_TYPE.NEW,
        }));

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
                        >{cartNotication}</Text>
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
