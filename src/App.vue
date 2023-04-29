<template>
  <div class="common-layout">
    <el-container>
<!--      <el-header>-->
<!--        <HeaderMenu></HeaderMenu>-->
<!--      </el-header>-->
      <el-container>
<!--        <el-aside>-->
<!--          <SideMenu></SideMenu>-->
<!--        </el-aside>-->
        <el-container>
          <el-main>
            <router-view />
          </el-main>
          <el-footer>
            <FooterMenu></FooterMenu>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
<script>
import HeaderMenu from "@/views/HeaderMenu";
import SideMenu from "@/views/SideMenu";
import FooterMenu from "@/views/FooterMenu";
export default {
  components: {
    FooterMenu,
    HeaderMenu,
    SideMenu,
  },
};
</script>
