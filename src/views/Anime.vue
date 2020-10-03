 <template>
    <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="2">
                    <anime-type-add></anime-type-add>
                </el-col>
                <el-col :span="2">
                    <anime-type-edit></anime-type-edit>
                </el-col>
                <el-col :span="2">
                    <anime-add></anime-add>
                </el-col>
            </el-row>
        </el-header>
        <v-divider></v-divider>
        <el-main>
            <anime-table></anime-table>
        </el-main>
    </el-container>
</template>

<script>
    import AnimeAdd from "../components/AnimeAdd";
    import AnimeTypeAdd from "../components/AnimeTypeAdd";
    import AnimeTable from "../components/AnimeTable";
    import AnimeTypeEdit from "../components/AnimeTypeEdit";

    export default {
        name: "Anime",
        components: {
            AnimeAdd,
            AnimeTypeAdd,
            AnimeTable,
            AnimeTypeEdit
        },
    }
</script>

<style scoped>
</style>