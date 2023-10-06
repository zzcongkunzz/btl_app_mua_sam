import {PageCart, PageHome, PageLogin, PageProductDetails, PageRegister, PageUser} from "../pages";
import {DefaultLayout, LayoutWithoutFooter, LayoutWithoutHeader} from "../layouts";

const publicRouter = [
    {
        path: '/',
        element: (() => (
            <DefaultLayout>
                <PageHome />
            </DefaultLayout>
        ))()
    },
    {
        path: '/productDetails/:id',
        element: (() => (
            <LayoutWithoutFooter>
                <PageProductDetails />
            </LayoutWithoutFooter>
        ))()
    },
    {
        path: '/login',
        element: (() => (
           <PageLogin></PageLogin>
        ))()
    },
    {
        path: '/register',
        element: (() => (
            <PageRegister></PageRegister>
        ))()
    },
    {
        path: '/cart',
        element: (() => (
            <PageCart></PageCart>
        ))()
    },
    {
        path: '/user',
        element: (() => (
            <LayoutWithoutHeader>
                <PageUser></PageUser>
            </LayoutWithoutHeader>
        ))()
    },
]


export {publicRouter}
