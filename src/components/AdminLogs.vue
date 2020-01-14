<template>
    <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
            <b-tr>
                <b-th colspan="9">基本資訊</b-th>
            </b-tr>
            <b-tr>
                <b-th colspan="1">#</b-th>
                <b-th colspan="1">IP</b-th>
                <b-th colspan="1">host</b-th>
                <b-th colspan="1">originalUrl</b-th>
                <b-th colspan="1">protocol</b-th>
                <b-th colspan="1">method</b-th>
                <b-th colspan="1">body</b-th>
                <b-th colspan="1">status</b-th>
                <b-th colspan="1">user_agent</b-th>
            </b-tr>
        </b-thead>
        <b-tbody>
            <b-tr
                v-for="log in initLogs"
                :key="log._id"
            >
                <b-td class="text-center">{{log._id}}</b-td>
                <b-td class="text-center">{{log.IP}}</b-td>
                <b-td class="text-center">{{log.host}}</b-td>
                <b-td class="text-center">{{log.originalUrl}}</b-td>
                <b-td class="text-center">{{log.protocol}}</b-td>
                <b-td class="text-center">{{log.method}}</b-td>
                <b-td class="text-center">{{log.body | avoidNull}}</b-td>
                <b-td class="text-center">{{log.status}}</b-td>
                <b-td class="text-center">{{log.user_agent | avoidNull}}</b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script>
export default {
    props: {
        initLogs: {
            type: Array
        }
    },
    filter: {
        avoidNull(str) {
            if (!str) return 'no data';
            return str;
        }
    }
}
</script>