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
                        <Form ref="formBase" :model="base" :rules="ruleValidate" :label-width="160">
                            <FormItem label="网站状态" prop="webState">
                                <RadioGroup v-model="base.webState">
                                    <Radio label="1">开启</Radio>
                                    <Radio label="0">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="网站关闭时提示文字" prop="webCloseWord">
                                <Input v-model="base.webCloseWord" placeholder="网站升级中，请稍后访问。" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="备案号" prop="icpNumber">
                                <Input v-model="base.icpNumber" placeholder="豫ICP备13号-31"></Input>
                            </FormItem>
                            <FormItem label="站长邮箱" prop="email">
                                <Input v-model="base.email" placeholder="test@test.com"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_base_set" >提交</Button>
                            </FormItem>
                        </Form>
                    </Col>
                    </TabPane>
                    <TabPane label="优化推广" icon="share">
                        <Col span="16">
                        <Form ref="formShare" :model="share" :rules="ruleValidate" :label-width="160">
                            <FormItem label="网站名" prop="webName">
                                <Input v-model="share.webName"></Input>
                            </FormItem>
                            <FormItem label="网站关键字" prop="webKeyWords">
                                <Input v-model="share.webKeyWords" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="网站描述" prop="webDesc">
                                <Input v-model="share.webDesc" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="默认作者" prop="author">
                                <Input v-model="share.author"></Input>
                            </FormItem>
                            <FormItem label="文章保留版权提示" prop="copyrightWord">
                                <Input v-model="share.copyrightWord" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="文章图片title和alt内容" prop="imgTltleAltWord">
                                <Input v-model="share.imgTltleAltWord"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_share_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="文章水印" icon="image">
                        <Col span="16">
                        <Form ref="formArticls" :model="artilces" :rules="ruleValidate" :label-width="160">
                            <FormItem label="水印类型" prop="waterType">
                                <RadioGroup v-model="artilces.waterType">
                                    <Radio label="1">文字水印</Radio>
                                    <Radio label="2">图片水印</Radio>
                                    <Radio label="0">关闭水印</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="文字水印内容" prop="textWaterWord">
                                <Input v-model="artilces.textWaterWord"></Input>
                            </FormItem>
                            <FormItem label="文字水印字体路径" prop="textWaterPath">
                                <Input v-model="artilces.textWaterPath"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字字号" prop="textWaterSize">
                                <Input v-model="artilces.textWaterSize"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字颜色" prop="textWaterColor">
                                <Input v-model="artilces.textWaterColor"></Input>
                            </FormItem>
                            <FormItem label="文字水印文字倾斜程度" prop="textWaterAngle">
                                <Input v-model="artilces.textWaterAngle"></Input>
                            </FormItem>
                            <FormItem label="文字水印位置" prop="textWaterLocate">
                                <RadioGroup v-model="artilces.textWaterLocate">
                                    <Col>
                                    <Radio label="1">上左</Radio>
                                    <Radio label="2">上中</Radio>
                                    <Radio label="3t">上右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="4">中左</Radio>
                                    <Radio label="5">中中</Radio>
                                    <Radio label="6">中右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="7">下左</Radio>
                                    <Radio label="8">下中</Radio>
                                    <Radio label="9">下右</Radio>
                                    </Col>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="图片水印来源路径" prop="imgWaterPath">
                                <Input v-model="artilces.imgWaterPath"></Input>
                            </FormItem>
                            <FormItem label="图片水印位置" prop="imgWaterLocate">
                                <RadioGroup v-model="artilces.imgWaterLocate">
                                    <Col>
                                    <Radio label="1">上左</Radio>
                                    <Radio label="2">上中</Radio>
                                    <Radio label="3">上右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="4">中左</Radio>
                                    <Radio label="5">中中</Radio>
                                    <Radio label="6">中右</Radio>
                                    </Col>
                                    <Col>
                                    <Radio label="7">下左</Radio>
                                    <Radio label="8">下中</Radio>
                                    <Radio label="9">下右</Radio>
                                    </Col>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="图片水印透明度" prop="imgWaterAlpha">
                                <Input v-model="artilces.imgWaterAlpha"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_artilces_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="邮箱设置" icon="at">
                        <Col span="16">
                        <Form ref="formEmail" :model="email" :rules="ruleValidate" :label-width="160">
                            <FormItem label="SMTP服务器" prop="stmp">
                                <Input v-model="email.stmp"></Input>
                            </FormItem>
                            <FormItem label="邮箱账号" prop="emailUsername">
                                <Input v-model="email.emailUsername" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="邮箱密码" prop="emailPassword">
                                <Input v-model="email.emailPassword" type="textarea"></Input>
                            </FormItem>
                            <FormItem label="发件人名称" prop="emailFormNmae">
                                <Input v-model="email.emailFormNmae"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_email_set" >提交</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </TabPane>
                    <TabPane label="评论设置" icon="chatbubble-working">
                        <Col span="16">
                        <Form ref="formComment" :model="comment" :rules="ruleValidate" :label-width="160">
                            <FormItem label="开启评论审核" prop="commentReview">
                                <RadioGroup v-model="comment.commentReview">
                                    <Radio label="1">开启</Radio>
                                    <Radio label="0">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="发送被评论邮件" prop="commentSendEmail">
                                <RadioGroup v-model="comment.commentSendEmail">
                                    <Radio label="1">开启</Radio>
                                    <Radio label="0">关闭</Radio>
                                </RadioGroup>
                            </FormItem>
                            <FormItem label="接收评论通知邮箱" prop="emailReceive">
                                <Input v-model="comment.emailReceive"></Input>
                            </FormItem>
                            <FormItem>
                                <Button type="primary" @click="submit_comment_set" >提交</Button>
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
        name: 'site_info',
        data () {
            return {
                columnsList: [],
                tableData: [],
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                formItem: {
                },
                base: {
                    webState: 0,
                    webCloseWord: '',
                    icpNumber: '',
                    email: ''
                },
                share: {
                    webName: '',
                    webKeyWords: '',
                    webDesc: '',
                    author: '',
                    copyrightWord: '',
                    imgTltleAltWord: ''
                },
                artilces: {
                    waterType: 0,
                    textWaterWord: '',
                    textWaterPath: '',
                    textWaterSize: '',
                    textWaterColor: '',
                    textWaterAngle: '',
                    textWaterLocate: 1,
                    imgWaterPath: '',
                    imgWaterLocate: 1,
                    imgWaterAlpha: ''
                },
                email: {
                    stmp: '',
                    emailUsername: '',
                    emailPassword: '',
                    emailFormNmae: ''
                },
                comment: {
                    commentReview: 0,
                    commentSendEmail: 0,
                    emailReceive: ''
                },
                ruleValidate: {
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
            submit_base_set () {
                let self = this;
                this.$refs['formBase'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        target = 'Config/updateBase';
                        axios.post(target, this.base).then(function (response) {
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
            submit_share_set () {
                let self = this;
                this.$refs['formShare'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        target = 'Config/updateShare';
                        axios.post(target, this.share).then(function (response) {
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
            submit_artilces_set () {
                let self = this;
                this.$refs['formArticls'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        target = 'Config/updateArticls';
                        axios.post(target, this.artilces).then(function (response) {
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
            submit_email_set () {
                let self = this;
                this.$refs['formEmail'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        target = 'Config/updateEmail';
                        axios.post(target, this.email).then(function (response) {
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
            submit_comment_set () {
                let self = this;
                this.$refs['formComment'].validate((valid) => {
                    if (valid) {
                        self.modalSetting.loading = true;
                        let target = '';
                        target = 'Config/updateComment';
                        axios.post(target, this.comment).then(function (response) {
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
            getList () {
                let vm = this;
                axios.get('Config/basic').then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.base.webState = res.data.WEB_STATUS;
                        vm.base.webCloseWord = res.data.WEB_CLOSE_WORD;
                        vm.base.icpNumber = res.data.WEB_ICP_NUMBER;
                        vm.base.email = res.data.ADMIN_EMAIL;
                        vm.share.webName = res.data.WEB_NAME;
                        vm.share.webKeyWords = res.data.WEB_KEYWORDS;
                        vm.share.webDesc = res.data.WEB_DESCRIPTION;
                        vm.share.author = res.data.AUTHOR;
                        vm.share.copyrightWord = res.data.COPYRIGHT_WORD;
                        vm.share.imgTltleAltWord = res.data.IMAGE_TITLE_ALT_WORD;
                        vm.artilces.waterType = res.data.WATER_TYPE;
                        vm.artilces.textWaterWord = res.data.TEXT_WATER_WORD;
                        vm.artilces.textWaterPath = res.data.TEXT_WATER_TTF_PTH;
                        vm.artilces.textWaterSize = res.data.TEXT_WATER_FONT_SIZE;
                        vm.artilces.textWaterColor = res.data.TEXT_WATER_COLOR;
                        vm.artilces.textWaterAngle = res.data.TEXT_WATER_ANGLE;
                        vm.artilces.textWaterLocate = res.data.TEXT_WATER_LOCATE;
                        vm.artilces.imgWaterPath = res.data.IMAGE_WATER_PIC_PTAH;
                        vm.artilces.imgWaterLocate = res.data.IMAGE_WATER_LOCATE;
                        vm.artilces.imgWaterAlpha = res.data.IMAGE_WATER_ALPHA;
                        vm.email.stmp = res.data.EMAIL_SMTP;
                        vm.email.emailUsername = res.data.EMAIL_USERNAME;
                        vm.email.emailPassword = res.data.EMAIL_PASSWORD;
                        vm.email.emailFormNmae = res.data.EMAIL_FROM_NAME;
                        vm.comment.commentReview = res.data.COMMENT_REVIEW;
                        vm.comment.commentSendEmail = res.data.COMMENT_SEND_EMAIL;
                        vm.comment.emailReceive = res.data.EMAIL_RECEIVE;
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
