<template>
    <div>
        <v-tabs vertical>
            <v-tab
                    v-model="tab"
                    v-for="(item,index) in tabs"
                    :key="index"
                    onclick=""
            >
                {{ item }}
            </v-tab>

            <v-tab-item
                    v-for="(items,index) in tabItems"
                    :key="index"
            >
                <v-container fluid>
                    <v-row>
                        <v-col
                                v-for="(card,index) in items"
                                :key="index"
                                :cols="flex"
                        >
                            <v-card width="230px">
                                    <v-img
                                            :src="img+card.Img"
                                            class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                            height="210px"
                                    >
                                        <v-card-title v-text="card.Name" class="text-size" ></v-card-title>
                                    </v-img>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <a href="www.bilibili.com">
                                        <v-btn outlined fab x-small color="green"  class="btn-right">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                    </a>
                                    <a :href="card.Link">
                                        <v-btn outlined fab x-small color="green"  class="btn-right">
                                            <v-icon>mdi-link-variant</v-icon>
                                        </v-btn>
                                    </a>
                                    <anime-edit :old-type="card.Type" :old-name="card.Name" :old-link="card.Link" class="btn-right"></anime-edit>
                                    <v-btn outlined fab x-small color="red" @click="delAnime(card.Type, card.Name)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-tab-item>
    </v-tabs>

    </div>
</template>

<script>
    import utils from "../utils";
    import AnimeEdit from "./AnimeEdit";

    export default {
        name: "AnimeTable",
        inject: ['reload'],
        components : {
            AnimeEdit,
        },
        data () {
            return {
                tab:null,
                tabs: '',
                tabItems: [],          // tabItems 是 动漫数组的数组
                flex: 2,
                // imgSrc1: "https://cdn.vuetifyjs.com/", //for test
                // imgSrc2: "images/cards/house.jpg",
                img: "data:image/jpeg;base64,",
                // testItems:[                            //for test
                //     [{name: "1"}, {name: "省中心官方"}],
                //     [{name: "2"}, {name: "省中心官方"}],
                //     [{name: "3"}, {name: "省中心官方"}]
                // ]
            }
        },
        created () {
            //获取动漫类型
            this.axios.get(utils.AnimeTypeGetApi, {
                // headers: {
                //     'gfsessionid': config.sessionId
                // }
            }).then( response => {
                    let res = response.data
                    if (res.code === 200) {
                        this.tabs = res.data
                    }else if (res.code === 400) {
                        this.$message.error(res.message)
                    }
                }
            )
            //获取动漫
            this.axios.get(utils.AnimeAllGetApi, {
                // headers: {
                //     'gfsessionid': config.sessionId
                // }
            }).then( response => {
                    let res = response.data
                    if (res.code === 200) {
                        this.tabItems = res.data
                    }else if (res.code === 400) {
                        this.$message.error(res.message)
                    }
                }
            )
        },
        methods : {
            delAnime (type, name) {
                if (utils.token != null) {
                    let deleteItem = {
                        Type : type,
                        Name : name
                    }
                    this.axios.post(utils.AnimeDeleteApi, deleteItem, {
                        headers: {
                            'Authorization': "Bearer " + utils.token
                        }
                    }).then( response => {
                            let res = response.data
                            if (res.code === 200) {
                                this.reload()
                                this.$message.success(res.message)

                            }else if (res.code === 400) {
                                this.reload()
                                this.$message.error(res.message)
                            }
                            this.close()
                        }
                    )
                }else {
                    this.$alert('抱歉客官，本站只允许作者对内容进行更改', '越权操作', {
                        confirmButtonText: '确定',
                    });
                }
            },

        }
    }
</script>

<style scoped>
    .btn-right {
        margin-right: 8px;
    }
    a{
        text-decoration: none;
    }
    .text-size{
        font-size: 25px;
    }
</style>