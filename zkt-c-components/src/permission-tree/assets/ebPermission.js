export const ebPermissions = [
  {
      "menuId": 311,
      "parentId": 26,
      "menuName": "门店管理",
      "menuSubTitle": null,
      "permission": "eb_menu_311",
      "menuType": 1,
      "remarks": "是主店 && mis-酒店配置：开通新销售关系",
      "subList": []
  },
  {
      "menuId": 312,
      "parentId": 26,
      "menuName": "店铺管理",
      "menuSubTitle": null,
      "permission": "eb_menu_312",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 852,
              "parentId": 312,
              "menuName": "管理员（谨慎开启）",
              "menuSubTitle": null,
              "permission": "admin",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 310,
              "parentId": 312,
              "menuName": "概览",
              "menuSubTitle": null,
              "permission": "report_homepage",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 674,
              "parentId": 312,
              "menuName": "店铺装修",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 317,
                      "parentId": 674,
                      "menuName": "移动端风格设定",
                      "menuSubTitle": null,
                      "permission": "eb_menu_317",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 318,
                      "parentId": 674,
                      "menuName": "默认首页",
                      "menuSubTitle": null,
                      "permission": "eb_menu_318",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 321,
                      "parentId": 674,
                      "menuName": "会员中心设置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_321",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 320,
                      "parentId": 674,
                      "menuName": "图片管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_320",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-新版文件管理器",
                      "subList": []
                  },
                  {
                      "menuId": 316,
                      "parentId": 674,
                      "menuName": "模板商城",
                      "menuSubTitle": null,
                      "permission": "eb_menu_316",
                      "menuType": 1,
                      "remarks": "是管理员（zkt, mis跳过来的） ||  （mis酒店配置：预售券产品创建 && eb权限：创建预售券）\n原聚合海报",
                      "subList": []
                  },
                  {
                      "menuId": 314,
                      "parentId": 674,
                      "menuName": "微官网",
                      "menuSubTitle": null,
                      "permission": "homepage_manage",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启微官网new",
                      "subList": []
                  },
                  {
                      "menuId": 513,
                      "parentId": 674,
                      "menuName": "转赠产品包装",
                      "menuSubTitle": null,
                      "permission": "campaign_view",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-是否开通营销活动（大转盘）\neb权限：营销活动-查看",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 654,
              "parentId": 312,
              "menuName": "商户资质",
              "menuSubTitle": null,
              "permission": "eb_menu_654",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 650,
              "parentId": 312,
              "menuName": "商户信息",
              "menuSubTitle": null,
              "permission": "hotel_info",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 1044,
              "parentId": 312,
              "menuName": "商户声明",
              "menuSubTitle": null,
              "permission": "shop_statement",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 639,
              "parentId": 312,
              "menuName": "部门员工",
              "menuSubTitle": null,
              "permission": "admin",
              "menuType": 1,
              "remarks": "eb权限：核心功能-管理员管理",
              "subList": [
                  {
                      "menuId": 653,
                      "parentId": 639,
                      "menuName": "营业点管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_653",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 640,
                      "parentId": 639,
                      "menuName": "员工管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_640",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-是否“EB员工账号管理页2.0”禁用",
                      "subList": []
                  },
                  {
                      "menuId": 646,
                      "parentId": 639,
                      "menuName": "员工管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_646",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-是否“EB员工账号管理页2.0”启用",
                      "subList": []
                  },
                  {
                      "menuId": 641,
                      "parentId": 639,
                      "menuName": "代理管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_641",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 642,
                      "parentId": 639,
                      "menuName": "集团员工管理",
                      "menuSubTitle": null,
                      "permission": "admin",
                      "menuType": 1,
                      "remarks": "是主店\neb权限：核心功能-管理员管理",
                      "subList": []
                  },
                  {
                      "menuId": 643,
                      "parentId": 639,
                      "menuName": "集团代理管理",
                      "menuSubTitle": null,
                      "permission": "admin",
                      "menuType": 1,
                      "remarks": "是主店\neb权限：核心功能-管理员管理",
                      "subList": []
                  },
                  {
                      "menuId": 684,
                      "parentId": 639,
                      "menuName": "员工分配门店",
                      "menuSubTitle": null,
                      "permission": "all",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 644,
                      "parentId": 639,
                      "menuName": "代理团建设置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_644",
                      "menuType": 1,
                      "remarks": "已隐藏",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 895,
              "parentId": 312,
              "menuName": "小直用工",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 896,
                      "parentId": 895,
                      "menuName": "下载发薪模板",
                      "menuSubTitle": null,
                      "permission": "finance_downloadsalarytemplate",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 897,
                      "parentId": 895,
                      "menuName": "上传发薪明细",
                      "menuSubTitle": null,
                      "permission": "finance_uploadsalarydetai",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 714,
              "parentId": 312,
              "menuName": "用户发票管理",
              "menuSubTitle": null,
              "permission": "invoice_useless",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 663,
              "parentId": 312,
              "menuName": "奖励管理",
              "menuSubTitle": null,
              "permission": "eb_menu_663",
              "menuType": 1,
              "remarks": null,
              "subList": [
                  {
                      "menuId": 664,
                      "parentId": 663,
                      "menuName": "奖励查询",
                      "menuSubTitle": null,
                      "permission": "eb_menu_664",
                      "menuType": 1,
                      "remarks": "mis酒店配置：奖励配置-是否允许员工查询订单奖励\n或者 是zkt用户",
                      "subList": []
                  },
                  {
                      "menuId": 665,
                      "parentId": 663,
                      "menuName": "领取奖励",
                      "menuSubTitle": null,
                      "permission": "eb_menu_665",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 915,
                      "parentId": 663,
                      "menuName": "奖励规则配置",
                      "menuSubTitle": null,
                      "permission": "finance_reward_ruleset",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 319,
              "parentId": 312,
              "menuName": "广告管理",
              "menuSubTitle": null,
              "permission": "eb_menu_319",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 562,
              "parentId": 312,
              "menuName": "拜访记录",
              "menuSubTitle": null,
              "permission": "report_channel_visit_history",
              "menuType": 1,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 347,
      "parentId": 26,
      "menuName": "预售券",
      "menuSubTitle": null,
      "permission": "ticket_product||ticket_list||use_ticket",
      "menuType": 1,
      "remarks": "eb权限：预售券-预售券产品管理 || 预售券-预售券列表 || 预售券-预售券管理(验券,退款等)",
      "subList": [
          {
              "menuId": 348,
              "parentId": 347,
              "menuName": "产品管理",
              "menuSubTitle": null,
              "permission": "eb_menu_348",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 866,
                      "parentId": 348,
                      "menuName": "限制预订当天是否可用",
                      "menuSubTitle": null,
                      "permission": "ticket_usable_intraday_time",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 349,
                      "parentId": 348,
                      "menuName": "常规产品",
                      "menuSubTitle": null,
                      "permission": "",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 869,
                              "parentId": 349,
                              "menuName": "预售券产品管理",
                              "menuSubTitle": null,
                              "permission": "ticket_product",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 855,
                              "parentId": 349,
                              "menuName": "鹰眼",
                              "menuSubTitle": null,
                              "permission": "report_ticket_eagleeye",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 856,
                              "parentId": 349,
                              "menuName": "短信卖货",
                              "menuSubTitle": null,
                              "permission": "ticket_sale_buy_sms",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 857,
                              "parentId": 349,
                              "menuName": "产品批量修改",
                              "menuSubTitle": null,
                              "permission": "ticket_product_batch_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 858,
                              "parentId": 349,
                              "menuName": "产品海报批量修改",
                              "menuSubTitle": null,
                              "permission": "batch_update_product_poster_template",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 865,
                              "parentId": 349,
                              "menuName": "创建预售券",
                              "menuSubTitle": null,
                              "permission": "create_ticket_product",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 867,
                      "parentId": 348,
                      "menuName": "预售券产品审核",
                      "menuSubTitle": null,
                      "permission": "ticket_product_check",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 350,
                      "parentId": 348,
                      "menuName": "赠券产品",
                      "menuSubTitle": null,
                      "permission": "eb_menu_350",
                      "menuType": 1,
                      "remarks": "原 预售券赠券\nmis酒店配置：预售券-开通预售券赠券（开关隐藏，默认开通）",
                      "subList": []
                  },
                  {
                      "menuId": 351,
                      "parentId": 348,
                      "menuName": "组合子产品",
                      "menuSubTitle": null,
                      "permission": "ticket_product",
                      "menuType": 1,
                      "remarks": "eb权限：预售券-预售券产品管理",
                      "subList": []
                  },
                  {
                      "menuId": 352,
                      "parentId": 348,
                      "menuName": "组合产品管理",
                      "menuSubTitle": null,
                      "permission": "ticket_product",
                      "menuType": 1,
                      "remarks": "eb权限：预售券-预售券产品管理",
                      "subList": []
                  },
                  {
                      "menuId": 355,
                      "parentId": 348,
                      "menuName": "预约库存",
                      "menuSubTitle": null,
                      "permission": "ticket_appointment_inventory",
                      "menuType": 1,
                      "remarks": "原 预售券房态",
                      "subList": []
                  },
                  {
                      "menuId": 353,
                      "parentId": 348,
                      "menuName": "预约升级产品",
                      "menuSubTitle": null,
                      "permission": "eb_menu_353",
                      "menuType": 1,
                      "remarks": "权限：用户类型不是酒店  \n（$_SESSION['user']['user_type'] != 'hotel'）",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 382,
              "parentId": 347,
              "menuName": "预售券核券",
              "menuSubTitle": null,
              "permission": "use_ticket",
              "menuType": 1,
              "remarks": "eb权限：预售券-预售券管理(验券,退款等)",
              "subList": []
          },
          {
              "menuId": 357,
              "parentId": 347,
              "menuName": "预售券订单",
              "menuSubTitle": null,
              "permission": "ticket_list",
              "menuType": 1,
              "remarks": "eb权限：预售券-预售券列表",
              "subList": [
                  {
                      "menuId": 862,
                      "parentId": 357,
                      "menuName": "查看",
                      "menuSubTitle": null,
                      "permission": "ticket_list",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 859,
                      "parentId": 357,
                      "menuName": "强制退款",
                      "menuSubTitle": null,
                      "permission": "ticket_force_refund",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 860,
                      "parentId": 357,
                      "menuName": "强制核销",
                      "menuSubTitle": null,
                      "permission": "force_use_ticket",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 861,
                      "parentId": 357,
                      "menuName": "下载",
                      "menuSubTitle": null,
                      "permission": "ticket_download",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 863,
                      "parentId": 357,
                      "menuName": "根据订单号查询券号",
                      "menuSubTitle": null,
                      "permission": "ticket_show_order",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 864,
                      "parentId": 357,
                      "menuName": "验券",
                      "menuSubTitle": null,
                      "permission": "use_ticket",
                      "menuType": 2,
                      "remarks": "预售券验券",
                      "subList": []
                  },
                  {
                      "menuId": 935,
                      "parentId": 357,
                      "menuName": "退款",
                      "menuSubTitle": null,
                      "permission": "refund_ticket",
                      "menuType": 2,
                      "remarks": "预售券退款",
                      "subList": []
                  },
                  {
                      "menuId": 358,
                      "parentId": 357,
                      "menuName": "全部",
                      "menuSubTitle": null,
                      "permission": "eb_menu_358",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 359,
                      "parentId": 357,
                      "menuName": "待预约",
                      "menuSubTitle": null,
                      "permission": "eb_menu_359",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程",
                      "subList": []
                  },
                  {
                      "menuId": 360,
                      "parentId": 357,
                      "menuName": "预约中",
                      "menuSubTitle": null,
                      "permission": "eb_menu_360",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 361,
                      "parentId": 357,
                      "menuName": "待使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_361",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 362,
                      "parentId": 357,
                      "menuName": "待使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_362",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程 关闭\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 363,
                      "parentId": 357,
                      "menuName": "已预约未使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_363",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程 关闭\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 364,
                      "parentId": 357,
                      "menuName": "已使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_364",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 365,
                      "parentId": 357,
                      "menuName": "已过期",
                      "menuSubTitle": null,
                      "permission": "eb_menu_365",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 366,
                      "parentId": 357,
                      "menuName": "已退款",
                      "menuSubTitle": null,
                      "permission": "eb_menu_366",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 767,
                      "parentId": 357,
                      "menuName": "通用券列表",
                      "menuSubTitle": null,
                      "permission": "ticket_list",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 368,
                      "parentId": 357,
                      "menuName": "转赠列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_368",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 369,
                      "parentId": 357,
                      "menuName": "转让列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_369",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 675,
              "parentId": 347,
              "menuName": "预售设置",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 356,
                      "parentId": 675,
                      "menuName": "产品分类",
                      "menuSubTitle": null,
                      "permission": "eb_menu_356",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 854,
                              "parentId": 356,
                              "menuName": "编辑,删除,隐藏",
                              "menuSubTitle": null,
                              "permission": "ticket_classify_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 715,
                      "parentId": 675,
                      "menuName": "产品促销标签",
                      "menuSubTitle": null,
                      "permission": "",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 853,
                              "parentId": 715,
                              "menuName": "编辑,删除,隐藏",
                              "menuSubTitle": null,
                              "permission": "ticket_promotionLabel_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 666,
                      "parentId": 675,
                      "menuName": "奖励设置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_666",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 669,
                      "parentId": 675,
                      "menuName": "邮费配置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_669",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 670,
                      "parentId": 675,
                      "menuName": "对接快递",
                      "menuSubTitle": null,
                      "permission": "eb_menu_670",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 676,
              "parentId": 347,
              "menuName": "销售配置",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 390,
                      "parentId": 676,
                      "menuName": "关联产品",
                      "menuSubTitle": null,
                      "permission": "ticket_product",
                      "menuType": 1,
                      "remarks": "eb权限：预售券-预售券产品管理",
                      "subList": []
                  },
                  {
                      "menuId": 389,
                      "parentId": 676,
                      "menuName": "产品推荐",
                      "menuSubTitle": null,
                      "permission": "eb_menu_389",
                      "menuType": 1,
                      "remarks": "mis-酒店配置：预售券-是否开通详情页推荐",
                      "subList": []
                  },
                  {
                      "menuId": 391,
                      "parentId": 676,
                      "menuName": "默认海报模版",
                      "menuSubTitle": null,
                      "permission": "default_product_poster_template",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 868,
                              "parentId": 391,
                              "menuName": "默认海报模板更换",
                              "menuSubTitle": null,
                              "permission": "default_product_poster_template",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  }
              ]
          },
          {
              "menuId": 384,
              "parentId": 347,
              "menuName": "预售券定金列表",
              "menuSubTitle": null,
              "permission": "eb_menu_384",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 383,
              "parentId": 347,
              "menuName": "补发券号",
              "menuSubTitle": null,
              "permission": "ticket_list",
              "menuType": 1,
              "remarks": "eb权限：预售券-预售券列表",
              "subList": []
          },
          {
              "menuId": 385,
              "parentId": 347,
              "menuName": "批量修改",
              "menuSubTitle": null,
              "permission": "ticket_product||ticket_list||use_ticket",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 387,
                      "parentId": 385,
                      "menuName": "已售券单张延期",
                      "menuSubTitle": null,
                      "permission": "ticket_delay_sell_code",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 386,
                      "parentId": 385,
                      "menuName": "已售券批量延期",
                      "menuSubTitle": null,
                      "permission": "ticket_delay_sell_product",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 388,
                      "parentId": 385,
                      "menuName": "批量强制退款",
                      "menuSubTitle": null,
                      "permission": "batch_refund_tickets",
                      "menuType": 1,
                      "remarks": "eb权限：预售券-批量强制退款",
                      "subList": []
                  },
                  {
                      "menuId": 1032,
                      "parentId": 385,
                      "menuName": "批量核销",
                      "menuSubTitle": null,
                      "permission": "eb_batch_force_use_ticket",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 370,
              "parentId": 347,
              "menuName": "集团预售券订单",
              "menuSubTitle": null,
              "permission": "brand_ticket_list",
              "menuType": 1,
              "remarks": "mis酒店配置：集团-集团预售券显示\neb权限：预售券-集团预售券列表",
              "subList": [
                  {
                      "menuId": 381,
                      "parentId": 370,
                      "menuName": "全部",
                      "menuSubTitle": null,
                      "permission": "eb_menu_381",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 372,
                      "parentId": 370,
                      "menuName": "待使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_372",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程 关闭\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 373,
                      "parentId": 370,
                      "menuName": "待预约",
                      "menuSubTitle": null,
                      "permission": "eb_menu_373",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 374,
                      "parentId": 370,
                      "menuName": "预约中",
                      "menuSubTitle": null,
                      "permission": "eb_menu_374",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 375,
                      "parentId": 370,
                      "menuName": "待使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_375",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 376,
                      "parentId": 370,
                      "menuName": "已预约未使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_376",
                      "menuType": 1,
                      "remarks": "mis酒店配置：预售券-是否开启新核销流程 关闭\n（开关已隐藏 默认开启）",
                      "subList": []
                  },
                  {
                      "menuId": 377,
                      "parentId": 370,
                      "menuName": "已使用",
                      "menuSubTitle": null,
                      "permission": "eb_menu_377",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 378,
                      "parentId": 370,
                      "menuName": "已过期",
                      "menuSubTitle": null,
                      "permission": "eb_menu_378",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 379,
                      "parentId": 370,
                      "menuName": "已退款",
                      "menuSubTitle": null,
                      "permission": "eb_menu_379",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 380,
              "parentId": 347,
              "menuName": "门店预售券审核",
              "menuSubTitle": null,
              "permission": "brand_product_audit_view",
              "menuType": 1,
              "remarks": "eb权限：门店产品审核-查看",
              "subList": []
          }
      ]
  },
  {
      "menuId": 689,
      "parentId": 26,
      "menuName": "卡类商品",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 392,
              "parentId": 689,
              "menuName": "储值卡",
              "menuSubTitle": null,
              "permission": "prepay_card_view||prepay_card_deposit||prepay_card_charge||prepay_card_audit||prepay_card_product_edit",
              "menuType": 1,
              "remarks": "mis酒店配置：储值卡配置-开通储值卡\neb权限：储值卡权限下：查询  ||  充值  ||  扣款 ||  对账  ||  充值配置",
              "subList": [
                  {
                      "menuId": 393,
                      "parentId": 392,
                      "menuName": "储值卡创建",
                      "menuSubTitle": null,
                      "permission": "prepay_card_view",
                      "menuType": 1,
                      "remarks": "mis酒店配置：储值卡配置-分类储值卡开关\neb权限：储值卡权限-查询",
                      "subList": []
                  },
                  {
                      "menuId": 394,
                      "parentId": 392,
                      "menuName": "储值卡配置",
                      "menuSubTitle": null,
                      "permission": "prepay_card_product_edit&&prepay_card_view",
                      "menuType": 1,
                      "remarks": "eb权限：储值卡权限：查询  &&  充值配置 ",
                      "subList": []
                  },
                  {
                      "menuId": 395,
                      "parentId": 392,
                      "menuName": "储值卡管理",
                      "menuSubTitle": null,
                      "permission": "prepay_card_view",
                      "menuType": 1,
                      "remarks": "eb权限：储值卡权限：查询",
                      "subList": []
                  },
                  {
                      "menuId": 396,
                      "parentId": 392,
                      "menuName": "储值卡对账",
                      "menuSubTitle": null,
                      "permission": "prepay_card_audit&&prepay_card_view",
                      "menuType": 1,
                      "remarks": "eb权限：储值卡权限：查询  &&  对账",
                      "subList": []
                  },
                  {
                      "menuId": 397,
                      "parentId": 392,
                      "menuName": "直连对账表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_397",
                      "menuType": 1,
                      "remarks": "开通储值卡直连",
                      "subList": []
                  },
                  {
                      "menuId": 399,
                      "parentId": 392,
                      "menuName": "转赠列表",
                      "menuSubTitle": null,
                      "permission": "prepay_card_audit",
                      "menuType": 1,
                      "remarks": "eb权限：储值卡权限-对账/明细",
                      "subList": []
                  },
                  {
                      "menuId": 400,
                      "parentId": 392,
                      "menuName": "储值卡导入",
                      "menuSubTitle": null,
                      "permission": "prepay_card_3part",
                      "menuType": 1,
                      "remarks": "mis酒店配置：储值卡配置-储值卡导入",
                      "subList": []
                  },
                  {
                      "menuId": 401,
                      "parentId": 392,
                      "menuName": "礼品卡",
                      "menuSubTitle": null,
                      "permission": "prepay_card_view&&prepay_card_send",
                      "menuType": 1,
                      "remarks": "非储值卡直连\n酒店是单店自营或集团主店\neb权限：储值卡权限下：查询  &&  发卡\nmis酒店配置：储值卡配置-后台发卡",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 402,
              "parentId": 689,
              "menuName": "权益卡",
              "menuSubTitle": null,
              "permission": "equity_view",
              "menuType": 1,
              "remarks": "eb员工权限：权益卡-查询产品与用户",
              "subList": [
                  {
                      "menuId": 403,
                      "parentId": 402,
                      "menuName": "产品列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_403",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 807,
                              "parentId": 403,
                              "menuName": "编辑产品与用户",
                              "menuSubTitle": null,
                              "permission": "equity_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 806,
                              "parentId": 403,
                              "menuName": "查询产品与用户",
                              "menuSubTitle": null,
                              "permission": "equity_view",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 810,
                              "parentId": 403,
                              "menuName": "卡片配置",
                              "menuSubTitle": null,
                              "permission": "equity_config",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 811,
                              "parentId": 403,
                              "menuName": "退款",
                              "menuSubTitle": null,
                              "permission": "equity_refund",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 404,
                      "parentId": 402,
                      "menuName": "购卡记录",
                      "menuSubTitle": null,
                      "permission": "eb_menu_404",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 406,
                      "parentId": 402,
                      "menuName": "赠送权益记录",
                      "menuSubTitle": null,
                      "permission": "equity_give",
                      "menuType": 1,
                      "remarks": "eb权限：权益卡-查询赠送产品",
                      "subList": [
                          {
                              "menuId": 809,
                              "parentId": 406,
                              "menuName": "查询赠送产品",
                              "menuSubTitle": null,
                              "permission": "equity_give",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 405,
                      "parentId": 402,
                      "menuName": "核销记录",
                      "menuSubTitle": null,
                      "permission": "equity_write_off",
                      "menuType": 1,
                      "remarks": "eb权限：权益卡-核销",
                      "subList": [
                          {
                              "menuId": 808,
                              "parentId": 405,
                              "menuName": "核销",
                              "menuSubTitle": null,
                              "permission": "equity_write_off",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 711,
                      "parentId": 402,
                      "menuName": "权益卡延期",
                      "menuSubTitle": null,
                      "permission": "equity_view",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 407,
                      "parentId": 402,
                      "menuName": "分销导购设置",
                      "menuSubTitle": null,
                      "permission": "equity_config",
                      "menuType": 1,
                      "remarks": "eb权限：权益卡-卡片配置",
                      "subList": []
                  },
                  {
                      "menuId": 873,
                      "parentId": 402,
                      "menuName": "实体卡列表",
                      "menuSubTitle": null,
                      "permission": "physical_card_list",
                      "menuType": 1,
                      "remarks": "控制整个实体卡列表显示不显示",
                      "subList": [
                          {
                              "menuId": 892,
                              "parentId": 873,
                              "menuName": "新增实体卡",
                              "menuSubTitle": null,
                              "permission": "physical_card_add",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 893,
                              "parentId": 873,
                              "menuName": "下载实体卡",
                              "menuSubTitle": null,
                              "permission": "physical_card_download",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 874,
                      "parentId": 402,
                      "menuName": "实体卡出库",
                      "menuSubTitle": null,
                      "permission": "physical_delivery_list",
                      "menuType": 1,
                      "remarks": "控制实体卡出库列表显示不显示",
                      "subList": [
                          {
                              "menuId": 894,
                              "parentId": 874,
                              "menuName": "操作（含批量出库）",
                              "menuSubTitle": null,
                              "permission": "physical_delivery_action",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  }
              ]
          },
          {
              "menuId": 408,
              "parentId": 689,
              "menuName": "有效期卡",
              "menuSubTitle": null,
              "permission": "ecard_view",
              "menuType": 1,
              "remarks": "eb员工权限：有效期卡-查询\nmis酒店配置：默认-电子卡券功能 开启",
              "subList": [
                  {
                      "menuId": 409,
                      "parentId": 408,
                      "menuName": "产品列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_409",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 800,
                              "parentId": 409,
                              "menuName": "编辑",
                              "menuSubTitle": null,
                              "permission": "ecard_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 799,
                              "parentId": 409,
                              "menuName": "查询",
                              "menuSubTitle": null,
                              "permission": "ecard_view",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 1023,
                              "parentId": 409,
                              "menuName": "强制退款",
                              "menuSubTitle": null,
                              "permission": "valid_refund",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 410,
                      "parentId": 408,
                      "menuName": "用户列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_410",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 411,
                      "parentId": 408,
                      "menuName": "预约库存",
                      "menuSubTitle": null,
                      "permission": "ecard_update",
                      "menuType": 1,
                      "remarks": "有效期卡编辑权限",
                      "subList": []
                  },
                  {
                      "menuId": 412,
                      "parentId": 408,
                      "menuName": "预约管理",
                      "menuSubTitle": null,
                      "permission": "ecard_write_off",
                      "menuType": 1,
                      "remarks": "有效期卡核销权限",
                      "subList": []
                  },
                  {
                      "menuId": 413,
                      "parentId": 408,
                      "menuName": "有效期卡配置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_413",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 414,
                      "parentId": 408,
                      "menuName": "核销记录",
                      "menuSubTitle": null,
                      "permission": "ecard_write_off",
                      "menuType": 1,
                      "remarks": "eb权限：有效期卡-核销",
                      "subList": [
                          {
                              "menuId": 801,
                              "parentId": 414,
                              "menuName": "核销",
                              "menuSubTitle": null,
                              "permission": "ecard_write_off",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 415,
                      "parentId": 408,
                      "menuName": "履约数据",
                      "menuSubTitle": null,
                      "permission": "eb_menu_415",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 734,
                      "parentId": 408,
                      "menuName": "有效期卡延期",
                      "menuSubTitle": null,
                      "permission": "validcard_delay_view",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 804,
                              "parentId": 734,
                              "menuName": "查看",
                              "menuSubTitle": null,
                              "permission": "validcard_delay_view",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 803,
                              "parentId": 734,
                              "menuName": "编辑",
                              "menuSubTitle": null,
                              "permission": "validcard_delay_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  }
              ]
          },
          {
              "menuId": 697,
              "parentId": 689,
              "menuName": "会员卡",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 367,
                      "parentId": 697,
                      "menuName": "会员卡券列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_367",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-是否开启售卖会员卡产品",
                      "subList": []
                  },
                  {
                      "menuId": 471,
                      "parentId": 697,
                      "menuName": "会员卡信息",
                      "menuSubTitle": null,
                      "permission": "eb_menu_471",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 322,
      "parentId": 26,
      "menuName": "客房预订",
      "menuSubTitle": null,
      "permission": "eb_menu_322",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 323,
              "parentId": 322,
              "menuName": "客房订单",
              "menuSubTitle": null,
              "permission": "confirm_checkin_checkout||refuse||cancel||checkout",
              "menuType": 1,
              "remarks": "eb权限：日历房-订单 确认/入住  ||  日历房-拒单  ||  日历房-订单取消  ||  日历房-结账 ",
              "subList": [
                  {
                      "menuId": 844,
                      "parentId": 323,
                      "menuName": "订单确认入住",
                      "menuSubTitle": null,
                      "permission": "confirm_checkin_checkout",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 845,
                      "parentId": 323,
                      "menuName": "结账",
                      "menuSubTitle": null,
                      "permission": "checkout",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 846,
                      "parentId": 323,
                      "menuName": "拒单",
                      "menuSubTitle": null,
                      "permission": "refuse",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 847,
                      "parentId": 323,
                      "menuName": "订单取消",
                      "menuSubTitle": null,
                      "permission": "cancel",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 848,
                      "parentId": 323,
                      "menuName": "订单下载",
                      "menuSubTitle": null,
                      "permission": "order_download",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 849,
                      "parentId": 323,
                      "menuName": "订单修改",
                      "menuSubTitle": null,
                      "permission": "order_price_reduce",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 850,
                      "parentId": 323,
                      "menuName": "强制退款",
                      "menuSubTitle": null,
                      "permission": "room_order_force_refund",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 324,
                      "parentId": 323,
                      "menuName": "客房订单",
                      "menuSubTitle": null,
                      "permission": "confirm_checkin_checkout||refuse||cancel||checkout",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 336,
              "parentId": 322,
              "menuName": "房态房价",
              "menuSubTitle": null,
              "permission": "product||price||status",
              "menuType": 1,
              "remarks": "eb权限：重要功能-促销维护 || 日历房-房价 || 日历房-房态",
              "subList": [
                  {
                      "menuId": 2424,
                      "parentId": 336,
                      "menuName": "批量修改房态",
                      "menuSubTitle": null,
                      "permission": "status",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 2425,
                      "parentId": 336,
                      "menuName": "批量修改房价",
                      "menuSubTitle": null,
                      "permission": "price",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 2426,
                      "parentId": 336,
                      "menuName": "批量修改房量",
                      "menuSubTitle": null,
                      "permission": "room_amount",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 331,
              "parentId": 322,
              "menuName": "预订设置",
              "menuSubTitle": null,
              "permission": "product||price||status",
              "menuType": 1,
              "remarks": "eb权限：重要功能-促销维护 || 日历房-房价 || 日历房-房态",
              "subList": [
                  {
                      "menuId": 652,
                      "parentId": 331,
                      "menuName": "房型信息",
                      "menuSubTitle": null,
                      "permission": "eb_menu_652",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 651,
                      "parentId": 331,
                      "menuName": "商户图片",
                      "menuSubTitle": null,
                      "permission": "eb_menu_651",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 332,
                      "parentId": 331,
                      "menuName": "会员差价管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_332",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 334,
                      "parentId": 331,
                      "menuName": "房价代码维护",
                      "menuSubTitle": null,
                      "permission": "product",
                      "menuType": 1,
                      "remarks": "eb权限：重要功能-促销维护",
                      "subList": []
                  },
                  {
                      "menuId": 335,
                      "parentId": 331,
                      "menuName": "标签管理",
                      "menuSubTitle": null,
                      "permission": "room_label",
                      "menuType": 1,
                      "remarks": "eb员工权限：日历房-标签管理",
                      "subList": []
                  },
                  {
                      "menuId": 999,
                      "parentId": 331,
                      "menuName": "标签管理",
                      "menuSubTitle": null,
                      "permission": "room_label",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 346,
                      "parentId": 331,
                      "menuName": "搭售预售券",
                      "menuSubTitle": null,
                      "permission": "eb_menu_346",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 340,
              "parentId": 322,
              "menuName": "奖励设置",
              "menuSubTitle": null,
              "permission": "order_bonus_config",
              "menuType": 1,
              "remarks": "eb员工权限：重要功能-客房奖励配置\n酒店配置：日历房配置-客房支持代理推广（已隐藏默认开启）",
              "subList": [
                  {
                      "menuId": 341,
                      "parentId": 340,
                      "menuName": "员工营销费",
                      "menuSubTitle": null,
                      "permission": "order_bonus_config",
                      "menuType": 1,
                      "remarks": "mis酒店配置：奖励配置-开通客房奖励配置\neb权限：重要功能-客房奖励配置",
                      "subList": []
                  },
                  {
                      "menuId": 342,
                      "parentId": 340,
                      "menuName": "代理营销费",
                      "menuSubTitle": null,
                      "permission": "eb_menu_342",
                      "menuType": 1,
                      "remarks": "mis酒店配置：日历房-客房支持代理推广",
                      "subList": []
                  },
                  {
                      "menuId": 343,
                      "parentId": 340,
                      "menuName": "消费者奖励",
                      "menuSubTitle": null,
                      "permission": "eb_menu_343",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 344,
                      "parentId": 340,
                      "menuName": "奖励系数",
                      "menuSubTitle": null,
                      "permission": "eb_menu_344",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 327,
              "parentId": 322,
              "menuName": "集团客房订单",
              "menuSubTitle": null,
              "permission": "brand_order",
              "menuType": 1,
              "remarks": "eb权限：核心功能-所有订单  并且 \n集团类型 （brand_type） ： 'brand'\n集团订单（deal_orders）：‘brand'  （这两项可在 小工具-集团管理：品牌类型和集团订单 查看设置）",
              "subList": [
                  {
                      "menuId": 328,
                      "parentId": 327,
                      "menuName": "集团客房订单",
                      "menuSubTitle": null,
                      "permission": "brand_order",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 345,
              "parentId": 322,
              "menuName": "预约发票",
              "menuSubTitle": null,
              "permission": "invoice_view",
              "menuType": 1,
              "remarks": "eb权限：退房/发票预约-查询\nmis酒店配置：日历房-是否开启预约发票\n",
              "subList": []
          }
      ]
  },
  {
      "menuId": 875,
      "parentId": 26,
      "menuName": "客房套餐",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 879,
              "parentId": 875,
              "menuName": "套餐管理",
              "menuSubTitle": null,
              "permission": "room_package_management",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 880,
              "parentId": 875,
              "menuName": "订单管理",
              "menuSubTitle": null,
              "permission": "room_package_order",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 877,
              "parentId": 875,
              "menuName": "房价代码维护",
              "menuSubTitle": null,
              "permission": "room_package_product",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 889,
              "parentId": 875,
              "menuName": "房价代码维护",
              "menuSubTitle": null,
              "permission": "room_package_product",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 878,
              "parentId": 875,
              "menuName": "房价房态设置",
              "menuSubTitle": null,
              "permission": "room_package_state",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 876,
              "parentId": 875,
              "menuName": "房型信息",
              "menuSubTitle": null,
              "permission": "room_package_information",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 888,
              "parentId": 875,
              "menuName": "订单管理",
              "menuSubTitle": null,
              "permission": "room_package_order",
              "menuType": 1,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 416,
      "parentId": 26,
      "menuName": "餐饮预订",
      "menuSubTitle": null,
      "permission": "eb_menu_416",
      "menuType": 1,
      "remarks": "mis酒店配置：订餐-开通订餐",
      "subList": [
          {
              "menuId": 679,
              "parentId": 416,
              "menuName": "订餐设置",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 417,
                      "parentId": 679,
                      "menuName": "餐厅设置",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "eb权限：订餐权限-菜单产品创建",
                      "subList": []
                  },
                  {
                      "menuId": 2439,
                      "parentId": 679,
                      "menuName": "餐厅设置",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 418,
                      "parentId": 679,
                      "menuName": "分销奖励设置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_418",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 424,
                      "parentId": 679,
                      "menuName": "二维码生成",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "eb权限：订餐权限-菜单产品创建",
                      "subList": []
                  },
                  {
                      "menuId": 913,
                      "parentId": 679,
                      "menuName": "二维码生成",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "eb权限：订餐权限-菜单产品创建",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 419,
              "parentId": 416,
              "menuName": "菜品设置",
              "menuSubTitle": null,
              "permission": "restaurant_create",
              "menuType": 1,
              "remarks": null,
              "subList": [
                  {
                      "menuId": 420,
                      "parentId": 419,
                      "menuName": "菜品分类",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "eb权限：订餐权限-菜单产品创建",
                      "subList": []
                  },
                  {
                      "menuId": 421,
                      "parentId": 419,
                      "menuName": "菜品管理",
                      "menuSubTitle": null,
                      "permission": "restaurant_create",
                      "menuType": 1,
                      "remarks": "eb权限：订餐权限-菜单产品创建",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 2441,
              "parentId": 416,
              "menuName": "菜品管理",
              "menuSubTitle": null,
              "permission": "restaurant_create",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 422,
              "parentId": 416,
              "menuName": "订单管理",
              "menuSubTitle": null,
              "permission": "restaurant_order",
              "menuType": 1,
              "remarks": "eb权限：订餐权限-订单管理",
              "subList": [
                  {
                      "menuId": 2482,
                      "parentId": 422,
                      "menuName": "订餐订单退款",
                      "menuSubTitle": null,
                      "permission": "restaurant_order_refund",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 423,
              "parentId": 416,
              "menuName": "预约订座管理",
              "menuSubTitle": null,
              "permission": "restaurant_create",
              "menuType": 1,
              "remarks": "eb权限：订餐权限-菜单产品创建",
              "subList": []
          }
      ]
  },
  {
      "menuId": 425,
      "parentId": 26,
      "menuName": "景区门票",
      "menuSubTitle": null,
      "permission": "pass_view",
      "menuType": 1,
      "remarks": "mis酒店配置：景区门票-开通景区门票",
      "subList": [
          {
              "menuId": 426,
              "parentId": 425,
              "menuName": "景区信息",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 427,
              "parentId": 425,
              "menuName": "景点信息",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 428,
              "parentId": 425,
              "menuName": "景区票型设置",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 429,
              "parentId": 425,
              "menuName": "景区产品设置",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 430,
              "parentId": 425,
              "menuName": "地理围栏",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 431,
              "parentId": 425,
              "menuName": "景区每日库存",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": []
          },
          {
              "menuId": 432,
              "parentId": 425,
              "menuName": "景区订单管理",
              "menuSubTitle": null,
              "permission": "pass_view||pass_update||pass_create",
              "menuType": 1,
              "remarks": "eb权限：景区：查看 || 更新 || 创建",
              "subList": [
                  {
                      "menuId": 812,
                      "parentId": 432,
                      "menuName": "更新",
                      "menuSubTitle": null,
                      "permission": "pass_update",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 813,
                      "parentId": 432,
                      "menuName": "创建",
                      "menuSubTitle": null,
                      "permission": "pass_create",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 777,
                      "parentId": 432,
                      "menuName": "强制退款",
                      "menuSubTitle": null,
                      "permission": "pass_force_refund",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 778,
                      "parentId": 432,
                      "menuName": "强制结算",
                      "menuSubTitle": null,
                      "permission": "pass_force_settle",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 779,
                      "parentId": 432,
                      "menuName": "EB核销",
                      "menuSubTitle": null,
                      "permission": "pass_eb_forcewriteoff",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 780,
                      "parentId": 432,
                      "menuName": "商户版核销",
                      "menuSubTitle": null,
                      "permission": "pass_client_forcewriteoff",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 781,
                      "parentId": 432,
                      "menuName": "POS机核销",
                      "menuSubTitle": null,
                      "permission": "pass_pos_forcewriteoff",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 690,
      "parentId": 26,
      "menuName": "优惠促销",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 488,
              "parentId": 690,
              "menuName": "优惠券",
              "menuSubTitle": null,
              "permission": "eb_menu_488",
              "menuType": 1,
              "remarks": "mis酒店配置：营销配置-开通新优惠券\n非直达酒店",
              "subList": [
                  {
                      "menuId": 489,
                      "parentId": 488,
                      "menuName": "优惠券活动",
                      "menuSubTitle": null,
                      "permission": "coupon_activity_manage",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 490,
                      "parentId": 488,
                      "menuName": "优惠券产品库",
                      "menuSubTitle": null,
                      "permission": "eb_menu_490",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 491,
                      "parentId": 488,
                      "menuName": "优惠券领取概况",
                      "menuSubTitle": null,
                      "permission": "eb_menu_491",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 492,
                      "parentId": 488,
                      "menuName": "优惠券领取明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_492",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 496,
                      "parentId": 488,
                      "menuName": "优惠券核销",
                      "menuSubTitle": null,
                      "permission": "eb_menu_496",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 497,
                      "parentId": 488,
                      "menuName": "优惠券售卖报表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_497",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 493,
                      "parentId": 488,
                      "menuName": "优惠券导入",
                      "menuSubTitle": null,
                      "permission": "eb_menu_493",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-导入优惠券\n为老集团或有自营渠道",
                      "subList": []
                  },
                  {
                      "menuId": 495,
                      "parentId": 488,
                      "menuName": "优惠券导入管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_495",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-导入优惠券\n为老集团或有自营渠道",
                      "subList": []
                  },
                  {
                      "menuId": 494,
                      "parentId": 488,
                      "menuName": "优惠券导入记录",
                      "menuSubTitle": null,
                      "permission": "eb_menu_494",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-导入优惠券\n为老集团或有自营渠道",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 522,
              "parentId": 690,
              "menuName": "拼团",
              "menuSubTitle": null,
              "permission": "eb_menu_522",
              "menuType": 1,
              "remarks": "mis酒店配置：营销相关-开通拼团",
              "subList": [
                  {
                      "menuId": 523,
                      "parentId": 522,
                      "menuName": "拼团管理",
                      "menuSubTitle": null,
                      "permission": "group_buy_create",
                      "menuType": 1,
                      "remarks": "eb权限：拼团-拼团管理",
                      "subList": []
                  },
                  {
                      "menuId": 524,
                      "parentId": 522,
                      "menuName": "拼团明细",
                      "menuSubTitle": null,
                      "permission": "group_buy_detail",
                      "menuType": 1,
                      "remarks": "eb权限：拼团-拼团明细",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 484,
              "parentId": 690,
              "menuName": "买赠活动",
              "menuSubTitle": null,
              "permission": "eb_menu_484",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 486,
              "parentId": 690,
              "menuName": "捆绑售卖",
              "menuSubTitle": null,
              "permission": "eb_menu_486",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 483,
              "parentId": 690,
              "menuName": "会员价",
              "menuSubTitle": null,
              "permission": "eb_menu_483",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 482,
              "parentId": 690,
              "menuName": "定金膨胀",
              "menuSubTitle": null,
              "permission": "eb_menu_482",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 485,
              "parentId": 690,
              "menuName": "满减活动",
              "menuSubTitle": null,
              "permission": "eb_menu_485",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 837,
              "parentId": 690,
              "menuName": "盲盒活动",
              "menuSubTitle": null,
              "permission": "blindbox",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 519,
              "parentId": 690,
              "menuName": "砍价",
              "menuSubTitle": null,
              "permission": "eb_menu_519",
              "menuType": 1,
              "remarks": "mis酒店配置：营销相关-砍价",
              "subList": [
                  {
                      "menuId": 520,
                      "parentId": 519,
                      "menuName": "砍价管理",
                      "menuSubTitle": null,
                      "permission": "bargain_manage_activity",
                      "menuType": 1,
                      "remarks": "eb权限：砍价-砍价活动管理",
                      "subList": []
                  },
                  {
                      "menuId": 521,
                      "parentId": 519,
                      "menuName": "砍价明细",
                      "menuSubTitle": null,
                      "permission": "bargain_detail",
                      "menuType": 1,
                      "remarks": "eb权限：砍价-砍价明细",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 481,
              "parentId": 690,
              "menuName": "活动日管理",
              "menuSubTitle": null,
              "permission": "eb_menu_481",
              "menuType": 1,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 680,
      "parentId": 26,
      "menuName": "收款工具",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 433,
              "parentId": 680,
              "menuName": "预授权",
              "menuSubTitle": null,
              "permission": "direct_payment",
              "menuType": 1,
              "remarks": "eb权限：核心功能-预授权订单",
              "subList": []
          },
          {
              "menuId": 434,
              "parentId": 680,
              "menuName": "微POS直付",
              "menuSubTitle": null,
              "permission": "vpos_payment",
              "menuType": 1,
              "remarks": "mis酒店配置：支付相关-开通微POS直付\neb权限：微POS直付-微POS直付",
              "subList": [
                  {
                      "menuId": 782,
                      "parentId": 434,
                      "menuName": "强制退款",
                      "menuSubTitle": null,
                      "permission": "vpos_refund",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 458,
      "parentId": 26,
      "menuName": "会员管理",
      "menuSubTitle": null,
      "permission": "eb_menu_458",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 459,
              "parentId": 458,
              "menuName": "会员信息",
              "menuSubTitle": null,
              "permission": "member_view||member||member_level||corp||corp_level",
              "menuType": 1,
              "remarks": "非直达酒店（集团id==173886 && 酒店id != 183491 的为直达酒店）\neb权限：核心功能-会员管理（查看）||  核心功能-会员管理(编辑)（勾选会员管理查看权限）||  核心功能-会员分级 ||  重要功能-协议客户管理 || 核心功能-协议客户分级\n（核心功能-会员分级 和 核心功能-协议客户分级  权限 需要 勾选并且是 主店）",
              "subList": [
                  {
                      "menuId": 464,
                      "parentId": 459,
                      "menuName": "会员管理",
                      "menuSubTitle": null,
                      "permission": "member||member_view",
                      "menuType": 1,
                      "remarks": "",
                      "subList": [
                          {
                              "menuId": 818,
                              "parentId": 464,
                              "menuName": "查看",
                              "menuSubTitle": null,
                              "permission": "member_view",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 798,
                              "parentId": 464,
                              "menuName": "编辑",
                              "menuSubTitle": null,
                              "permission": "member",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 797,
                              "parentId": 464,
                              "menuName": "会员下载",
                              "menuSubTitle": null,
                              "permission": "member_download",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 796,
                              "parentId": 464,
                              "menuName": "加入黑名单",
                              "menuSubTitle": null,
                              "permission": "member_group_blacklist",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 682,
                      "parentId": 459,
                      "menuName": "业主|员工",
                      "menuSubTitle": null,
                      "permission": "emp_owner_reg_edit",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 460,
                      "parentId": 459,
                      "menuName": "会员管理",
                      "menuSubTitle": null,
                      "permission": "member||member_view",
                      "menuType": 1,
                      "remarks": "eb权限：核心功能-会员管理(编辑)（勾选会员管理查看权限） || 核心功能-会员管理（查看）",
                      "subList": []
                  },
                  {
                      "menuId": 461,
                      "parentId": 459,
                      "menuName": "导入会员",
                      "menuSubTitle": null,
                      "permission": "member_import",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-启用导入会员\neb权限：导入管理-导入会员\n没有绑定多个集团关系",
                      "subList": []
                  },
                  {
                      "menuId": 462,
                      "parentId": 459,
                      "menuName": "会员导入记录",
                      "menuSubTitle": null,
                      "permission": "eb_menu_462",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-启用导入会员\n没有绑定多个集团关系",
                      "subList": []
                  },
                  {
                      "menuId": 463,
                      "parentId": 459,
                      "menuName": "导入会员管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_463",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-启用导入会员",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 465,
              "parentId": 458,
              "menuName": "会员权益",
              "menuSubTitle": null,
              "permission": "member_view||member||member_level||corp||corp_level",
              "menuType": 1,
              "remarks": "非直达酒店（集团id==173886 && 酒店id != 183491 的为直达酒店）\neb权限：核心功能-会员管理（查看）||  核心功能-会员管理(编辑)（勾选会员管理查看权限）||  核心功能-会员分级 ||  重要功能-协议客户管理 || 核心功能-协议客户分级\n（核心功能-会员分级 和 核心功能-协议客户分级  权限 需要 勾选并且是 主店）",
              "subList": [
                  {
                      "menuId": 819,
                      "parentId": 465,
                      "menuName": "设置会员升级（编辑）",
                      "menuSubTitle": null,
                      "permission": "member_grade_edit",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 466,
                      "parentId": 465,
                      "menuName": "会员等级",
                      "menuSubTitle": null,
                      "permission": "member_level",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-新会员体系开关\neb权限：核心功能-会员分级\n（核心功能-会员分级 权限 需要 勾选并且是 主店）",
                      "subList": []
                  },
                  {
                      "menuId": 467,
                      "parentId": 465,
                      "menuName": "会员分级",
                      "menuSubTitle": null,
                      "permission": "member_level",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-新会员体系开关 关闭\neb权限：核心功能-会员分级\n（核心功能-会员分级 权限 需要 勾选并且是 主店）",
                      "subList": []
                  },
                  {
                      "menuId": 468,
                      "parentId": 465,
                      "menuName": "会员自动升级",
                      "menuSubTitle": null,
                      "permission": "member_level",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-新会员体系开关 关闭\neb权限：核心功能-会员分级\n（核心功能-会员分级 权限 需要 勾选并且是 主店）",
                      "subList": []
                  },
                  {
                      "menuId": 469,
                      "parentId": 465,
                      "menuName": "会员权益",
                      "menuSubTitle": null,
                      "permission": "member",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-新会员体系开关\neb权限：核心功能-会员管理(编辑)（勾选会员管理查看权限）",
                      "subList": []
                  },
                  {
                      "menuId": 470,
                      "parentId": 465,
                      "menuName": "会员权益",
                      "menuSubTitle": null,
                      "permission": "member",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会员-新会员体系开关 关闭\neb权限：核心功能-会员管理(编辑)（勾选会员管理查看权限）",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 472,
              "parentId": 458,
              "menuName": "会员积分",
              "menuSubTitle": null,
              "permission": "eb_menu_472",
              "menuType": 1,
              "remarks": "mis酒店配置：会员-是否开通积分-集团积分",
              "subList": [
                  {
                      "menuId": 473,
                      "parentId": 472,
                      "menuName": "积分发放规则",
                      "menuSubTitle": null,
                      "permission": "point_update",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-管理",
                      "subList": []
                  },
                  {
                      "menuId": 474,
                      "parentId": 472,
                      "menuName": "会员积分管理",
                      "menuSubTitle": null,
                      "permission": "point_update",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-管理",
                      "subList": []
                  },
                  {
                      "menuId": 475,
                      "parentId": 472,
                      "menuName": "积分商城产品",
                      "menuSubTitle": null,
                      "permission": "point_create",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-积分产品创建",
                      "subList": []
                  },
                  {
                      "menuId": 476,
                      "parentId": 472,
                      "menuName": "积分兑换储值卡",
                      "menuSubTitle": null,
                      "permission": "point_create",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-积分产品创建\n已隐藏",
                      "subList": []
                  },
                  {
                      "menuId": 477,
                      "parentId": 472,
                      "menuName": "积分兑换记录",
                      "menuSubTitle": null,
                      "permission": "point_view",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-查询",
                      "subList": []
                  },
                  {
                      "menuId": 478,
                      "parentId": 472,
                      "menuName": "积分抵现规则",
                      "menuSubTitle": null,
                      "permission": "member_point",
                      "menuType": 1,
                      "remarks": "eb权限：积分权限-管理",
                      "subList": []
                  },
                  {
                      "menuId": 982,
                      "parentId": 472,
                      "menuName": "积分收支明细",
                      "menuSubTitle": null,
                      "permission": "member_point",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 695,
              "parentId": 458,
              "menuName": "会员互动",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 499,
                      "parentId": 695,
                      "menuName": "微信群发",
                      "menuSubTitle": null,
                      "permission": "wx_batch_send",
                      "menuType": 1,
                      "remarks": "eb权限：消息群发-微信群发",
                      "subList": []
                  },
                  {
                      "menuId": 498,
                      "parentId": 695,
                      "menuName": "短信群发",
                      "menuSubTitle": null,
                      "permission": "sms_order",
                      "menuType": 1,
                      "remarks": "eb权限：消息群发-短信群发",
                      "subList": []
                  },
                  {
                      "menuId": 561,
                      "parentId": 695,
                      "menuName": "免税折扣店",
                      "menuSubTitle": null,
                      "permission": "report_channel_duty_shop",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-免税店折扣申请*\neb权限：免税店折扣申请-下载和查看",
                      "subList": [
                          {
                              "menuId": 787,
                              "parentId": 561,
                              "menuName": "下载和查看",
                              "menuSubTitle": null,
                              "permission": "duty_free_shop",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 757,
                      "parentId": 695,
                      "menuName": "公众号互动营销",
                      "menuSubTitle": null,
                      "permission": "invoice_useless",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 656,
              "parentId": 458,
              "menuName": "会员评价",
              "menuSubTitle": null,
              "permission": "comment_view",
              "menuType": 1,
              "remarks": "mis酒店配置：默认-操作记录\neb酒店配置：评价管理-查看",
              "subList": [
                  {
                      "menuId": 657,
                      "parentId": 656,
                      "menuName": "评价配置",
                      "menuSubTitle": null,
                      "permission": "comment_manage",
                      "menuType": 1,
                      "remarks": "eb权限：评价管理-管理",
                      "subList": []
                  },
                  {
                      "menuId": 658,
                      "parentId": 656,
                      "menuName": "评价信息",
                      "menuSubTitle": null,
                      "permission": "comment_view",
                      "menuType": 1,
                      "remarks": "eb权限：评价管理-查看",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 479,
      "parentId": 26,
      "menuName": "吸粉引流",
      "menuSubTitle": null,
      "permission": "eb_menu_479",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 826,
              "parentId": 479,
              "menuName": "营销活动",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 5,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 827,
                      "parentId": 826,
                      "menuName": "查看（大转盘、摇一摇）",
                      "menuSubTitle": null,
                      "permission": "campaign_view",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 828,
                      "parentId": 826,
                      "menuName": "修改",
                      "menuSubTitle": null,
                      "permission": "campaign_update",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 480,
              "parentId": 479,
              "menuName": "玩法说明",
              "menuSubTitle": null,
              "permission": "eb_menu_480",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 514,
              "parentId": 479,
              "menuName": "任务宝",
              "menuSubTitle": null,
              "permission": "task_treasure_manage||task_treasure_detail",
              "menuType": 1,
              "remarks": "mis酒店配置：营销相关-是否开通任务宝\neb权限：任务宝：任务宝管理 || 任务宝明细",
              "subList": [
                  {
                      "menuId": 515,
                      "parentId": 514,
                      "menuName": "任务宝管理",
                      "menuSubTitle": null,
                      "permission": "task_treasure_manage",
                      "menuType": 1,
                      "remarks": "eb权限：任务宝-任务宝管理",
                      "subList": []
                  },
                  {
                      "menuId": 516,
                      "parentId": 514,
                      "menuName": "任务宝明细",
                      "menuSubTitle": null,
                      "permission": "task_treasure_detail",
                      "menuType": 1,
                      "remarks": "eb权限：任务宝-任务宝明细",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 693,
              "parentId": 479,
              "menuName": "吸粉引流工具",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 503,
                      "parentId": 693,
                      "menuName": "二维码",
                      "menuSubTitle": null,
                      "permission": "eb_menu_503",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-线下二维码精准营销",
                      "subList": []
                  },
                  {
                      "menuId": 528,
                      "parentId": 693,
                      "menuName": "群活码",
                      "menuSubTitle": null,
                      "permission": "live_code",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-开通活码\neb权限：二维码活码-二维码活码管理",
                      "subList": [
                          {
                              "menuId": 824,
                              "parentId": 528,
                              "menuName": "自动回复",
                              "menuSubTitle": null,
                              "permission": "auto_reply",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 823,
                              "parentId": 528,
                              "menuName": "二维码活码管理",
                              "menuSubTitle": null,
                              "permission": "live_code",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 825,
                              "parentId": 528,
                              "menuName": "售卖助手",
                              "menuSubTitle": null,
                              "permission": "live_code_sell",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 517,
                      "parentId": 693,
                      "menuName": "大转盘",
                      "menuSubTitle": null,
                      "permission": "campaign_view",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-是否开通营销活动（大转盘）\neb权限：营销活动-查看",
                      "subList": []
                  },
                  {
                      "menuId": 518,
                      "parentId": 693,
                      "menuName": "摇一摇",
                      "menuSubTitle": null,
                      "permission": "campaign_view",
                      "menuType": 1,
                      "remarks": "mis酒店配置：营销相关-是否开通营销活动（大转盘）\neb权限：营销活动-查看",
                      "subList": []
                  },
                  {
                      "menuId": 512,
                      "parentId": 693,
                      "menuName": "小程序0元抽奖",
                      "menuSubTitle": null,
                      "permission": "marketing_applets_lottery",
                      "menuType": 1,
                      "remarks": "员工权限 营销活动-》0元抽奖",
                      "subList": []
                  },
                  {
                      "menuId": 529,
                      "parentId": 693,
                      "menuName": "直播",
                      "menuSubTitle": null,
                      "permission": "cam_update",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-开通直播\neb员工权限：直播权限-直播管理",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 525,
              "parentId": 479,
              "menuName": "集卡",
              "menuSubTitle": null,
              "permission": "eb_menu_525",
              "menuType": 1,
              "remarks": "mis酒店配置：营销相关-集卡开关",
              "subList": [
                  {
                      "menuId": 526,
                      "parentId": 525,
                      "menuName": "集卡活动",
                      "menuSubTitle": null,
                      "permission": "eb_menu_526",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 527,
                      "parentId": 525,
                      "menuName": "集卡明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_527",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 694,
              "parentId": 479,
              "menuName": "员工拉新",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 500,
                      "parentId": 694,
                      "menuName": "员工拉新规则",
                      "menuSubTitle": null,
                      "permission": "staff_introduce_people",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 501,
                      "parentId": 694,
                      "menuName": "员工拉新报表",
                      "menuSubTitle": null,
                      "permission": "staff_introduce_people_report",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 487,
                      "parentId": 694,
                      "menuName": "员工微名片",
                      "menuSubTitle": null,
                      "permission": "business_card",
                      "menuType": 1,
                      "remarks": "收费功能",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 696,
              "parentId": 479,
              "menuName": "注册有奖",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 511,
                      "parentId": 696,
                      "menuName": "绑定手机赠礼",
                      "menuSubTitle": null,
                      "permission": "eb_menu_511",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 502,
                      "parentId": 696,
                      "menuName": "注册赠券",
                      "menuSubTitle": null,
                      "permission": "member",
                      "menuType": 1,
                      "remarks": "eb权限：核心功能-会员管理(编辑)（勾选会员管理查看权限）",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 508,
              "parentId": 479,
              "menuName": "定向发券",
              "menuSubTitle": null,
              "permission": "ticket_orient_manage",
              "menuType": 1,
              "remarks": "eb员工权限：定向发券-定向发券管理\nmis酒店配置：预售券-定向发券",
              "subList": [
                  {
                      "menuId": 509,
                      "parentId": 508,
                      "menuName": "发券管理",
                      "menuSubTitle": null,
                      "permission": "ticket_orient_manage",
                      "menuType": 1,
                      "remarks": "eb权限：定向发券-定向发券管理",
                      "subList": []
                  },
                  {
                      "menuId": 510,
                      "parentId": 508,
                      "menuName": "发券明细",
                      "menuSubTitle": null,
                      "permission": "ticket_orient_manage",
                      "menuType": 1,
                      "remarks": "eb员工权限：定向发券-定向发券管理",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 504,
              "parentId": 479,
              "menuName": "扫码领券",
              "menuSubTitle": null,
              "permission": "otc_ticket_view",
              "menuType": 1,
              "remarks": "mis酒店配置：营销相关-是否开启发券\neb权限：发券-查询",
              "subList": [
                  {
                      "menuId": 820,
                      "parentId": 504,
                      "menuName": "查询",
                      "menuSubTitle": null,
                      "permission": "otc_ticket_view",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 821,
                      "parentId": 504,
                      "menuName": "修改",
                      "menuSubTitle": null,
                      "permission": "otc_ticket_update",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 505,
                      "parentId": 504,
                      "menuName": "领券管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_505",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 506,
                      "parentId": 504,
                      "menuName": "领券明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_506",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 507,
                      "parentId": 504,
                      "menuName": "单人领券",
                      "menuSubTitle": null,
                      "permission": "eb_menu_507",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 564,
      "parentId": 26,
      "menuName": "财务中⼼",
      "menuSubTitle": null,
      "permission": "eb_menu_564",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 565,
              "parentId": 564,
              "menuName": "现金账户",
              "menuSubTitle": null,
              "permission": "supplier_account",
              "menuType": 1,
              "remarks": "eb权限：现金账户-现金账户（不可见备注信息）",
              "subList": [
                  {
                      "menuId": 815,
                      "parentId": 565,
                      "menuName": "现金账户（不可见备注信息）",
                      "menuSubTitle": null,
                      "permission": "supplier_account",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 816,
                      "parentId": 565,
                      "menuName": "现金账户（备注信息展示）",
                      "menuSubTitle": null,
                      "permission": "supplier_account_mark",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 566,
                      "parentId": 565,
                      "menuName": "账户流水",
                      "menuSubTitle": null,
                      "permission": "eb_menu_566",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 567,
                      "parentId": 565,
                      "menuName": "发票管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_567",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 568,
                      "parentId": 565,
                      "menuName": "提现管理",
                      "menuSubTitle": null,
                      "permission": "supplier_account_withdraw",
                      "menuType": 1,
                      "remarks": "eb员工权限：现金账户-提现操作",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 1005,
              "parentId": 564,
              "menuName": "账户中心",
              "menuSubTitle": null,
              "permission": "supplier_account",
              "menuType": 1,
              "remarks": "由现金账户权限控制",
              "subList": [
                  {
                      "menuId": 1008,
                      "parentId": 1005,
                      "menuName": "提现记录",
                      "menuSubTitle": null,
                      "permission": "supplier_account_withdraw",
                      "menuType": 1,
                      "remarks": "与提现管理使用同一权限控制",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 569,
              "parentId": 564,
              "menuName": "财务对账",
              "menuSubTitle": null,
              "permission": "supplier_account",
              "menuType": 1,
              "remarks": "eb权限：现金账户-现金账户（不可见备注信息）",
              "subList": [
                  {
                      "menuId": 814,
                      "parentId": 569,
                      "menuName": "预售券结算对账展示券号",
                      "menuSubTitle": null,
                      "permission": "ticket_show_full_code",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 572,
                      "parentId": 569,
                      "menuName": "预售券结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_572",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 582,
                      "parentId": 569,
                      "menuName": "预授权结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_582",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 574,
                      "parentId": 569,
                      "menuName": "权益卡结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_574",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 578,
                      "parentId": 569,
                      "menuName": "订餐对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_578",
                      "menuType": 1,
                      "remarks": "mis酒店配置：订餐-开通订餐",
                      "subList": []
                  },
                  {
                      "menuId": 576,
                      "parentId": 569,
                      "menuName": "储值卡结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_576",
                      "menuType": 1,
                      "remarks": "mis酒店配置：储值卡配置-开通储值卡",
                      "subList": []
                  },
                  {
                      "menuId": 573,
                      "parentId": 569,
                      "menuName": "组合产品对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_573",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 581,
                      "parentId": 569,
                      "menuName": "微POS直付对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_581",
                      "menuType": 1,
                      "remarks": "已隐藏",
                      "subList": []
                  },
                  {
                      "menuId": 583,
                      "parentId": 569,
                      "menuName": "微POS直付对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_583",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 577,
                      "parentId": 569,
                      "menuName": "增值消费对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_577",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 2435,
                      "parentId": 569,
                      "menuName": "增值消费对账",
                      "menuSubTitle": null,
                      "permission": "_self",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 585,
                      "parentId": 569,
                      "menuName": "预售券过期对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_585",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 575,
                      "parentId": 569,
                      "menuName": "景区门票对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_575",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 579,
                      "parentId": 569,
                      "menuName": "定金结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_579",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 570,
                      "parentId": 569,
                      "menuName": "分账对账单",
                      "menuSubTitle": null,
                      "permission": "eb_menu_570",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 580,
                      "parentId": 569,
                      "menuName": "消息通知对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_580",
                      "menuType": 1,
                      "remarks": "已隐藏",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 586,
              "parentId": 564,
              "menuName": "集团财务对账",
              "menuSubTitle": null,
              "permission": "brand_finance_check",
              "menuType": 1,
              "remarks": "mis酒店配置：集团-集团财务对账报表\neb权限：现金账户-集团财务对账",
              "subList": [
                  {
                      "menuId": 588,
                      "parentId": 586,
                      "menuName": "预售券结算对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_588",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 590,
                      "parentId": 586,
                      "menuName": "预售券消费对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_590",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 587,
                      "parentId": 586,
                      "menuName": "客房订单对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_587",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 592,
                      "parentId": 586,
                      "menuName": "组合产品对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_592",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 589,
                      "parentId": 586,
                      "menuName": "增值消费对账",
                      "menuSubTitle": null,
                      "permission": "eb_menu_589",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 591,
                      "parentId": 586,
                      "menuName": "预售券过期明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_591",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 593,
                      "parentId": 586,
                      "menuName": "奖励提前发放",
                      "menuSubTitle": null,
                      "permission": "eb_menu_593",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 708,
              "parentId": 564,
              "menuName": "集团门店对账",
              "menuSubTitle": null,
              "permission": "finacial_reconciliation_view",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 898,
              "parentId": 564,
              "menuName": "集团财务管理",
              "menuSubTitle": null,
              "permission": "report_shop_reward",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 899,
                      "parentId": 898,
                      "menuName": "集团提现管理",
                      "menuSubTitle": null,
                      "permission": "report_shop_reward",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 532,
      "parentId": 26,
      "menuName": "数据报表",
      "menuSubTitle": null,
      "permission": "eb_menu_532",
      "menuType": 1,
      "remarks": "eb权限：数据报表-数据报表",
      "subList": [
          {
              "menuId": 537,
              "parentId": 532,
              "menuName": "店铺整体报表",
              "menuSubTitle": null,
              "permission": "eb_menu_537",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 540,
                      "parentId": 537,
                      "menuName": "汇总报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_sum",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 538,
                      "parentId": 537,
                      "menuName": "分销卖货报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_distribution_sold",
                      "menuType": 1,
                      "remarks": "eb权限：数据报表-数据报表",
                      "subList": []
                  },
                  {
                      "menuId": 543,
                      "parentId": 537,
                      "menuName": "奖励报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_reward",
                      "menuType": 1,
                      "remarks": "酒店Id不为48843",
                      "subList": []
                  },
                  {
                      "menuId": 838,
                      "parentId": 537,
                      "menuName": "奖励明细报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_reward",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 541,
                      "parentId": 537,
                      "menuName": "商户鹰眼",
                      "menuSubTitle": null,
                      "permission": "report_shop_eagleeye",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 539,
                      "parentId": 537,
                      "menuName": "BALABALA报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_define",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 545,
                      "parentId": 537,
                      "menuName": "会员价值报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_membervalue",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 546,
                      "parentId": 537,
                      "menuName": "会员等级分析报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_member_grade",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 544,
                      "parentId": 537,
                      "menuName": "官微价值报表",
                      "menuSubTitle": null,
                      "permission": "report_shop_official_value",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 550,
              "parentId": 532,
              "menuName": "业务线数据",
              "menuSubTitle": null,
              "permission": "eb_menu_550",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 551,
                      "parentId": 550,
                      "menuName": "预售券报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_ticket",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 822,
                      "parentId": 550,
                      "menuName": "赠券报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_gift",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 557,
                      "parentId": 550,
                      "menuName": "客房数据概览",
                      "menuSubTitle": null,
                      "permission": "report_channel_room_dashboard",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 553,
                      "parentId": 550,
                      "menuName": "客房报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_room",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 763,
                      "parentId": 550,
                      "menuName": "储值卡报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_prepaycard",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 556,
                      "parentId": 550,
                      "menuName": "储值卡报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_prepaycard",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 552,
                      "parentId": 550,
                      "menuName": "组合产品报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_package",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 554,
                      "parentId": 550,
                      "menuName": "订餐报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_restaurant",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 555,
                      "parentId": 550,
                      "menuName": "门票报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_pass",
                      "menuType": 1,
                      "remarks": "mis酒店配置：景区门票-开通景区门票",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 547,
              "parentId": 532,
              "menuName": "粉丝数据",
              "menuSubTitle": null,
              "permission": "eb_menu_547",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 548,
                      "parentId": 547,
                      "menuName": "粉丝数据",
                      "menuSubTitle": null,
                      "permission": "report_fans_data",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 549,
                      "parentId": 547,
                      "menuName": "粉丝数据明细",
                      "menuSubTitle": null,
                      "permission": "report_fans_datadetail",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 533,
              "parentId": 532,
              "menuName": "数据魔方",
              "menuSubTitle": null,
              "permission": "eb_menu_533",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 534,
                      "parentId": 533,
                      "menuName": "用户魔方",
                      "menuSubTitle": null,
                      "permission": "report_data_customer",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 535,
                      "parentId": 533,
                      "menuName": "生意魔方",
                      "menuSubTitle": null,
                      "permission": "report_data_business",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 536,
                      "parentId": 533,
                      "menuName": "日历房魔方",
                      "menuSubTitle": null,
                      "permission": "report_data_dailyroom",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 563,
              "parentId": 532,
              "menuName": "自定义报表",
              "menuSubTitle": null,
              "permission": "custom_report",
              "menuType": 1,
              "remarks": "eb员工权限：数据报表-数据报表",
              "subList": []
          },
          {
              "menuId": 558,
              "parentId": 532,
              "menuName": "集团数据报表",
              "menuSubTitle": null,
              "permission": "eb_menu_558",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 559,
                      "parentId": 558,
                      "menuName": "数据汇总",
                      "menuSubTitle": null,
                      "permission": "report_brand_sumary",
                      "menuType": 1,
                      "remarks": "是主店",
                      "subList": []
                  },
                  {
                      "menuId": 560,
                      "parentId": 558,
                      "menuName": "活动报表",
                      "menuSubTitle": null,
                      "permission": "report_channel_brand_activity",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 594,
      "parentId": 26,
      "menuName": "销售渠道",
      "menuSubTitle": null,
      "permission": "eb_menu_594",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 613,
              "parentId": 594,
              "menuName": "微信小程序",
              "menuSubTitle": null,
              "permission": "mini_program",
              "menuType": 1,
              "remarks": "mis酒店配置：小程序-小程序\neb权限：重要功能-小程序管理",
              "subList": []
          },
          {
              "menuId": 609,
              "parentId": 594,
              "menuName": "微信公众号",
              "menuSubTitle": null,
              "permission": "wx_authenticate||wx_menu_edit",
              "menuType": 1,
              "remarks": "eb权限：重要功能： 公众号认证 || 编辑公众号菜单\n非直达酒店",
              "subList": [
                  {
                      "menuId": 610,
                      "parentId": 609,
                      "menuName": "授权管理",
                      "menuSubTitle": null,
                      "permission": "wx_authenticate",
                      "menuType": 1,
                      "remarks": "eb权限：重要功能-公众号认证",
                      "subList": []
                  },
                  {
                      "menuId": 611,
                      "parentId": 609,
                      "menuName": "自定义菜单",
                      "menuSubTitle": null,
                      "permission": "wx_menu_edit",
                      "menuType": 1,
                      "remarks": "eb权限：重要功能-编辑公众号菜单",
                      "subList": []
                  },
                  {
                      "menuId": 612,
                      "parentId": 609,
                      "menuName": "自动回复",
                      "menuSubTitle": null,
                      "permission": "eb_menu_612",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 618,
              "parentId": 594,
              "menuName": "小生活分销",
              "menuSubTitle": null,
              "permission": "small_life_manage",
              "menuType": 1,
              "remarks": "eb权限：小生活对账-查看\nmis酒店配置：默认-小生活合作 && 是佣金模式 或者 开启过小生活佣金模式（开启过是指有分销产品数据）\n当前酒店 不归属 小生活业务部 ",
              "subList": [
                  {
                      "menuId": 2454,
                      "parentId": 618,
                      "menuName": "小生活财务对账",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 1031,
                      "parentId": 618,
                      "menuName": "充值管理",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 1003,
                      "parentId": 618,
                      "menuName": "小生活分销产品",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-小生活合作 && 是佣金模式 或者 开启过小生活佣金模式（开启过是指有分销产品数据）",
                      "subList": []
                  },
                  {
                      "menuId": 619,
                      "parentId": 618,
                      "menuName": "小生活分销产品",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "mis酒店配置：默认-小生活合作 && 是佣金模式 或者 开启过小生活佣金模式（开启过是指有分销产品数据）",
                      "subList": []
                  },
                  {
                      "menuId": 620,
                      "parentId": 618,
                      "menuName": "预售券结算对账",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 621,
                      "parentId": 618,
                      "menuName": "景区门票对账",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 622,
                      "parentId": 618,
                      "menuName": "增值消费对账",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 623,
                      "parentId": 618,
                      "menuName": "小生活现金账户",
                      "menuSubTitle": null,
                      "permission": "xsh_cash_account",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 624,
                      "parentId": 618,
                      "menuName": "小生活发票",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 625,
                      "parentId": 618,
                      "menuName": "小生活核券明细",
                      "menuSubTitle": null,
                      "permission": "xsh_finance",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 605,
              "parentId": 594,
              "menuName": "抖音小程序",
              "menuSubTitle": null,
              "permission": "eb_menu_605",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 606,
                      "parentId": 605,
                      "menuName": "抖音小程序授权",
                      "menuSubTitle": null,
                      "permission": "eb_menu_606",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 313,
                      "parentId": 605,
                      "menuName": "抖音小程序模板",
                      "menuSubTitle": null,
                      "permission": "eb_menu_313",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 607,
                      "parentId": 605,
                      "menuName": "抖音编辑发布",
                      "menuSubTitle": null,
                      "permission": "eb_menu_607",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 608,
                      "parentId": 605,
                      "menuName": "页面链接",
                      "menuSubTitle": null,
                      "permission": "eb_menu_608",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 628,
              "parentId": 594,
              "menuName": "短信卖货",
              "menuSubTitle": null,
              "permission": "ticket_sale_buy_sms",
              "menuType": 1,
              "remarks": "eb员工权限：预售券-短信卖货",
              "subList": [
                  {
                      "menuId": 629,
                      "parentId": 628,
                      "menuName": "消息模板",
                      "menuSubTitle": null,
                      "permission": "ticket_sale_buy_sms",
                      "menuType": 1,
                      "remarks": "eb员工权限：预售券-短信卖货",
                      "subList": []
                  },
                  {
                      "menuId": 630,
                      "parentId": 628,
                      "menuName": "渠道数据",
                      "menuSubTitle": null,
                      "permission": "ticket_sale_buy_sms",
                      "menuType": 1,
                      "remarks": "eb员工权限：预售券-短信卖货",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 1012,
              "parentId": 594,
              "menuName": "支付宝小程序",
              "menuSubTitle": null,
              "permission": "alipay_applets",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 626,
              "parentId": 594,
              "menuName": "飞猪分销",
              "menuSubTitle": null,
              "permission": "fliggy_distribution",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 627,
                      "parentId": 626,
                      "menuName": "产品分销配置",
                      "menuSubTitle": null,
                      "permission": "fliggy_distribution",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 743,
      "parentId": 26,
      "menuName": "小生活分销",
      "menuSubTitle": null,
      "permission": "small_life_manage",
      "menuType": 1,
      "remarks": "eb权限：小生活对账-查看\nmis酒店配置：默认-小生活合作 && 是佣金模式 或者 开启过小生活佣金模式（开启过是指有分销产品数据）\n当前酒店归属 小生活业务部",
      "subList": []
  },
  {
      "menuId": 595,
      "parentId": 26,
      "menuName": "企业微信",
      "menuSubTitle": null,
      "permission": "we_work",
      "menuType": 1,
      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
      "subList": [
          {
              "menuId": 596,
              "parentId": 595,
              "menuName": "概览",
              "menuSubTitle": null,
              "permission": "we_work",
              "menuType": 1,
              "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
              "subList": []
          },
          {
              "menuId": 2453,
              "parentId": 595,
              "menuName": "酒店服务",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 2451,
                      "parentId": 2453,
                      "menuName": "预约功能",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "eb-员工权限：we_work  具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 2452,
                      "parentId": 2453,
                      "menuName": "意见反馈",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "eb-员工权限：we_work\n具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 686,
              "parentId": 595,
              "menuName": "客户管理",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 597,
                      "parentId": 686,
                      "menuName": "客户",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 603,
                      "parentId": 686,
                      "menuName": "客户群",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "eb员工权限：we_work\n具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 598,
                      "parentId": 686,
                      "menuName": "客户标签",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 927,
                      "parentId": 686,
                      "menuName": "群标签",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 687,
              "parentId": 595,
              "menuName": "引流获客",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 599,
                      "parentId": 687,
                      "menuName": "渠道二维码",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 685,
                      "parentId": 687,
                      "menuName": "企微任务宝",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 602,
                      "parentId": 687,
                      "menuName": "群活码",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "eb-员工权限：we_work\n具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  },
                  {
                      "menuId": 712,
                      "parentId": 687,
                      "menuName": "群裂变",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 688,
              "parentId": 595,
              "menuName": "客户运营",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 600,
                      "parentId": 688,
                      "menuName": "消息群发",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 604,
                      "parentId": 688,
                      "menuName": "客户群群发",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "eb员工权限勾选企业微信管理",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 601,
              "parentId": 595,
              "menuName": "授权管理",
              "menuSubTitle": null,
              "permission": "we_work",
              "menuType": 1,
              "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
              "subList": [
                  {
                      "menuId": 2420,
                      "parentId": 601,
                      "menuName": "企微授权管理",
                      "menuSubTitle": null,
                      "permission": "we_work",
                      "menuType": 1,
                      "remarks": "具有「企业微信超管」操作权限的商户员工，直客通员工",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 451,
      "parentId": 26,
      "menuName": "协议公司",
      "menuSubTitle": null,
      "permission": "eb_menu_451",
      "menuType": 1,
      "remarks": "mis酒店配置：协议公司-协议公司功能",
      "subList": []
  },
  {
      "menuId": 452,
      "parentId": 26,
      "menuName": "协议公司",
      "menuSubTitle": null,
      "permission": "member_view||member||member_level||corp||corp_level",
      "menuType": 1,
      "remarks": "非直达酒店（集团id==173886 && 酒店id != 183491 的为直达酒店）\neb权限：核心功能-会员管理（查看）||  核心功能-会员管理(编辑)（勾选会员管理查看权限）||  核心功能-会员分级 ||  重要功能-协议客户管理 || 核心功能-协议客户分级\n（核心功能-会员分级 和 核心功能-协议客户分级  权限 需要 勾选并且是 主店）\nmis酒店配置：协议公司-协议公司功能开启",
      "subList": [
          {
              "menuId": 454,
              "parentId": 452,
              "menuName": "协议公司列表",
              "menuSubTitle": null,
              "permission": "corp",
              "menuType": 1,
              "remarks": "eb权限：重要功能-协议客户管理",
              "subList": [
                  {
                      "menuId": 794,
                      "parentId": 454,
                      "menuName": "查看协议用户列表",
                      "menuSubTitle": null,
                      "permission": "corp_member",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 795,
                      "parentId": 454,
                      "menuName": "设置协议关键人",
                      "menuSubTitle": null,
                      "permission": "corp_key_person",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 832,
                      "parentId": 454,
                      "menuName": "协议公司审批上线",
                      "menuSubTitle": null,
                      "permission": "agreement_compony_approval_online",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 926,
              "parentId": 452,
              "menuName": "协议促销维护",
              "menuSubTitle": null,
              "permission": "product",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 1028,
              "parentId": 452,
              "menuName": "协议促销维护",
              "menuSubTitle": null,
              "permission": "product",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 453,
              "parentId": 452,
              "menuName": "协议公司线索库",
              "menuSubTitle": null,
              "permission": "eb_menu_453",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 456,
              "parentId": 452,
              "menuName": "协议公司报表",
              "menuSubTitle": null,
              "permission": "eb_menu_456",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 455,
              "parentId": 452,
              "menuName": "协议公司分级",
              "menuSubTitle": null,
              "permission": "corp_level",
              "menuType": 1,
              "remarks": "eb权限：核心功能-协议客户分级\n（核心功能-协议客户分级 权限 需要勾选且是主店）",
              "subList": []
          },
          {
              "menuId": 457,
              "parentId": 452,
              "menuName": "协议奖励设置",
              "menuSubTitle": null,
              "permission": "corp_key_person",
              "menuType": 1,
              "remarks": "mis酒店配置：奖励配置-启用协议公司关键人奖励\neb权限：重要功能-协议关键人设置",
              "subList": []
          }
      ]
  },
  {
      "menuId": 435,
      "parentId": 26,
      "menuName": "会议管理",
      "menuSubTitle": null,
      "permission": "eb_menu_435",
      "menuType": 1,
      "remarks": "mis酒店配置：会议模块-会议模块功能开启",
      "subList": [
          {
              "menuId": 436,
              "parentId": 435,
              "menuName": "会议发券",
              "menuSubTitle": null,
              "permission": "creat_meeting_ticket",
              "menuType": 1,
              "remarks": "mis酒店配置：会议模块-会议发券\neb员工权限：会议发券-创建会议餐券活动",
              "subList": [
                  {
                      "menuId": 437,
                      "parentId": 436,
                      "menuName": "领券管理",
                      "menuSubTitle": null,
                      "permission": "eb_menu_437",
                      "menuType": 1,
                      "remarks": null,
                      "subList": [
                          {
                              "menuId": 791,
                              "parentId": 437,
                              "menuName": "创建会议餐券",
                              "menuSubTitle": null,
                              "permission": "creat_meeting_ticket",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 438,
                      "parentId": 436,
                      "menuName": "领券明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_438",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 439,
                      "parentId": 436,
                      "menuName": "核券明细",
                      "menuSubTitle": null,
                      "permission": "eb_menu_439",
                      "menuType": 1,
                      "remarks": null,
                      "subList": []
                  },
                  {
                      "menuId": 440,
                      "parentId": 436,
                      "menuName": "会议发券线索库",
                      "menuSubTitle": null,
                      "permission": "eb_menu_440",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 441,
              "parentId": 435,
              "menuName": "会场设置",
              "menuSubTitle": null,
              "permission": "eb_menu_441",
              "menuType": 1,
              "remarks": "mis酒店配置：默认-会场设置",
              "subList": [
                  {
                      "menuId": 442,
                      "parentId": 441,
                      "menuName": "会场管理",
                      "menuSubTitle": null,
                      "permission": "meeting_manager",
                      "menuType": 1,
                      "remarks": "eb员工权限：会场管理-会场管理",
                      "subList": [
                          {
                              "menuId": 790,
                              "parentId": 442,
                              "menuName": "会场变动消息接收",
                              "menuSubTitle": null,
                              "permission": "meeting_space_book_update_message",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  },
                  {
                      "menuId": 443,
                      "parentId": 441,
                      "menuName": "会场预订",
                      "menuSubTitle": null,
                      "permission": "meeting_book",
                      "menuType": 1,
                      "remarks": "eb员工权限：会场管理-会场预定",
                      "subList": [
                          {
                              "menuId": 788,
                              "parentId": 443,
                              "menuName": "已预订的会场管理",
                              "menuSubTitle": null,
                              "permission": "meeting_space_book_update",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          },
                          {
                              "menuId": 789,
                              "parentId": 443,
                              "menuName": "下载",
                              "menuSubTitle": null,
                              "permission": "meeting_space_book_download",
                              "menuType": 2,
                              "remarks": "",
                              "subList": []
                          }
                      ]
                  }
              ]
          },
          {
              "menuId": 444,
              "parentId": 435,
              "menuName": "会议订房",
              "menuSubTitle": null,
              "permission": "meeting_booking_order",
              "menuType": 1,
              "remarks": "mis酒店配置：会议模块-会议订房\n",
              "subList": [
                  {
                      "menuId": 445,
                      "parentId": 444,
                      "menuName": "会议预订线索",
                      "menuSubTitle": null,
                      "permission": "meeting_booking_order",
                      "menuType": 1,
                      "remarks": "mis酒店配置：会议模块-是否开启会议预定功能\neb权限：会议预定权限-订单管理",
                      "subList": []
                  },
                  {
                      "menuId": 446,
                      "parentId": 444,
                      "menuName": "会议列表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_446",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 447,
                      "parentId": 444,
                      "menuName": "会议分级",
                      "menuSubTitle": null,
                      "permission": "eb_menu_447",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 448,
                      "parentId": 444,
                      "menuName": "会议销售报表",
                      "menuSubTitle": null,
                      "permission": "eb_menu_448",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 449,
                      "parentId": 444,
                      "menuName": "会议奖励设置",
                      "menuSubTitle": null,
                      "permission": "eb_menu_449",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 924,
                      "parentId": 444,
                      "menuName": "会议促销维护",
                      "menuSubTitle": null,
                      "permission": "product",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 1027,
                      "parentId": 444,
                      "menuName": "会议促销维护",
                      "menuSubTitle": null,
                      "permission": "product",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 450,
      "parentId": 26,
      "menuName": "会议管理",
      "menuSubTitle": null,
      "permission": "eb_menu_450",
      "menuType": 1,
      "remarks": "mis酒店配置：会议模块-会议模块功能禁用",
      "subList": []
  },
  {
      "menuId": 647,
      "parentId": 26,
      "menuName": "基础设置",
      "menuSubTitle": null,
      "permission": "eb_menu_647",
      "menuType": 1,
      "remarks": "",
      "subList": [
          {
              "menuId": 531,
              "parentId": 647,
              "menuName": "生成短链接",
              "menuSubTitle": null,
              "permission": "eb_menu_531",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 668,
              "parentId": 647,
              "menuName": "订单通知",
              "menuSubTitle": null,
              "permission": "order_notification",
              "menuType": 1,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 660,
              "parentId": 647,
              "menuName": "商户版管理",
              "menuSubTitle": null,
              "permission": "eb_menu_660",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 661,
                      "parentId": 660,
                      "menuName": "分类排序配置",
                      "menuSubTitle": null,
                      "permission": "merchant_category",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 662,
                      "parentId": 660,
                      "menuName": "商品置顶配置",
                      "menuSubTitle": null,
                      "permission": "merchant_top_configuration",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 645,
                      "parentId": 660,
                      "menuName": "推广渠道选择",
                      "menuSubTitle": null,
                      "permission": "admin",
                      "menuType": 1,
                      "remarks": "eb权限：核心功能-管理员管理\n商户绑定集团",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 648,
              "parentId": 647,
              "menuName": "商户配置",
              "menuSubTitle": null,
              "permission": "hotel_config",
              "menuType": 1,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 1038,
              "parentId": 647,
              "menuName": "用户信息保护",
              "menuSubTitle": null,
              "permission": "user_protect",
              "menuType": 1,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 1039,
                      "parentId": 1038,
                      "menuName": "会员中心保护",
                      "menuSubTitle": null,
                      "permission": "usercenter_protect",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 1040,
                      "parentId": 1038,
                      "menuName": "EB系统保护",
                      "menuSubTitle": null,
                      "permission": "usereb_protect",
                      "menuType": 1,
                      "remarks": "",
                      "subList": []
                  }
              ]
          },
          {
              "menuId": 667,
              "parentId": 647,
              "menuName": "操作记录",
              "menuSubTitle": null,
              "permission": "log",
              "menuType": 1,
              "remarks": "eb权限：核心功能-操作记录查看",
              "subList": []
          },
          {
              "menuId": 655,
              "parentId": 647,
              "menuName": "POS机配置",
              "menuSubTitle": null,
              "permission": "pos_manage",
              "menuType": 1,
              "remarks": "mis酒店配置：pos机-开通扫码枪\neb权限：POS-POS功能配置",
              "subList": []
          },
          {
              "menuId": 659,
              "parentId": 647,
              "menuName": "RateCategory",
              "menuSubTitle": null,
              "permission": "eb_menu_659",
              "menuType": 1,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 297,
      "parentId": 26,
      "menuName": "商户版",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 5,
      "remarks": "",
      "subList": [
          {
              "menuId": 842,
              "parentId": 297,
              "menuName": "协议短信预订",
              "menuSubTitle": null,
              "permission": "sms_protocol_book",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 742,
              "parentId": 297,
              "menuName": "商户版员工代注册",
              "menuSubTitle": null,
              "permission": "staff_register_member",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 840,
              "parentId": 297,
              "menuName": "日历房商户版短信推广",
              "menuSubTitle": null,
              "permission": "shanghu_room_sms_spread",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 841,
              "parentId": 297,
              "menuName": "日历房代客下单推广",
              "menuSubTitle": null,
              "permission": "shanghu_order_generalize",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 783,
              "parentId": 297,
              "menuName": "推广普卡",
              "menuSubTitle": null,
              "permission": "share_normal",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 786,
              "parentId": 297,
              "menuName": "推广金卡",
              "menuSubTitle": null,
              "permission": "share_golden",
              "menuType": 2,
              "remarks": "",
              "subList": []
          },
          {
              "menuId": 785,
              "parentId": 297,
              "menuName": "推广高级卡",
              "menuSubTitle": null,
              "permission": "share_senior",
              "menuType": 2,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 27,
      "parentId": 26,
      "menuName": "微名片",
      "menuSubTitle": "收费功能",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 43,
      "parentId": 26,
      "menuName": "重要功能",
      "menuSubTitle": "设置房型、促销，维护商户信息，管理协议客户等",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 60,
      "parentId": 26,
      "menuName": "核心功能",
      "menuSubTitle": "会员体系、协议客户体系设置，影响面大，设置后不轻易调整",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 29,
      "parentId": 26,
      "menuName": "日历房",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 99,
      "parentId": 26,
      "menuName": "预售券",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 113,
      "parentId": 26,
      "menuName": "储值卡权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": [
          {
              "menuId": 114,
              "parentId": 113,
              "menuName": "查询",
              "menuSubTitle": null,
              "permission": "prepay_card_view",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 115,
              "parentId": 113,
              "menuName": "充值",
              "menuSubTitle": null,
              "permission": "prepay_card_deposit",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 116,
              "parentId": 113,
              "menuName": "扣款",
              "menuSubTitle": null,
              "permission": "prepay_card_charge",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 117,
              "parentId": 113,
              "menuName": "对账/明细",
              "menuSubTitle": null,
              "permission": "prepay_card_audit",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 118,
              "parentId": 113,
              "menuName": "充值配置",
              "menuSubTitle": null,
              "permission": "prepay_card_product_edit",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 119,
              "parentId": 113,
              "menuName": "店内消费退款",
              "menuSubTitle": null,
              "permission": "prepay_card_refund_inshop",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 120,
              "parentId": 113,
              "menuName": "店内消费(无验证码强制提交)",
              "menuSubTitle": null,
              "permission": "prepay_card_store_consumption",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 121,
              "parentId": 113,
              "menuName": "冻结/解冻",
              "menuSubTitle": null,
              "permission": "prepay_card_freeze",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 122,
              "parentId": 113,
              "menuName": "下载",
              "menuSubTitle": null,
              "permission": "prepay_card_download",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 123,
              "parentId": 113,
              "menuName": "储值卡强制退款",
              "menuSubTitle": null,
              "permission": "prepay_card_force_refund",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 124,
              "parentId": 113,
              "menuName": "第三方卡号导入",
              "menuSubTitle": null,
              "permission": "prepay_card_3part",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 125,
              "parentId": 113,
              "menuName": "礼品卡",
              "menuSubTitle": null,
              "permission": "prepay_card_send",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 280,
              "parentId": 113,
              "menuName": "手机号加密",
              "menuSubTitle": null,
              "permission": "prepay_card_mobile_encode",
              "menuType": 2,
              "remarks": "储值卡手机号加密开关",
              "subList": []
          },
          {
              "menuId": 919,
              "parentId": 113,
              "menuName": "赠送储值卡",
              "menuSubTitle": null,
              "permission": "free_card_edit",
              "menuType": 2,
              "remarks": "",
              "subList": []
          }
      ]
  },
  {
      "menuId": 86,
      "parentId": 26,
      "menuName": "权益卡",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 95,
      "parentId": 26,
      "menuName": "有效期卡",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 71,
      "parentId": 26,
      "menuName": "设置会员升级",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 73,
      "parentId": 26,
      "menuName": "预售券门店产品审核",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": [
          {
              "menuId": 74,
              "parentId": 73,
              "menuName": "查看",
              "menuSubTitle": null,
              "permission": "brand_product_audit_view",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 75,
              "parentId": 73,
              "menuName": "审核",
              "menuSubTitle": null,
              "permission": "brand_product_audit",
              "menuType": 2,
              "remarks": null,
              "subList": []
          }
      ]
  },
  {
      "menuId": 76,
      "parentId": 26,
      "menuName": "现金账户",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 706,
      "parentId": 26,
      "menuName": "财务对账",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 5,
      "remarks": "",
      "subList": []
  },
  {
      "menuId": 81,
      "parentId": 26,
      "menuName": "小生活对账",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 84,
      "parentId": 26,
      "menuName": "飞猪分销",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": [
          {
              "menuId": 85,
              "parentId": 84,
              "menuName": "分销管理",
              "menuSubTitle": null,
              "permission": "fliggy_distribution",
              "menuType": 2,
              "remarks": null,
              "subList": []
          }
      ]
  },
  {
      "menuId": 126,
      "parentId": 26,
      "menuName": "积分权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 130,
      "parentId": 26,
      "menuName": "订餐权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 133,
      "parentId": 26,
      "menuName": "会议预定权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 135,
      "parentId": 26,
      "menuName": "会议发券",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 137,
      "parentId": 26,
      "menuName": "会场管理",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 143,
      "parentId": 26,
      "menuName": "数据报表",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": [
          {
              "menuId": 205,
              "parentId": 143,
              "menuName": "数据魔方",
              "menuSubTitle": "",
              "permission": null,
              "menuType": 5,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 209,
              "parentId": 143,
              "menuName": "店铺整体报表",
              "menuSubTitle": "",
              "permission": null,
              "menuType": 5,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 215,
              "parentId": 143,
              "menuName": "粉丝数据",
              "menuSubTitle": "",
              "permission": null,
              "menuType": 5,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 218,
              "parentId": 143,
              "menuName": "业务线数据",
              "menuSubTitle": "",
              "permission": null,
              "menuType": 5,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 829,
              "parentId": 143,
              "menuName": "官微通",
              "menuSubTitle": null,
              "permission": "",
              "menuType": 5,
              "remarks": "",
              "subList": [
                  {
                      "menuId": 830,
                      "parentId": 829,
                      "menuName": "概览",
                      "menuSubTitle": null,
                      "permission": "overview",
                      "menuType": 2,
                      "remarks": "数据小程序报表权限",
                      "subList": []
                  },
                  {
                      "menuId": 831,
                      "parentId": 829,
                      "menuName": "选品",
                      "menuSubTitle": null,
                      "permission": "choose_products",
                      "menuType": 2,
                      "remarks": "数据小程序报表权限",
                      "subList": []
                  },
                  {
                      "menuId": 912,
                      "parentId": 829,
                      "menuName": "用户",
                      "menuSubTitle": null,
                      "permission": "user_analysis",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  },
                  {
                      "menuId": 914,
                      "parentId": 829,
                      "menuName": "流量",
                      "menuSubTitle": null,
                      "permission": "flow_analysis",
                      "menuType": 2,
                      "remarks": "",
                      "subList": []
                  }
              ]
          }
      ]
  },
  {
      "menuId": 144,
      "parentId": 26,
      "menuName": "消息群发",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 147,
      "parentId": 26,
      "menuName": "推广权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 151,
      "parentId": 26,
      "menuName": "退房|发票预约",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": [
          {
              "menuId": 152,
              "parentId": 151,
              "menuName": "查询",
              "menuSubTitle": null,
              "permission": "invoice_view",
              "menuType": 2,
              "remarks": null,
              "subList": []
          },
          {
              "menuId": 153,
              "parentId": 151,
              "menuName": "修改",
              "menuSubTitle": null,
              "permission": "invoice_update",
              "menuType": 2,
              "remarks": null,
              "subList": []
          }
      ]
  },
  {
      "menuId": 154,
      "parentId": 26,
      "menuName": "发券",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 157,
      "parentId": 26,
      "menuName": "直播权限",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 159,
      "parentId": 26,
      "menuName": "微POS直付",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 162,
      "parentId": 26,
      "menuName": "二维码活码",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 166,
      "parentId": 26,
      "menuName": "拼团",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 169,
      "parentId": 26,
      "menuName": "砍价",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 172,
      "parentId": 26,
      "menuName": "免税店折扣申请",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 174,
      "parentId": 26,
      "menuName": "营销活动",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 177,
      "parentId": 26,
      "menuName": "任务宝",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 180,
      "parentId": 26,
      "menuName": "景区",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 186,
      "parentId": 26,
      "menuName": "红包活动",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 188,
      "parentId": 26,
      "menuName": "评价管理",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 191,
      "parentId": 26,
      "menuName": "微官网管理",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 193,
      "parentId": 26,
      "menuName": "POS",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 195,
      "parentId": 26,
      "menuName": "在线客服",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 197,
      "parentId": 26,
      "menuName": "定向发券",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 199,
      "parentId": 26,
      "menuName": "导入管理",
      "menuSubTitle": "",
      "permission": null,
      "menuType": 5,
      "remarks": null,
      "subList": []
  },
  {
      "menuId": 726,
      "parentId": 26,
      "menuName": "店铺管理",
      "menuSubTitle": null,
      "permission": "",
      "menuType": 5,
      "remarks": "",
      "subList": []
  }
]
