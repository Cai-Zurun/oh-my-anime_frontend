<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn class="" outlined dark color="primary"  v-on="on">
                <v-icon dark>mdi-plus</v-icon>
                添加动漫类型
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">添加动漫类型</span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="inputForm.type" label="Type"></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                <v-btn color="blue darken-1" text @click="add">添加</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import utils from "../utils";

    export default {
        name: "AnimeTypeAdd",
        inject: ['reload'],
        data: () => ({
            dialog: false,
            inputForm: {
                type: ''
            },
            action: 'https://jsonplaceholder.typicode.com/posts/',

        }),
        methods: {
            close () {
                this.inputForm.type = ''
                this.dialog = false
            },
            add () {
                if (utils.token != null) {
                    this.axios.post(utils.AnimeTypeAddApi, this.inputForm, {
                        headers: {
                            'Authorization': "Bearer " + utils.token
                        }
                    }).then( response => {
                            let res = response.data
                            if (res.code === 200) {
                                this.reload()
                                this.$message.success(res.message)
                            }else if (res.code === 400) {
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