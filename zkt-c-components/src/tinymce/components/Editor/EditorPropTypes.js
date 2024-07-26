/**
 * Copyright (c) 2018-present, Ephox, Inc.
 *
 * This source code is licensed under the Apache 2 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export var defaultConfig = {
  base_url: '//static.zhiketong.com/static/tinymce_5.5.0/',
  language: 'zh_CN',
  inline: false,
  plugins: 'print powerpaste searchreplace autolink  visualblocks visualchars image link advcode table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern permanentpen formatpainter uploadbtn',
  toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter removeformat | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | link image uploadbtn',
  font_formats: '黑体=-apple-system, "Noto Sans", "Helvetica Neue", Helvetica, "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB", "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN", "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti", SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;宋体=Georgia, "Nimbus Roman No9 L", "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", "Source Han Serif CN", STSong, "AR PL New Sung", "AR PL SungtiL GB", NSimSun, SimSun, "TW\-Sung", "WenQuanYi Bitmap Song", "AR PL UMing CN", "AR PL UMing HK", "AR PL UMing TW", "AR PL UMing TW MBE", PMingLiU, MingLiU, serif;楷体=Baskerville, Georgia, "Liberation Serif", "Kaiti SC", STKaiti, "AR PL UKai CN", "AR PL UKai HK", "AR PL UKai TW", "AR PL UKai TW MBE", "AR PL KaitiM GB", KaiTi, KaiTi_GB2312, DFKai-SB, "TW\-Kai", serif;仿宋=Baskerville, "Times New Roman", "Liberation Serif", STFangsong, FangSong, FangSong_GB2312, "CWTEX\-F", serif;Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
  fontsize_formats: "8px 10px 11px 12px 14px 18px 24px 36px",
  style_formats_merge: true,
  style_formats: [
    {
      title: '行间距',
      inline: 'span',
      items: [
        {title: '1倍',inline: 'span',styles: {'line-height': '1'}},
        {title: '1.5倍',inline: 'span',styles: {'line-height': '1.5'}},
        {title: '2倍',inline: 'span',styles: {'line-height': '2'}},
        {title: '2.5倍',inline: 'span',styles: {'line-height': '2.5'}},
        {title: '3倍',inline: 'span',styles: {'line-height': '3'}}
      ]
    },
    {
      title: '字间距',
      inline: 'span',
      items: [
        {title: '0.1px',inline: 'span',styles: {'letter-spacing': '0.1px'}},
        {title: '0.2px',inline: 'span',styles: {'letter-spacing': '0.2px'}},
        {title: '0.3px',inline: 'span',styles: {'letter-spacing': '0.3px'}},
        {title: '0.4px',inline: 'span',styles: {'letter-spacing': '0.4px'}},
        {title: '0.5px',inline: 'span',styles: {'letter-spacing': '0.5px'}},
        {title: '0.6px',inline: 'span',styles: {'letter-spacing': '0.6px'}},
        {title: '0.7px',inline: 'span',styles: {'letter-spacing': '0.7px'}},
        {title: '0.8px',inline: 'span',styles: {'letter-spacing': '0.8px'}},
        {title: '0.9px',inline: 'span',styles: {'letter-spacing': '0.9px'}},
        {title: '1px',inline: 'span',styles: {'letter-spacing': '1px'}},
        {title: '1.5px',inline: 'span',styles: {'letter-spacing': '1.5px'}},
        {title: '2px',inline: 'span',styles: {'letter-spacing': '2px'}},
        {title: '3px',inline: 'span',styles: {'letter-spacing': '3px'}},
        {title: '4px',inline: 'span',styles: {'letter-spacing': '4px'}},
        {title: '5px',inline: 'span',styles: {'letter-spacing': '5px'}}
      ]
    },
    {
      title: '两端缩进',
      inline: 'span',
      items: [
        {title: '取消',inline: 'span',styles: {'display':'inline-block','padding': '0','word-break': 'break-word'}},
        {title: '8px',inline: 'span',styles: {'display':'inline-block','padding-left': '8px','padding-right': '8px','word-break': 'break-word'}},
        {title: '16px',inline: 'span',styles: {'display':'inline-block','padding-left': '16px','padding-right': '16px','word-break': 'break-word'}},
        {title: '32px',inline: 'span',styles: {'display':'inline-block','padding-left': '32px','padding-right': '32px','word-break': 'break-word'}},
        {title: '48px',inline: 'span',styles: {'display':'inline-block','padding-left': '48px','padding-right': '48px','word-break': 'break-word'}}
      ]
    }
  ],
  suffix: '.min',
  modelEvents: 'change keyup undo redo',
  menubar: true,
  mediaembed_service_url: '',
  file_picker_types: 'file image media',
  valid_children: '+span[div|p]',
  powerpaste_allow_local_images: false,
  powerpaste_block_drop: true,
  height: '500px'
}
export var editorProps = {
  id: String,
  init: Object,
  value: String,
  disabled: Boolean,
  modelEvents: [String, Array],
  initialValue: String,
  name: String,
}
