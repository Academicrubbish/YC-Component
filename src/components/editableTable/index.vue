<template>
  <!-- 可编辑表格 -->
  <div class="editable">
    <el-table ref="singleTable" :data="tableData" highlight-current-row border @current-change="handleCurrentChange"
      v-if="tableData.length != 0">
      <el-table-column type="index" label="编号" width="50">
        <template slot="header" slot-scope="scope">
          <el-button type="text" class="el-icon-delete" @click.native.prevent="deleteRow(-1, tableData)"></el-button>
        </template>
        <template slot-scope="scope">
          <el-button type="text" class="el-icon-delete" @click.native.prevent="deleteRow(scope.$index, tableData)"
            v-if="currentRow == scope.row"></el-button>
          <span v-else>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="applicant" label="申请人">
        <template slot-scope="scope">
          <el-input v-model="scope.row.applicant" v-if="currentRow == scope.row"></el-input>
          <span v-else>{{ scope.row.applicant }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="credit" label="社会统一信用代码">
        <template slot-scope="scope">
          <el-input v-model="scope.row.credit" v-if="currentRow == scope.row"></el-input>
          <span v-else>{{ scope.row.credit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址">
        <template slot-scope="scope">
          <el-input v-model="scope.row.address" v-if="currentRow == scope.row"></el-input>
          <span v-else>{{ scope.row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="zipCode" label="邮编">
        <template slot-scope="scope">
          <el-input v-model="scope.row.zipCode" v-if="currentRow == scope.row"></el-input>
          <span v-else>{{ scope.row.zipCode }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-button type="text" class="el-icon-plus" style="color: #12B4A8;" @click="pushRow">添加</el-button>
      <el-button v-if="tableData.length != 0" type="primary" @click="unCheck" size="mini">取消选中</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          applicant: '中铁大桥科学研究院',
          credit: '9142010017757325',
          address: '湖北省武汉市建设',
          zipCode: '430034'
        }, {
          applicant: '中铁大桥局集团有限公司',
          credit: '9142010017768578',
          address: '湖北省武汉市汉阳',
          zipCode: '430050'
        }, {
          applicant: '中铁桥研科技有限公司',
          credit: '9142010017767614',
          address: '湖北省武汉市硚口',
          zipCode: '430034'
        }
      ],
      currentRow: null
    };
  },
  methods: {
    pushRow() {
      this.tableData.push({
        applicant: '',
        credit: '',
        address: '',
        zipCode: ''
      })
    }
    ,
    deleteRow(index, rows) {
      if (index == -1) {
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          type: "warning",
        }).then(() => {
          this.tableData = [];
        }).catch(() => { });

      } else {
        rows.splice(index, 1);
      }
    },
    handleCurrentChange(currentRow, oldCurrentRow) {
      // currentRow 当前选中的，oldCurrentRow 之前选中的
      this.currentRow = currentRow;
    },
    unCheck() {
      this.$refs.singleTable.setCurrentRow()
    }
  }
}
</script>

<style scoped>
span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>