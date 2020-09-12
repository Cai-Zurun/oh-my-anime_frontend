<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn class="" outlined dark color="primary"  v-on="on">
                <v-icon dark>mdi-pencil</v-icon>
                编辑动漫类型
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">编辑动漫类型</span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="inputForm.oldType" label="oldType"></v-text-field>
                <v-text-field v-model="inputForm.newType" label="newType(修改类型才填)"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="del">删除</v-btn>
                <v-btn color="blue darken-1" text @click="update">修改</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import utils from "../utils";

    export default {
        name: "AnimeTypeEdit",
        inject: ['reload'],
        data: () => ({
            dialog: false,
            inputForm: {
                oldType: '',
                newType: ''
            },
        }),
        methods: {
            close () {
                this.inputForm.oldType = ''
                this.inputForm.newType = ''
                this.dialog = false
            },
            del () {
                if (utils.sessionId != null) {
                    let deleteItem = {
                        Type : this.inputForm.oldType
                    }
                    this.axios.post(utils.AnimeTypeDeleteApi, deleteItem, {
                        headers: {
                            'gfsessionid': utils.sessionId
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
            update () {
                if (utils.token != null) {
                    let updateItem = {
                        Type: this.inputForm.oldType,
                        NewType: this.inputForm.newType
                    }
                    this.axios.post(utils.AnimeTypeUpdateApi, updateItem, {
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
            }
        }
    }
</script>

<style scoped>

</style>