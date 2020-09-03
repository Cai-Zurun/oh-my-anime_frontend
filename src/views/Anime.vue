<template>
    <el-container>
        <el-header>
            <el-row :gutter="20">
                <el-col :span="3">
                    <add-anime-type></add-anime-type>
                </el-col>
                <el-col span="3">
                    <add-anime></add-anime>
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
    import AddAnime from "../components/AddAnime";
    import AddAnimeType from "../components/AddAnimeType";
    import AnimeTable from "../components/AnimeTable";

    export default {
        name: "Anime",
        components: {
            AddAnime,
            AddAnimeType,
            AnimeTable
        },
    }
</script>

<style scoped>
</style>