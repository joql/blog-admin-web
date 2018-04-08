<style scoped>
    @import '../../styles/common.less';
    @import './article.less';
</style>
<template>
    <div>
        <Row>
            <Col span="24">
                <Card style="margin-bottom: 10px">
                    <Form inline>
                        <FormItem style="margin-bottom: 0">
                            <Button type="primary" @click="addArticle" icon="plus-round">添加文章</Button>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Select v-model="searchConf.type" clearable placeholder="请选择类别" style="width:100px">
                                <Option :value="1">操作URL</Option>
                                <Option :value="2">用户昵称</Option>
                                <Option :value="3">用户ID</Option>
                            </Select>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Input v-model="searchConf.keywords" placeholder=""></Input>
                        </FormItem>
                        <FormItem style="margin-bottom: 0">
                            <Button type="primary" @click="search">查询/刷新</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <Card>
                    <div class="article-list">
                        <Table :columns="columnsList" :data="tableData" border disabled-hover ></Table>
                    </div>
                    <div class="margin-top-15" style="text-align: center">
                        <Page :total="tableShow.listCount" :current="tableShow.currentPage"
                              :page-size="tableShow.pageSize" @on-change="changePage"
                              @on-page-size-change="changeSize" show-elevator show-sizer show-total></Page>
                    </div>
                </Card>
            </Col>
        </Row>
        <Modal v-model="modalSetting.show" width="90" :styles="{top: '30px'}" @on-visible-change="doCancel">
            <p slot="header" style="color:#2d8cf0;">
                <Icon type="information-circled"></Icon>
                <span>{{formItem.aid ? '编辑' : '新增'}}文章</span>
            </p>
            <div>
                <Row>
                    <Col span="18">
                    <Card>
                        <Form :label-width="60">
                            <div class="article-title">
                                <FormItem label="文章标题" :error="articleError">
                                    <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list"/>
                                </FormItem>
                            </div>
                            <div class="article-describe">
                                <FormItem label="描述">
                                    <Input v-model="articleDesc" type="textarea" placeholder="为空则截取文章前300字"/>
                                </FormItem>
                            </div>
                        </Form>
                        <div class="margin-top-20">
                            <textarea id="articleEditor"></textarea>
                        </div>
                    </Card>
                    </Col>
                    <Col span="6" class="padding-left-10">
                        <div>
                            <Card>
                                <p slot="title">
                                    <Icon type="navicon-round"></Icon>
                                    分类目录
                                </p>
                                <Tabs type="card">
                                    <TabPane label="所有分类目录">
                                        <div class="classification-con">
                                            <Tree :data="dirList" ref="tree"></Tree>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </Card>
                        </div>
                        <div class="margin-top-10">
                            <Card>
                                <p slot="title">
                                    <Icon type="ios-pricetags-outline"></Icon>
                                    标签
                                </p>
                                <Row>
                                    <Col span="18">
                                    <Select v-model="articleTagSelected" multiple @on-change="handleSelectTag" placeholder="请选择文章标签">
                                        <Option v-for="item in tagList" :value="item.tid" :key="item.tid">{{ item.value }}</Option>
                                    </Select>
                                    </Col>
                                    <Col span="6" class="padding-left-10">
                                    <Button v-show="!addingNewTag" @click="handleAddNewTag" long type="ghost">新建</Button>
                                    </Col>
                                </Row>
                                <transition name="add-new-tag">
                                    <div v-show="addingNewTag" class="add-new-tag-con">
                                        <Col span="14">
                                        <Input v-model="newTagName" placeholder="请输入标签名" />
                                        </Col>
                                        <Col span="5" class="padding-left-10">
                                        <Button @click="createNewTag" long type="primary">确定</Button>
                                        </Col>
                                        <Col span="5" class="padding-left-10">
                                        <Button @click="cancelCreateNewTag" long type="ghost">取消</Button>
                                        </Col>
                                    </div>
                                </transition>
                            </Card>
                        </div>
                        <div class="margin-top-10">
                            <Card>
                                <p slot="title">
                                    <Icon type="key"></Icon>
                                    关键词
                                </p>
                                <Input v-model="KeyName" placeholder="请输入关键词，多个以顿号分割" />
                            </Card>
                        </div>
                        <div class="margin-top-10">
                            <Card>
                                <p slot="title">
                                    <Icon type="paper-airplane"></Icon>
                                    发布
                                </p>
                                <p class="margin-top-10">
                                    <Icon type="android-time"></Icon>&nbsp;&nbsp;状&nbsp;&nbsp;&nbsp; 态：
                                    <Select size="small" style="width:90px" v-model="articleState">
                                        <Option v-for="item in articleStateList" :value="item.value" :key="item.value">{{ item.lable }}</Option>
                                    </Select>
                                </p>
                                <p class="margin-top-10">
                                    <Checkbox v-show="currentOpenness === '公开'" v-model="isTop">在首页置顶这篇文章</Checkbox>
                                </p>
                                <p class="margin-top-10">
                                    <Checkbox v-show="currentOpenness === '公开'" v-model="isOrigin">是否为原创</Checkbox>
                                </p>
                                <Row class="margin-top-20 publish-button-con">
                                <span class="publish-button">
                                    <Button @click="handlePreview">预览</Button>
                                </span>
                                    <span class="publish-button">
                                    <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
                                </span>
                                </Row>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
    import axios from 'axios';
    import expandRow from '../table_expand.vue';
    import util from '../../libs/util';
    import tinymce from 'tinymce';

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
                    axios.get('Article/articleInfo', {
                        params: {
                            id: currentRow.aid
                        }
                    }).then(function (response) {
                        let res = response.data;
                        if (res.code === 1) {
                            vm.formItem.aid = res.data.aid;
                            vm.articleTitle = res.data.article_title;
                            vm.articleDesc = res.data.descr;
                            vm.KeyName = res.data.keyw;
                            vm.isTop = res.data.is_top;
                            vm.isOrigin = res.data.is_origin;
                            vm.showLink = true;
                            vm.articleState = res.data.is_show;
                            vm.modalSetting.show = true;
                            vm.modalSetting.index = index;
                            tinymce.get('articleEditor').setContent(res.data.body);
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
                    axios.get('ArticleDir/getDir', {
                        params: {
                            id: currentRow.aid
                        }
                    }).then(function (response) {
                        let res = response.data;
                        if (res.code === 1) {
                            vm.dirList = res.data.list;
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
                    axios.get('Tag/getSelectedTag', {
                        params: {
                            id: currentRow.aid
                        }
                    }).then(function (response) {
                        let res = response.data;
                        if (res.code === 1) {
                            vm.articleTagSelected = res.data;
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
        }, '编辑');
    };
    const deleteButton = (vm, h, currentRow, index) => {
        return h('Poptip', {
            props: {
                confirm: true,
                title: '您确定要删除这篇文章吗? ',
                transfer: true
            },
            on: {
                'on-ok': () => {
                    axios.get('Article/del', {
                        params: {
                            id: currentRow.aid
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
        name: 'articl',
        components: { expandRow },
        data () {
            return {
                // 文章编辑
                articleTitle: '',
                articleError: '',
                showLink: false,
                articleDesc: '',
                KeyName: '',
                fixedLink: '',
                articlePath: '',
                articlePathHasEdited: false,
                editLink: false,
                editPathButtonType: 'ghost',
                editPathButtonText: '编辑',
                articleStateList: [{lable: '公开', value: 1}, {lable: '隐藏', value: 0}],
                articleState: '',
                editOpenness: false,
                Openness: '公开',
                currentOpenness: '公开',
                isTop: true,
                isOrigin: true,
                publishTime: '',
                publishTimeType: 'immediately',
                editPublishTime: false, // 是否正在编辑发布时间
                articleTagSelected: [], // 文章选中的标签
                articleTagList: [], // 所有标签列表
                dirList: [],
                tagList: [],
                classificationSelected: [], // 在所有分类目录中选中的目录数组
                classificationFinalSelected: [], // 最后实际选择的目录
                publishLoading: false,
                addingNewTag: false, // 添加新标签
                newTagName: '', // 新建标签名
                // 文章列表
                columnsList: [
                    {
                        title: 'ID',
                        align: 'center',
                        key: 'aid',
                        width: 70
                    },
                    {
                        title: '栏目',
                        align: 'center',
                        key: 'category_name',
                        width: 90
                    },
                    {
                        title: '标题',
                        align: 'center',
                        key: 'article_title',
                        ellipsis: true
                    },
                    {
                        title: '作者',
                        align: 'center',
                        key: 'auth_name',
                        width: 100
                    },
                    {
                        title: '标签',
                        align: 'center',
                        key: 'tag_name',
                        width: 100
                    },
                    {
                        title: '原创',
                        align: 'center',
                        key: 'is_origin',
                        width: 60
                    },
                    {
                        title: '显示',
                        align: 'center',
                        key: 'is_show',
                        width: 60
                    },
                    {
                        title: '置顶',
                        align: 'center',
                        key: 'is_top',
                        width: 60
                    },
                    {
                        title: '发布时间',
                        align: 'center',
                        key: 'push_time',
                        width: 150
                    },
                    {
                        title: '操作',
                        align: 'center',
                        key: 'handle',
                        width: 170,
                        handle: ['delete']
                    }
                ],
                tableData: [],
                tableShow: {
                    currentPage: 1,
                    pageSize: 10,
                    listCount: 0
                },
                searchConf: {
                    type: '',
                    keywords: '',
                    status: ''
                },
                modalSetting: {
                    show: false,
                    loading: false,
                    index: 0
                },
                formItem: {
                    aid: '',
                    category_name: '',
                    article_title: '',
                    auth_name: '',
                    tag_name: '',
                    is_origin: '',
                    is_show: '',
                    is_top: ''
                },
                ruleValidate: {
                    article_title: [
                        { required: true, message: '文章名称不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        created () {
            this.init();
            this.getList();
            this.getDirList();
            this.getTagList();
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
                    if (item.key === 'push_time') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return util.formatDate(currentRowData.push_time, 'yyyy-MM-dd hh:mm:ss');
                        };
                    }
                    if (item.key === 'is_origin') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('i-switch', {
                                attrs: {
                                },
                                props: {
                                    'true-value': 1,
                                    'false-value': 0,
                                    value: currentRowData.is_origin
                                },
                                on: {
                                    'on-change': function (status) {
                                        axios.get('Article/changeOriginState', {
                                            params: {
                                                status: status,
                                                id: currentRowData.aid
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
                                }, 'on'),
                                h('span', {
                                    slot: 'close'
                                }, 'off')
                            ]);
                        };
                    }
                    if (item.key === 'is_show') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('i-switch', {
                                attrs: {
                                },
                                props: {
                                    'true-value': 1,
                                    'false-value': 0,
                                    value: currentRowData.is_show
                                },
                                on: {
                                    'on-change': function (status) {
                                        axios.get('Article/changeShowState', {
                                            params: {
                                                status: status,
                                                id: currentRowData.aid
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
                                }, 'on'),
                                h('span', {
                                    slot: 'close'
                                }, 'off')
                            ]);
                        };
                    }
                    if (item.key === 'is_top') {
                        item.render = (h, param) => {
                            let currentRowData = vm.tableData[param.index];
                            return h('i-switch', {
                                attrs: {
                                },
                                props: {
                                    'true-value': 1,
                                    'false-value': 0,
                                    value: currentRowData.is_top
                                },
                                on: {
                                    'on-change': function (status) {
                                        axios.get('Article/changeTopState', {
                                            params: {
                                                status: status,
                                                id: currentRowData.aid
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
                                }, 'on'),
                                h('span', {
                                    slot: 'close'
                                }, 'off')
                            ]);
                        };
                    }
                });
            },
            changePage (page) {
                this.tableShow.currentPage = page;
                this.getList();
            },
            changeSize (size) {
                this.tableShow.pageSize = size;
                this.getList();
            },
            search () {
                this.tableShow.currentPage = 1;
                this.getList();
            },
            getList () {
                let vm = this;
                axios.get('Article/lists', {
                    params: {
                        page: vm.tableShow.currentPage,
                        size: vm.tableShow.pageSize,
                        type: vm.searchConf.type,
                        keywords: vm.searchConf.keywords
                    }
                }).then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.tableData = res.data.list;
                        vm.tableShow.listCount = res.data.count;
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
            },
            getDirList () {
                let vm = this;
                axios.get('ArticleDir/getDir', {
                    params: {
                    }
                }).then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.dirList = res.data.list;
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
            },
            getTagList () {
                let vm = this;
                axios.get('Tag/lists', {
                    params: {
                    }
                }).then(function (response) {
                    let res = response.data;
                    if (res.code === 1) {
                        vm.tagList = res.data.list;
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
            },
            addArticle () {
                let vm = this;
                vm.formItem.aid = '';
                vm.articleTitle = '';
                vm.articleDesc = '';
                vm.KeyName = '';
                vm.isTop = false;
                vm.isOrigin = true;
                vm.showLink = true;
                vm.articleState = 1;
                vm.articleTagSelected = [];
                vm.getDirList();
                tinymce.get('articleEditor').setContent('');
                this.modalSetting.show = true;
            },
            doCancel (data) {
                if (!data) {
                    this.formItem.id = 0;
                    //this.$refs['myForm'].resetFields();
                    this.modalSetting.loading = false;
                    this.modalSetting.index = 0;
                }
            },
            cancel () {
                this.modalSetting.show = false;
            },
            // 编辑文章模态框
            handleArticletitleBlur () {
                if (this.articleTitle.length !== 0) {
                    // this.articleError = '';
                    localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
                    if (!this.articlePathHasEdited) {
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        this.fixedLink = window.location.host + '-' + year + '-' + month + '-' + day + '-';
                        this.articlePath = this.articleTitle;
                        this.articlePathHasEdited = true;
                        this.showLink = true;
                    }
                } else {
                    // this.articleError = '文章标题不可为空哦';
                    this.$Message.error('文章标题不可为空哦');
                }
            },
            editArticlePath () {
                this.editLink = !this.editLink;
                this.editPathButtonType = this.editPathButtonType === 'ghost' ? 'success' : 'ghost';
                this.editPathButtonText = this.editPathButtonText === '编辑' ? '完成' : '编辑';
            },
            handleEditOpenness () {
                this.editOpenness = !this.editOpenness;
            },
            handleSaveOpenness () {
                this.Openness = this.currentOpenness;
                this.editOpenness = false;
            },
            cancelEditOpenness () {
                this.currentOpenness = this.Openness;
                this.editOpenness = false;
            },
            handleAddNewTag () {
                this.addingNewTag = !this.addingNewTag;
            },
            createNewTag () {
                if (this.newTagName.length !== 0) {
                    let vm = this;
                    axios.post('Tag/addTag', {
                        tag_name: this.newTagName
                    }).then(function (response) {
                        let res = response.data;
                        if (res.code === 1) {
                            vm.tagList.push({
                                value: vm.newTagName,
                                tid: res.data.tid
                            });
                            vm.addingNewTag = false;
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
                } else {
                    this.$Message.error('请输入标签名');
                }
            },
            cancelCreateNewTag () {
                this.newTagName = '';
                this.addingNewTag = false;
            },
            canPublish () {
                if (this.articleTitle.length === 0) {
                    this.$Message.error('请输入文章标题');
                    return false;
                } else {
                    return true;
                }
            },
            handlePreview () {
                if (this.canPublish()) {
                    if (this.publishTimeType === 'immediately') {
                        let date = new Date();
                        let year = date.getFullYear();
                        let month = date.getMonth() + 1;
                        let day = date.getDate();
                        let hour = date.getHours();
                        let minute = date.getMinutes();
                        let second = date.getSeconds();
                        localStorage.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;
                    } else {
                        localStorage.publishTime = this.publishTime; // 本地存储发布时间
                    }
                    localStorage.content = tinymce.activeEditor.getContent();
                    this.$router.push({
                        name: 'preview'
                    });
                }
            },
            handlePublish () {
                let vm = this;
                if (this.canPublish()) {
                    this.publishLoading = true;
                    axios.post('Article/push', {
                        id: vm.formItem.aid,
                        title: vm.articleTitle,
                        desc: vm.articleDesc,
                        body: tinymce.get('articleEditor').getContent(),
                        category_id: vm.$refs.tree.getSelectedNodes()[0]['cid'],
                        tags: vm.articleTagSelected,
                        keyw: vm.KeyName,
                        is_show: vm.articleState,
                        is_top: vm.isTop,
                        is_origin: vm.isOrigin
                    }).then(function (response) {
                        let res = response.data;
                        vm.publishLoading = false;
                        if (res.code === 1) {
                            vm.$Notice.success({
                                title: '保存成功',
                                desc: '文章《' + vm.articleTitle + '》保存成功'
                            });
                            vm.modalSetting.show = false;
                        } else {
                            vm.$Notice.error({
                                title: '保存失败',
                                desc: '文章《' + vm.articleTitle + '》保存失败'
                            });
                            if (res.code === -14) {
                                vm.$store.commit('logout', vm);
                                vm.$router.push({
                                    name: 'login'
                                });
                            } else {
                                vm.$Message.error(res.msg);
                            }
                        }

                        vm.getList();
                    });
                }
            },
            handleSelectTag () {
                localStorage.tagsList = JSON.stringify(this.articleTagSelected); // 本地存储文章标签列表
            }
        },
        computed: {
            completeUrl () {
                let finalUrl = this.fixedLink + this.articlePath;
                localStorage.finalUrl = finalUrl; // 本地存储完整文章路径
                return finalUrl;
            }
        },
        mounted () {
            tinymce.init({
                selector: '#articleEditor',
                branding: false,
                elementpath: false,
                height: 525,
                language: 'zh_CN.GB2312',
                menubar: 'edit insert view format table tools',
                theme: 'modern',
                plugins: [
                    'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
                    'searchreplace visualblocks visualchars code fullscreen fullpage',
                    'insertdatetime media nonbreaking save table contextmenu directionality',
                    'emoticons paste textcolor colorpicker textpattern imagetools codesample'
                ],
                toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
                autosave_interval: '20s',
                image_advtab: true,
                table_default_styles: {
                    width: '100%',
                    borderCollapse: 'collapse'
                }
            });
        },
        destroyed () {
            tinymce.get('articleEditor').destroy();
        }
    };
</script>
