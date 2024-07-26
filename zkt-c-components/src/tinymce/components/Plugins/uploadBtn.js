export default function uploadBtn (tinymce) {
  tinymce.PluginManager.add('uploadbtn', function(editor, url) {
    // Add a button that opens a window
    editor.ui.registry.addButton('uploadbtn', {
      icon: 'upload',
      tooltip: '上传或选择图片',
      onAction: function () {
        editor.fire('UploadbtnClick')
      }
    });
  });
}