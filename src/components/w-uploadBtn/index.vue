<template>
  <div class="UploadFile-container">
    <!-- :headers="uploadHeaders" -->
    <el-upload :action="comUploadUrl + '/' + type" ref="elUpload" :on-success="handleSuccess" :multiple="limit !== 1"
      :show-file-list="false" :accept="accept" :before-upload="beforeUpload" :on-exceed="handleExceed"
      :disabled="disabled" :limit="limit">
      <el-button size="small" icon="el-icon-upload" :disabled="disabled">{{
          buttonText
      }}</el-button>
      <div slot="tip" class="el-upload__tip" v-show="showTip">
        只能上传不超过{{ fileSize }}{{ sizeUnit }}的{{ accept }}文件
      </div>
    </el-upload>
    <template v-if="fileList.length">
      <transition-group class="el-upload-list el-upload-list el-upload-list--text" tag="ul" name="el-list">
        <li class="el-upload-list__item is-success" v-for="(file, index) in fileList" :key="file.fileId">
          <a class="el-upload-list__item-name" @click="handleClick(file)">
            <i class="el-icon-document"></i>{{ file.name }}
          </a>
          <label class="el-upload-list__item-status-label">
            <i class="el-icon-upload-success el-icon-circle-check"></i>
          </label>
          <i class="el-icon-close" v-if="!disabled" @click="handleRemove(file, index)"></i>
        </li>
      </transition-group>
    </template>
  </div>
</template>

<script>
const units = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
};
// import { getDownloadUrl } from "@/api/common";
export default {
  name: "UploadFile",
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: "annex",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showTip: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 0,
    },
    accept: {
      type: String,
      default: "*",
    },
    buttonText: {
      type: String,
      default: "选择文件",
    },
    sizeUnit: {
      type: String,
      default: "MB",
    },
    fileSize: {
      default: 5,
    },
    fileType: {
      type: String,
      default: 'video',
    }
  },
  data() {
    return {
      fileList: this.value,
      comUploadUrl: "http://119.36.93.103:30213/api/file/Uploader",
      comUrl: "http://119.36.93.103:30213",
      //uploadHeaders: { Authorization: this.$store.getters.token }
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.fileList = val;
      },
    },
  },
  methods: {
    beforeUpload(file) {
      const unitNum = units[this.sizeUnit];
      if (this.fileType) {
        //如果选择了格式类型，那么就对格式类型进行判断，看上传的文件类型和选择的文件类型是否有相同之处
        if (file.type.indexOf(this.fileType) == -1) {
          this.$message.error('请上传正确的文件格式');
          return false;
        }
      }
      if (!this.fileSize) return true;
      let isRightSize = file.size / unitNum < this.fileSize;
      if (!isRightSize) {
        this.$message.error(`文件大小超过${this.fileSize}${this.sizeUnit}`);
      }
      // let isAccept = new RegExp(this.accept).test(file.type)
      // if (!isAccept) {
      //   this.$message.error(`应该选择${this.accept}类型的文件`)
      // }
      return isRightSize;
    },
    handleSuccess(res, file, fileList) {
      if (res.code == 200) {
        this.fileList.push({
          name: file.name,
          fileId: res.data.name,
          url: res.data.url,
        });
        this.$emit("input", this.fileList);
      } else {
        fileList.filter((o) => o.uid != file.uid);
        this.$emit("input", this.fileList);
        this.$message({ message: res.msg, type: "error", duration: 1500 });
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制最多可以上传${this.limit}个文件`);
    },
    handleRemove(file, index) {
      this.fileList.splice(index, 1);
      this.$refs.elUpload.uploadFiles.splice(index, 1);
      this.$emit("input", this.fileList);
      // this.$confirm(`确定移除${file.name}？`, '提示').then(() => {
      // }).catch(() => { })
    },
    // handleClick(file) {
    //   // 点击下载文件
    //   if (!file.fileId) return;
    //   getDownloadUrl(this.type, file.fileId).then((res) => {
    //     if (res.data.url) window.location.href = this.comUrl + res.data.url;
    //   });
    // },
  },
};
</script>