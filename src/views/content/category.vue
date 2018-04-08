<style lang="less" scoped>
    @import './category.less';
</style>

<template>
    <div>
        <Row>
            <Col span="24">
            <Card>
                <p slot="title" style="height: 32px">
                    <Button type="primary" @click="alertAdd" icon="plus-round">新增</Button>
                </p>
                <div>
                    <Table :columns="columnsList" :data="tableData" border disabled-hover></Table>
                </div>
            </Card>
            </Col>
        </Row>
        <Modal v-model="modalSetting.show" width="668" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="information-circled"></Icon>
                <span>{{formItem.id ? '编辑' : '新增'}}分类</span>
            </p>
            <Form ref="myForm" :rules="ruleValidate" :model="formItem" :label-width="80">
                <FormItem label="分类名称" prop="name">
                    <Input v-model="formItem.name" placeholder="请输入分类名称"></Input>
                </FormItem>
                <FormItem label="父级栏目" prop="fid">
                    <Select v-model="formItem.fid" filterable>
                        <Option :value="0">顶级栏目</Option>
                        <Option v-for="item in tableData" :value="item.category_id" :key="item.category_id">{{ item.showName }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="菜单排序" prop="sort">
                    <InputNumber :min="0" v-model="formItem.sort"></InputNumber>
                    <Badge count="数字越小越靠前" style="margin-left:5px"></Badge>
                </FormItem>
                <FormItem label="关键词" prop="key">
                    <Input v-model="formItem.keyw"></Input>
                </FormItem>
                <FormItem label="描述" prop="desc">
                    <Input v-model="formItem.desc" type="textarea"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancel" style="margin-right: 8px">取消</Button>
                <Button type="primary" @click="submit" :loading="modalSetting.loading">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import axios from 'axios';
    const editButton = (vm, h, currentRow, index) => {
        return h('Button', {
            props: {
                type: 'primary'
            },
            style: {
                margin: '0 5px'
            },
            on: {
                'click': () => {
                    vm.formItem.id = currentRow.category_id;
                    vm.formItem.name = currentRow.category_name;
                    vm.formItem.fid = currentRow.pid;
                    vm.formItem.sort = currentRow.showSort;
                    vm.formItem.keyw = currentRow.category_key;
                    vm.formItem.desc = currentRow.category_desc;
                    vm.modalSetting.show = true;
                    vm.modalSetting.index = index;
                }
            }
        }, '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这条数据吗? ',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    axios.get('ArticleDir/del', {
                        params: {
                            id: currentRow.category_id
                        }
                    }).then(function (response) {
                        currentRow.loading = false;
                        if (response.data.code === 1) {
                            vm.tableData.splice(index, 1);
                            vm.$Message.success(response.data.msg);
                        } else {
                            vm.$Message.error(response.data.msg);
                        }
                    });
                }
            }
        }, [
            h('Button', {
                style: {
                    margin: '0 5px'
                },
                props: {
                    type: 'error',
                    placement: 'top',
                    loading: currentRow.isDeleting
                }
            }, '删除')
        ]);
    };
    export default {
        name: 'system_menu',
        data () {
            return {
                columnsList: [
                    {
                        title: 'ID',
                        key: 'category_id',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '排序',
                        align: 'left',
                        key: 'showSort',
                        width: 80
                    },
                    {
                        title: '分类名',
                        align: 'left',
                        key: 'showName'
                    },
                    {
                        title: '关键词',
                        align: 'left',
                        key: 'category_key',
                        width: 200
                    },
                    {
                        title: '描述',
                        align: 'center',
                        key: 'category_desc',
                        width: 100
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'handle',
                        width: 200,
                        handle: ['edit', 'delete']
                    }
                ],
                tableData: [],
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                formItem: {
                    id: '',
                    name: '',
                    fid: 0,
                    sort: 0,
                    keyw: '',
                    desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '分类名称不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        created () {
            this.init();
            this.getList();
        },
        methods: {
            init () {
                let vm = this;
                this.columnsList.forEach(item => {
                    if (item.handle) {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('div', [
                                editButton(vm, h, currentRowData, param.index),
                                deleteButton(vm, h, currentRowData, param.index)
                            ]);
                        };
                    }
                    if (item.key === 'hide') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('i-switch', {
                                attrs: {
                                    size: 'large'
                                },
                                props: {
                                    'true-value': 1,
                                    'false-value': 0,
                                    value: currentRowData.hide
                                },
                                on: {
                                    'on-change': function (status) {
                                        axios.get('Menu/changeStatus', {
                                            params: {
                                                status: status,
                                                id: currentRowData.id
                                            }
                                        }).then(function (response) {
                                            let res = response.data;
                                            if (res.code === 1) {
                                                vm.$Message.success(res.msg);
                                            } else {
                                                if (res.code === -14) {
                                                    vm.$store.commit('logout', vm);
                                                    vm.$router.push({
                                                        name: 'login'
                                                    });
                                                } else {
                                                    vm.$Message.error(res.msg);
                                                    vm.getList();
                                                }
                                            }
                                            vm.cancel();
                                        });
                                    }
                                }
                            }, [
                                h('span', {
                                    slot: 'open'
                                }, '隐藏'),
                                h('span', {
                                    slot: 'close'
                                }, '显示')
                            ]);
                        };
                    }
                });
            },
            alertAdd () {
                let vm = this;
                vm.formItem.id = '';
                vm.formItem.name = '';
                vm.formItem.sort = 0;
                vm.formItem.keyw = '';
                vm.formItem.desc = '';
                this.modalSetting.show = true;
            },
            submit () {
                let self = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        axios.post('ArticleDir/push', this.formItem).then(function (response) {
                            if (response.data.code === 1) {
                                self.$Message.success(response.data.msg);
                            } else {
                                self.$Message.error(response.data.msg);
                            }
                            self.getList();
                            self.cancel();
                        });
                    }
                });
            },
            cancel () {
                this.modalSetting.show = false;
            },
            doCancel (data) {
                if (!data) {
                    this.formItem.id = 0;
                    this.$refs['myForm'].resetFields();
                    this.modalSetting.loading = false;
                    this.modalSetting.index = 0;
                }
            },
            getList () {
                let vm = this;
                axios.get('ArticleDir/lists').then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.tableData = res.data.list;
                    } else {
                        if (res.code === -14) {
                            vm.$store.commit('logout', vm);
                            vm.$router.push({
                                name: 'login'
                            });
                        } else {
                            vm.$Message.error(res.msg);
                        }
                    }
                });
            }
        }
    };
</script>
