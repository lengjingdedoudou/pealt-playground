# 项目介绍

**Vue 3 + Typescript + Vite**

## 目录结构

```
├── public                                       # 静态资源服务的文件夹
├── src
│   ├── app
│   │   ├── components                           # 全局自定义组件文件夹
│   │   ├── core                                 # 核心模块
│   │   │   ├── api                              # http请求文件夹，所有request应在此文件夹维护
│   │   │   │   └── types                        # 所有request的入参interface应在此文件夹维护
│   │   │   ├── config                           # 程序配置文件夹，所有全局性config应在此文件夹维护
│   │   │   ├── services
│   │   │   │   ├── cache                        # 缓存相关服务，所有localStorage等操作，都要通过该服务
│   │   │   │   └── http                         # http服务
│   │   │   ├── startup
│   │   │   │   └── preloader.ts                 # 初始化loading
│   │   │   └── core.module.ts                   # 核心模块文件
│   │   ├── layout                               # 通用布局
│   │   ├── routes
│   │   │   ├── **                               # 业务目录
│   │   │   ├── permission.ts                    # 业务路由拦截器
│   │   │   └── routes.module.ts                 # 业务路由注册口
│   │   └──  shared                              # 共享模块
│   │       ├── directive                        # vue指令
│   │       ├── filter                           # vue过滤器
│   │       ├── json-schema                      # 自定义表单schema
│   │       ├── sf-widget                        # 自定义表单小部件
│   │       ├── types                            # 所有interface 和 type在此文件夹维护（除api type）
│   │       └── utils                            # 公共方法
│   │
│   ├── assets                                   # 本地静态资源
│   ├── environments                             # 环境变量配置
│   ├── store                                    # vuex
│   ├── styles                                   # 样式目录
│   ├── typings                                  # 手动添加的类型
└── └── style.less                               # 样式引导入口
```
