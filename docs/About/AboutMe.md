---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: '',
    name: '李载赣神魔',
    title: 'lzgsm1997',
    links: [
      { icon: 'github', link: 'https://github.com/lzgsm1997' },
      { icon: '博客园', link: '' },
      { icon: 'bilibili', link: '' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      lzgsm1997
    </template>
    <template #lead>
    <p>我叫李载赣神魔</p>
    <br>
    <p>喜欢互联网、数码</p>
    <br>
    <p>⌨️编程</p>
</template>
</VPTeamPageTitle>
<VPTeamMembers
    :members="members"
  />
</VPTeamPage>
