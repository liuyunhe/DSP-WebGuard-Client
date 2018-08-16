import global_ from "../../config/Global"
export default {
  name: "",
  data() {
    return {
      global_,
      fileList: [],
      fileListLength:0,
      fileNames:"",
      channelDayInfoList:[]
    }
  },
  created() {
    this.updata()
  },
  methods:{
    submitUpload() {
      if(!this.$refs.upload.uploadFiles.length){
        this.$message.error('上传文件不能为空!');
        return false
      }
      this.$refs.upload.submit();
      
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      console.log(file, fileList,'文件状态改变');
    },
    handleSuccess(response, file, fileList){
      console.log(response,fileList,'服务器返回数据')
      
      if(response.code == 1){
        this.fileListLength+=1
        if(response.data.result=="失败"){
          if(this.fileNames==""){
            this.fileNames+=response.data.desc
          }else{
            this.fileNames+=';'+response.data.desc
          }
        }
        if(this.fileListLength == fileList.length){
          this.fileListLength = 0
          this.$refs.upload.clearFiles();
          if(this.fileNames!==""){
            this.$confirm(`导入模板与系统原模板不一致，请重新导入， 文件名为${this.fileNames}`, '提示', {
              confirmButtonText: '知道了',
              showCancelButton:false,
              type: 'warning'
            }).then(() => {
              this.fileNames = ""
            }).catch(() => {
              this.fileNames = ""
            });
          }else{
            this.$message.success('上传成功!');
          }
          this.updata()
        }
        // console.log(file,111)
      }else if(response.code !== 1){
        this.$message.error('服务器错误!');
      }
    },
    beforeAvatarUpload(file) {
      console.log(file)
      const isCSV = /\.csv$/.test(file.name)
      // const isCSV = file.type === 'image/jpeg';
      // // const isLt2M = file.size / 1024 / 1024 < 2;
      //
      if (!isCSV) {
        this.$message.error('上传失败，请上传CSV格式文件!');
      }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      return isCSV
    },
    mapfileList(files){
      files.forEach((item)=>{
        if(item.status !=="success"){
          this.mapfileList(files)
        }
      })
    },
    updata(){
      this.$requestHttp.put("/api/private/1.0/ChannelImport/queryImportDate",{},{},res=>{
        console.log(res.data.data.channelDayInfoList,'导入时间状态')
        this.channelDayInfoList = res.data.data.channelDayInfoList
      })
    }
  }
  
}
