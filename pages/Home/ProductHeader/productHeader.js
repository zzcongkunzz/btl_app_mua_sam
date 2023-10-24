import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styleProductHeader";
import {useEffect, useState} from "react";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import DATA_CATEGORY from "../../../constant/dataCategory";
import {useDispatch, useSelector} from "react-redux";
import SORT_TYPE from "../../../constant/sortType";
import {storeSlice} from "../../../stores/StoreReducer";
import {useFindProductByCriteriaMutation, useGetCategoryMutation} from "../../../stores/API/service";

function ProductHeader() {
    const dispatch = useDispatch();

    const [productHeaderItemFollow, setProductHeaderItemFollow] = useState('Sort By New');
    const [priceIncreasesDecreases, setPriceIncreasesDecreases] = useState(false);
    const [productHeaderCategoryFollow, setProductHeaderCategoryFollow] = useState(false);
    const [categoryExpandMore, setCategoryExpandMore] = useState(false);
    const [categorySelected, setCategorySelected] = useState([]);
    const [listCategory, setListCategory] = useState([]);

    const listProduct = useSelector((state) => state.storeReducer.listProduct);
    const criteria = useSelector((state) => state.storeReducer.criteria);

    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();
    const [getCategory, getCategoryResult] = useGetCategoryMutation();

    useEffect(() => {
        const getDataCategory = async () => {
            await getCategory({

            }).unwrap()
                .then((originalPromiseResult) => {
                    setListCategory(originalPromiseResult.listCategory);
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        getDataCategory();
    }, []);

    useEffect(() => {
        setProductHeaderItemFollow('Sort By New');
    }, [criteria.nameProductOrCategory]);

    useEffect(() => {
        if (productHeaderItemFollow !== 'Sort By Price') {
            setPriceIncreasesDecreases(false);
        }
    }, [productHeaderItemFollow])

    const handleOnPressSortByNew = async () => {

        await findProductByCriteria({
            ...criteria,
            sortBy: SORT_TYPE.NEW,
        }).unwrap()
            .then((originalPromiseResult) => {
                dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                dispatch(storeSlice.actions.setCriteria({
                    ...criteria,
                    sortBy: SORT_TYPE.NEW,
                }));

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })

        setProductHeaderItemFollow('Sort By New');
        if (categoryExpandMore) {
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByBestseller = async () => {

        await findProductByCriteria({
            ...criteria,
            sortBy: SORT_TYPE.HOT_SELLING,
        }).unwrap()
            .then((originalPromiseResult) => {
                dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                dispatch(storeSlice.actions.setCriteria({
                    ...criteria,
                    sortBy: SORT_TYPE.HOT_SELLING,
                }));

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })

        setProductHeaderItemFollow('Sort By Bestseller');
        if (categoryExpandMore) {
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByPrice = async () => {
        let sortPrice = SORT_TYPE.PRICE_ASC;

        if (productHeaderItemFollow === 'Sort By Price') {
            const temp = !priceIncreasesDecreases
            setPriceIncreasesDecreases(temp);
            sortPrice = temp === false ? SORT_TYPE.PRICE_ASC : SORT_TYPE.PRICE_DESC;
        }

        await findProductByCriteria({
            ...criteria,
            sortBy: sortPrice,
        }).unwrap()
            .then((originalPromiseResult) => {
                dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                dispatch(storeSlice.actions.setCriteria({
                    ...criteria,
                    sortBy: sortPrice,
                }));

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })

        setProductHeaderItemFollow('Sort By Price');
        if (categoryExpandMore) {
            handleOnPressCategory();
        }
    }

    const handleOnPressCategory = async () => {
        if (categoryExpandMore === false) {
            setProductHeaderCategoryFollow(true);
        } else if (categorySelected.length === 0) {
            setProductHeaderCategoryFollow(false);
        }
        const temp = !categoryExpandMore

        //khi đóng category
        if (temp === false) {
            await findProductByCriteria({
                ...criteria,
                category: (categorySelected.length > 0) ? categorySelected : null,
            }).unwrap()
                .then((originalPromiseResult) => {
                    dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                    dispatch(storeSlice.actions.setCriteria({
                        ...criteria,
                        category: categorySelected,
                    }));

                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }

        setCategoryExpandMore(temp);
    }

    const handleOnPressCategoryItem = (item) => {
        const index = categorySelected?.indexOf(item.name);
        const updatedCategories = [...categorySelected];
        if (index > -1) {
            // console.log("updatedCategories", updatedCategories);
            updatedCategories.splice(index, 1)
            setCategorySelected(updatedCategories);
            // console.log("updatedCategories", updatedCategories);
        } else {
            setCategorySelected([...categorySelected, item.name]);
        }
    }

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.listProductHeaderItem}
            >
                <TouchableOpacity
                    style={[styles.productHeaderItem,]}
                    onPress={handleOnPressSortByNew}
                >
                    <Text
                        style={[
                            productHeaderItemFollow === 'Sort By New' && styles.productHeaderItemFollowText
                        ]}
                    >Mới nhất</Text>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressSortByBestseller}
                >
                    <Text
                        style={[
                            productHeaderItemFollow === 'Sort By Bestseller' && styles.productHeaderItemFollowText
                        ]}
                    >Bán chạy</Text>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressSortByPrice}
                >
                    <Text
                        style={[
                            productHeaderItemFollow === 'Sort By Price' && styles.productHeaderItemFollowText
                        ]}
                    >Giá</Text>
                    <View
                        style={[styles.productHeaderItemIcon]}
                    >
                        {priceIncreasesDecreases ?
                            <AntDesign name="arrowdown" size={20} color="red"/> :
                            <AntDesign name="arrowup" size={20}
                                       color={productHeaderItemFollow === 'Sort By Price' ? "red" : "black"}/>
                        }
                    </View>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressCategory}
                >
                    <Text
                        style={[
                            productHeaderCategoryFollow && styles.productHeaderItemFollowText
                        ]}
                    >{} Danh mục</Text>

                    <View
                        style={[styles.productHeaderItemIcon]}
                    >
                        {categoryExpandMore ?
                            <MaterialIcons name="expand-more" size={20}
                                           color={productHeaderCategoryFollow ? "red" : "black"}/> :
                            <MaterialIcons name="expand-less" size={20}
                                           color={productHeaderCategoryFollow ? "red" : "black"}/>
                        }
                    </View>
                </TouchableOpacity>
            </View>

            {/*list category*/}
            {categoryExpandMore &&
                <TouchableWithoutFeedback
                    onPress={handleOnPressCategory}
                >
                    <View
                        style={[styles.listCategoryContainer]}
                    >
                        <TouchableWithoutFeedback>
                            <View
                                style={[styles.listCategory]}
                            >
                                <ScrollView
                                    contentContainerStyle={[styles.listCategoryScrollView]}
                                >
                                    {listCategory?.map((item) => {
                                        return (
                                            <TouchableOpacity
                                                key={`category item ${item.id}`}
                                                style={[
                                                    styles.categoryItem,
                                                    categorySelected?.includes(item.name) && styles.categoryItemFollow
                                                ]}
                                                onPress={() => handleOnPressCategoryItem(item)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.categoryItemText,
                                                        categorySelected?.includes(item.name) && styles.categoryItemTextFollow
                                                    ]}
                                                >{item.name}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            }

        </View>
    );
}

export default ProductHeader
