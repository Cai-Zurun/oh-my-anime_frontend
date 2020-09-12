<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn outlined fab x-small color="blue" v-on="on">
                <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">编辑动漫</span>
            </v-card-title>

            <v-card-text>
                <v-text-field v-model="inputForm.type" label="Type"></v-text-field>
                <v-text-field v-model="inputForm.name" label="Name"></v-text-field>
                <v-text-field v-model="inputForm.link" label="Link"></v-text-field>
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
                <v-btn color="blue darken-1" text @click="update">修改</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import utils from "../utils";

    export default {
        name: "AnimeEdit",
        inject: ['reload'],
        props: ['oldType', 'oldName', 'oldLink'],
        data () {
            return {
                dialog: false,
                inputForm: {
                    type: this.oldType,
                    name: this.oldName,
                    link: this.oldLink,
                    file: {}
                },
                action: 'https://jsonplaceholder.typicode.com/posts/',
            }
        },
        mounted() {
          // console.log(this.oldType,this.oldName,this.oldLink)
        },
        methods: {
            close () {
                this.inputForm.type = ''
                this.inputForm.name = ''
                this.inputForm.link = ''
                this.dialog = false
            },
            update () {
                if (utils.token != null){
                    let fd = new FormData()
                    fd.append("type", this.oldType)
                    fd.append("name", this.oldName)
                    fd.append("NewType", this.inputForm.type)
                    fd.append("NewName", this.inputForm.name)
                    fd.append("Newlink", this.inputForm.link)
                    fd.append("AnimeImg", this.inputForm.file)
                    this.axios.post(utils.AnimeUpdateApi, fd, {
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
            fileUpload (item) {
                this.inputForm.file = item.file
            }
        }
    }
</script>

<style scoped>

</style>