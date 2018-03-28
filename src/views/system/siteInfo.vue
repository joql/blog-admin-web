<style scoped>
    @import './siteInfo.less';
</style>
<template>
    <div>
        <Row>
            <Col span="24">
            <Card>
                <Tabs type="card">
                    <TabPane label="基础信息" icon="android-create">
                    <Col span="16">
                        <Form ref="myForm" :model="formItem" :rules="ruleValidate" :label-width="160">
                            <FormItem label="网站状态" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Radio label="male">开启</Radio>
                                    <Radio label="female">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="网站关闭时提示文字" prop="name">
                                <Input v-model="formItem.name" placeholder="网站升级中，请稍后访问。" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="备案号" prop="name">
                                <Input v-model="formItem.name" placeholder="豫ICP备13号-31"></Input>
                            </FormItem>
                            <FormItem label="站长邮箱" prop="name">
                                <Input v-model="formItem.name" placeholder="test@test.com"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    </TabPane>
                    <TabPane label="优化推广" icon="share">
                        <Col span="16">
                        <Form ref="myForm" :model="formItem" :rules="ruleValidate" :label-width="160">
                            <FormItem label="网站名" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="网站关键字" prop="name">
                                <Input v-model="formItem.name" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="网站描述" prop="name">
                                <Input v-model="formItem.name" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="默认作者" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文章保留版权提示" prop="name">
                                <Input v-model="formItem.name" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="文章图片title和alt内容" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="文章水印" icon="image">
                        <Col span="16">
                        <Form ref="myForm" :model="formItem" :rules="ruleValidate" :label-width="160">
                            <FormItem label="水印类型" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Radio label="male">文字水印</Radio>
                                    <Radio label="female">图片水印</Radio>
                                    <Radio label="female">关闭水印</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="文字水印内容" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文字水印字体路径" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字字号" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字颜色" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字倾斜程度" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="文字水印位置" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Col>
                                    <Radio label="txt-top-left">上左</Radio>
                                    <Radio label="txt-top-center">上中</Radio>
                                    <Radio label="txt-top-right">上右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="txt-center-left">中左</Radio>
                                    <Radio label="txt-center-center">中中</Radio>
                                    <Radio label="txt-center-right">中右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="txt-bottom-left">下左</Radio>
                                    <Radio label="txt-bottom-center">下中</Radio>
                                    <Radio label="txt-bottom-right">下右</Radio>
                                    </Col>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="图片水印来源路径" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="图片水印位置" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Col>
                                    <Radio label="pic-top-left">上左</Radio>
                                    <Radio label="pic-top-center">上中</Radio>
                                    <Radio label="pic-top-right">上右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="pic-center-left">中左</Radio>
                                    <Radio label="pic-center-center">中中</Radio>
                                    <Radio label="pic-center-right">中右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="pic-bottom-left">下左</Radio>
                                    <Radio label="pic-bottom-center">下中</Radio>
                                    <Radio label="pic-bottom-right">下右</Radio>
                                    </Col>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="图片水印透明度" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="邮箱设置" icon="at">
                        <Col span="16">
                        <Form ref="myForm" :model="formItem" :rules="ruleValidate" :label-width="160">
                            <FormItem label="SMTP服务器" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem label="邮箱账号" prop="name">
                                <Input v-model="formItem.name" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="邮箱密码" prop="name">
                                <Input v-model="formItem.name" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="发件人名称" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="评论设置" icon="chatbubble-working">
                        <Col span="16">
                        <Form ref="myForm" :model="formItem" :rules="ruleValidate" :label-width="160">
                            <FormItem label="开启评论审核" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Radio label="male">开启</Radio>
                                    <Radio label="female">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="发送被评论邮件" prop="gender">
                                <RadioGroup v-model="formItem.gender">
                                    <Radio label="male">开启</Radio>
                                    <Radio label="female">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="接收评论通知邮箱" prop="name">
                                <Input v-model="formItem.name"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                </Tabs>
            </Card>
            </Col>
        </Row>

    </div>

</template>
<script>
    import axios from 'axios';
    export default {
        name: 'system_menu',
        data () {
            return {
                columnsList: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 65,
                        align: 'center'
                    },
                    {
                        title: '菜单名称',
                        align: 'left',
                        key: 'showName'
                    },
                    {
                        title: '排序',
                        align: 'center',
                        key: 'sort',
                        width: 80
                    },
                    {
                        title: '菜单URL',
                        align: 'left',
                        key: 'url',
                        width: 200
                    },
                    {
                        title: '状态',
                        align: 'center',
                        key: 'hide',
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
                    name: '',
                    fid: 0,
                    url: '',
                    sort: 0,
                    id: 0
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '菜单名称不能为空', trigger: 'blur' }
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
                this.modalSetting.show = true;
            },
            submit () {
                let self = this;
                this.$refs['myForm'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        if (this.formItem.id === 0) {
                            target = 'Menu/add';
                        } else {
                            target = 'Menu/edit';
                        }
                        axios.post(target, this.formItem).then(function (response) {
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
                axios.get('Menu/index').then(function (response) {
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
