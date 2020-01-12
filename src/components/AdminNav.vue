<template>
    <b-nav tabs justified>
        <b-nav-item
            v-for="tab in tabs"
            :key="tab.id"
            :href="tab.path"
        >
            {{tab.title}}
        </b-nav-item>
    </b-nav>
</template>

<script>
import nanoid from 'nanoid';


export default {
    data() {
        return {
            tabs: [
                {
                    id: nanoid(5),
                    title: '建立新的產品',
                    path: '/admin/products/create'
                },
                {
                    id: nanoid(5),
                    title: '產品資訊',
                    path: '/admin/products'
                },
                {
                    id: nanoid(5),
                    title: '折價卷資訊',
                    path: '/admin/coupons'
                },
                {
                    id: nanoid(5),
                    title: '銷售資訊',
                    path: '/admin/payments'
                },
                {
                    id: nanoid(5),
                    title: '呆帳管理',
                    path: '/admin/orders'
                },
                {
                    id: nanoid(5),
                    title: '前往前台',
                    path: '/'
                }
            ]
        }
    }
}
</script>