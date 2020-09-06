<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn class="" depressed dark color="primary"  v-on="on">
                <v-icon dark>mdi-plus</v-icon>
                添加动漫
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">添加动漫</span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="inputForm.name" label="Name"></v-text-field>
                <v-text-field v-model="inputForm.link" label="Link"></v-text-field>
                <v-text-field v-model="inputForm.type" label="Type"></v-text-field>
                <el-upload
                    :action="action"
                    :http-request="fileUpload"
                >
                    <v-btn
                        outlined
                        block
                        width="100%"
                    >
                        Upload Anime Image
                        <v-icon right dark>mdi-cloud-upload</v-icon>
                    </v-btn>
<!--                    <el-button size="small" type="primary">上传</el-button>-->
                </el-upload>
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
    import config from "../config";

    export default {
        name: "AnimeAdd",
        inject: ['reload'],
        data: () => ({
            dialog: false,
            inputForm: {
                name: '',
                link: '',
                type: '',
                file: {}
            },
            action: 'https://jsonplaceholder.typicode.com/posts/',

        }),
        methods: {
            close () {
                this.inputForm.name = ''
                this.inputForm.link = ''
                this.inputForm.type = ''
                this.dialog = false
            },
            // 数据连同文件一起传到后端
            add () {
                let fd = new FormData()
                // fd.append("test", "for test")
                fd.append("name", this.inputForm.name)
                fd.append("link", this.inputForm.link)
                fd.append("type", this.inputForm.type)
                fd.append("AnimeImg", this.inputForm.file)
                this.axios.post(config.AnimeAddApi, fd, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'gfsessionid': config.sessionId
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
            },
            fileUpload (item) {
                this.inputForm.file = item.file
            }
        }
    }
</script>

<style scoped>

</style>