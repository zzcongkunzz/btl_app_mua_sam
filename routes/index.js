import {PageCart, PageHome, PageLogin, PageProductDetails, PageRegister} from "../pages";
import {DefaultLayout, LayoutWithoutFooter} from "../layouts";

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
]


export {publicRouter}
