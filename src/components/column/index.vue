<template>
  <div>
    <splitpanes class="default-theme" horizontal style="height: 400px">
      <pane min-size="20" max-size="70">
        <span>我的最小高度为20%，最大高度为70%</span>
      </pane>
      <pane>
        <span></span>
      </pane>
      <pane max-size="70">
        <span>我的最大高度为 70%</span>
      </pane>
    </splitpanes>
    <splitpanes class="default-theme" style="height: 400px;margin-top:50px;">
      <pane v-for="i in 8" :key="i" min-size="5">
        <span>{{ i }}</span>
      </pane>
    </splitpanes>
    <splitpanes class="default-theme" horizontal :push-other-panes="false" style="height: 400px;margin-top:50px;">
      <pane>
        <span>1</span>
      </pane>
      <pane>
        <splitpanes :push-other-panes="false">
          <pane>
            <span>2</span>
          </pane>
          <pane>
            <span>3</span>
          </pane>
          <pane>
            <span>4</span>
          </pane>
        </splitpanes>
      </pane>
      <pane>
        <span>5</span>
      </pane>
    </splitpanes>
  </div>
</template>
<script>
//Splitpanes组件官网  https://antoniandre.github.io/splitpanes/
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
export default {
  components: {
    Splitpanes, Pane
  }
}
</script>
<style>

</style>