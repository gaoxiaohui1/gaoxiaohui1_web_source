<template>
  <section>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="authors">作者</el-checkbox>
            <el-checkbox label="types">类型</el-checkbox>
            <el-checkbox label="publishUsers">发布人</el-checkbox>
            <el-checkbox label="titles">标题</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="2">
        <transition name="el-fade-in-linear">
          <div v-show="showAuthor" class="transition-box">
            <authors></authors>
          </div>
        </transition>
      </el-col>
      <el-col :span="8" :offset="2">
        <transition name="el-fade-in">
          <div v-show="showType" class="transition-box">
            <types></types>
          </div>
        </transition>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="2">
        <transition name="el-zoom-in-center">
          <div v-show="showPublishUser" class="transition-box">
            <publish-users></publish-users>
          </div>
        </transition>
      </el-col>
      <el-col :span="8" :offset="2">
        <transition name="el-zoom-in-top">
          <div v-show="showTitle" class="transition-box">
            <titles></titles>
          </div>
        </transition>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <transition name="el-zoom-in-bottom">
          <div v-show="showCarousel" class="transition-box">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in pics" :key="item.ID">
                <img :src="item.Url" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </transition>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import authors from './authors'
import types from './types'
import publishUsers from './publishUsers'
import titles from './titles'
import errGif from '@/assets/401_images/401.gif'
import img_404 from '@/assets/404_images/404.png'
import img_404_cloud from '@/assets/404_images/404_cloud.png'
import logo from '@/assets/logo.png'
export default {
  name: 'home',
  data() {
    return {
      showAuthor: true,
      showType: true,
      showPublishUser: true,
      showTitle: true,
      showCarousel: true,
      pics: [{ ID: 1, Url: logo }, { ID: 21, Url: errGif }, { ID: 31, Url: img_404 }, { ID: 41, Url: img_404_cloud }],
      checkList: []
    }
  },
  watch: {
    'checkList': function(bv, av) {
      this.showAuthor = av.contains('authors')
      this.showType = av.contains('authors')
      this.showshowPublishUserAuthor = av.contains('authors')
      this.showTitle = av.contains('titles')
    }
  },
  components: {
    authors,
    types,
    publishUsers,
    titles
  }
}
</script>
<style>
.transition-box {
  margin-top: 20px;
  height: 300px;
  border: 1px solid #ef8476;
  text-align: center;
  padding: 40px 20px;
  box-sizing: border-box;
  margin-right: 20px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.bg-purple-dark {
  background: #99a9bf;
}
</style>