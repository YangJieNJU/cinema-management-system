<template>
  <movie-card :movie="movie"></movie-card>
</template>

<script>
import MovieCard from '@/components/MovieCard'

export default {
  components: {
    'movie-card': MovieCard
  },
  data() {
    return {
      movie: {
        posterUrl: 'http://n.sinaimg.cn/translate/640/w600h840/20190312/ampL-hufnxfm4278816.jpg',
        name: '夏目友人帐',
        description: '人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
        director: '大森贵弘 /伊藤秀樹',
        starring: '神谷浩史 /井上和彦 /高良健吾 /小林沙苗 /泽城美雪',
        id: 5,
        islike: 1,
        likeCount: 6,
        status: 0
      }
    }
  }
}
</script>
