<template>
    <div>
        <div class="select-box">
            <el-form :inline="true" :model="selectData" class="demo-form-inline">
                <el-form-item label="标题">
                    <el-input v-model="selectData.title" placeholder="请输入关键词"/>
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="selectData.introduce" placeholder="请输入关键词"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-table :data="dataList.comList" style="width: 100%">
                    <el-table-column prop="id" label="ID" width="180"/>
                    <el-table-column prop="title" label="title" width="180"/>
                    <el-table-column prop="introduce" label="详情"/>
                </el-table>
                <el-pagination @current-change='currentChange' @size-change='sizeChange' layout="prev, pager, next"
                               :total="selectData.count*2"/>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {reactive, toRefs, computed, watch, onMounted} from 'vue'
    import {getGoodsList} from "../request/api";
    import {InitData, ListInt} from "../type/goods";

    export default {
        name: "GoodsView",
        setup() {
            const data = reactive(new InitData())
            const getGoods = () => {
                getGoodsList().then((res) => {
                        data.list = res.data
                        data.selectData.count = res.data.length
                    }
                )
            }
            onMounted(() => {
                    getGoods()
                }
            )

            const currentChange = (page) => {
                data.selectData.page = page
            };
            const sizeChange = (pagesize) => {
                data.selectData.pagesize = pagesize
            };
            const onSubmit = () => {
                // console.log(data.selectData.title,data.selectData.introduce)
                let arr = []  //定义数组，用来接收查询过后的要展示的数据
                if (data.selectData.title || data.selectData.introduce) {
                    //如果两个输入框中至少一个有数据
                    if (data.selectData.title) {
                        arr = data.list.filter((value) => {
                                //将过滤出来的数组赋值给arr
                                return value.title.indexOf(data.selectData.title) !== -1
                            }
                        )
                    }
                    if (data.selectData.introduce) {
                        arr = data.list.filter((value) => {
                                return value.introduce.indexOf(data.selectData.introduce) !== -1
                            }
                        )
                    }
                } else {
                    arr = data.list
                }
                data.list = arr
                data.selectData.count = arr.length
            };
            watch([() => data.selectData.title, () => data.selectData.introduce], () => {
                    if (data.selectData.title === '' && data.selectData.introduce === '') {
                        getGoods()
                    }
                }
            )
            const dataList = reactive({
                //vue3计算属性
                comList: computed(() => {
                        return data.list.slice(
                            (data.selectData.page - 1) * data.selectData.pagesize, //0  10 20 30
                            data.selectData.page * data.selectData.pagesize //10   20 30 39
                            //因为slice的参数包头不包尾，所以 第一页为索引为0-9  10-19 20-29 30-39
                        )
                    }
                )
            })


            return {
                ...toRefs(data),
                currentChange,
                sizeChange,
                dataList,
                onSubmit
            }
        }
    }
</script>

<style scoped>

</style>
