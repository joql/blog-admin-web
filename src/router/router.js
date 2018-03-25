import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error_404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error_page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error_403',
    component: () => import('@//views/error_page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error_500',
    component: () => import('@/views/error_page/500.vue')
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main_components/lock_screen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: {i18n: 'home'},
            name: 'home_index',
            component: () => import('@/views/home/home.vue')
        },
        {
            path: 'own',
            title: '个人中心',
            name: 'own_index',
            component: () => import('@/views/own/index.vue')
        },
        {
            path: 'request/:hash',
            title: '请求参数',
            name: 'interface_request',
            component: () => import('@/views/interface/request.vue')
        },
        {
            path: 'response/:hash',
            title: '返回参数',
            name: 'interface_response',
            component: () => import('@/views/interface/response.vue')
        },
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/system',
        icon: 'wrench',
        name: 'system',
        title: '系统配置',
        component: Main,
        children: [
            {
                path: 'siteInfo',
                icon: 'navicon-round',
                name: 'siteInfo',
                access: 'admin/Menu/index',
                title: '站点信息',
                component: () => import('@/views/system/siteInfo.vue')

            },{
                path: 'menu',
                icon: 'navicon-round',
                name: 'menu',
                access: 'admin/Menu/index',
                title: '菜单维护',
                component: () => import('@/views/system/menu.vue')

            },
            {
                path: 'log',
                icon: 'clipboard',
                name: 'log',
                access: 'admin/Log/index',
                title: '操作日志',
                component: () => import('@/views/system/log.vue')
            }
        ]
    },
    {
        path: "/users",
        icon: 'android-cloud',
        name: 'users',
        title: '用户管理',
        component: Main,
        children: [
            {
                path: 'user',
                icon: 'ios-people',
                name: 'user',
                access: 'admin/User/index',
                title: '用户管理',
                component: () => import('@/views/users/user.vue')
            },
            {
                path: 'auth',
                icon: 'locked',
                name: 'auth',
                access: 'admin/Auth/index',
                title: '权限管理',
                component: () => import('@/views/users/auth.vue')
            },
        ]
    },
    {
        path: "/content",
        icon: 'android-cloud',
        name: 'content',
        title: '内容',
        component: Main,
        children: [
            {
                path: 'article',
                icon: 'navicon-round',
                name: 'article',
                access: 'admin/Log/index',
                title: '文章',
                component: () => import('@/views/content/article.vue')
            },
            {
                path: 'comment',
                icon: 'ios-people',
                name: 'comment',
                access: 'admin/User/index',
                title: '评论',
                component: () => import('@/views/content/comment.vue')
            },
            {
                path: 'category',
                icon: 'ios-people',
                name: 'category',
                access: 'admin/User/index',
                title: '分类',
                component: () => import('@/views/content/category.vue')
            },
            {
                path: 'tag',
                icon: 'ios-people',
                name: 'tag',
                access: 'admin/User/index',
                title: '标签管理',
                component: () => import('@/views/content/tag.vue')
            }
        ]
    },
    {
        path: "/app",
        icon: "android-cloud",
        name: "app",
        title: "应用接入",
        component: Main,
        children: [
            {
                path: "group",
                icon: "ios-box",
                name: "app_group",
                access: 'admin/AppGroup/index',
                title: "应用分组",
                component: () => import('@/views/app/group.vue')
            },
            {
                path: "index",
                icon: "ios-list",
                name: "app_index",
                access: 'admin/App/index',
                title: "应用列表",
                component: () => import('@/views/app/list.vue')
            }
        ]
    },
    {
        path: "/interface",
        icon: "navigate",
        name: "interface",
        title: "接口管理",
        component: Main,
        children: [
            {
                path: "group",
                icon: "folder",
                name: "interface_group",
                access: 'admin/InterfaceGroup/index',
                title: "接口分组",
                component: () => import('@/views/interface/group.vue')
            },
            {
                path: "list",
                icon: "document",
                name: "interface_list",
                access: 'admin/InterfaceList/index',
                title: "接口列表",
                component: () => import('@/views/interface/list.vue')
            }
        ]
    },
    // {
    //     path: '/international',
    //     icon: 'earth',
    //     title: {i18n: 'international'},
    //     name: 'international',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'index',
    //             title: {i18n: 'international'},
    //             name: 'international_index',
    //             component: () => import('@/views/international/international.vue')
    //         }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
