<template>
    <v-tabs vertical>
        <v-tab
            v-for="(item,index) in tabs"
            :key="index"
            v-model="tab"
            onclick="console.log(this.tab)"
        >
            {{ item }}
        </v-tab>

        <v-tab-item>
            <q-card class="my-card">
                <q-card-section horizontal>
                    <q-img
                            class="col-5"
                            src="https://cdn.quasar.dev/img/parallax1.jpg"
                    />

                    <q-card-section>
                        {{ lorem }}
                    </q-card-section>
                </q-card-section>

                <q-separator />

                <q-card-actions>
                    <q-btn flat round icon="event" />
                    <q-btn flat>
                        5:30PM
                    </q-btn>
                    <q-btn flat>
                        7:00PM
                    </q-btn>
                    <q-btn flat color="primary">
                        Reserve
                    </q-btn>
                </q-card-actions>
            </q-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <p>
                        Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
                    </p>

                    <p>
                        Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse platea dictumst. Fusce ac felis sit amet ligula pharetra condimentum.
                    </p>

                    <p>
                        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Nam commodo suscipit quam. In consectetuer turpis ut velit. Sed cursus turpis vitae tortor. Aliquam eu nunc.
                    </p>

                    <p>
                        Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio nec arcu.
                    </p>

                    <p class="mb-0">
                        Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis a, condimentum nec, nisi.
                    </p>
                </v-card-text>
            </v-card>
        </v-tab-item>
        <v-tab-item>
            <v-card flat>
                <v-card-text>
                    <p>
                        Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam eget dui. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna, posuere eget, vestibulum et, tempor auctor, justo.
                    </p>

                    <p class="mb-0">
                        Cras sagittis. Phasellus nec sem in justo pellentesque facilisis. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                    </p>
                </v-card-text>
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script>
    import config from "../config";

    export default {
        name: "AnimeTable",
        data () {
            return {
                tab: 'a',
                tabs: [],
                tabItems: []
            }
        },
        created () {
            this.axios.get(config.GetAnimeTypeApi, {
                headers: {
                    'gfsessionid': localStorage.getItem('token')
                }
            }).then( response => {
                    let res = response.data
                    if (res.code === 200) {
                        this.tabs = res.data
                    }else if (res.code === 400) {
                        this.$message.error(res.message)
                    }
                }
            )
        },
        mounted() {
            //根据tabs中type的数据一个一个的去请求getanime，并将它们以tabs中type的顺序放入数组即可
            let animeArr = []
            let animeTypeArr = this.tabs
            for (let i = 0; i < animeTypeArr.length; i++) {
                this.axios.get(config.GetAnimeApi, {
                    headers: {
                        'gfsessionid': localStorage.getItem('token')
                    }
                }).then( response => {
                        let res = response.data
                        if (res.code === 200) {
                            this.tabs = res.data
                        }else if (res.code === 400) {
                            this.$message.error(res.message)
                        }
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .my-card {
        width: 100%;
        max-width: 350px;
    }
</style>