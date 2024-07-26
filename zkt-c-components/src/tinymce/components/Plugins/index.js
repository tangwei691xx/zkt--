import uploadBtn from '../Plugins/uploadBtn'

var pulginArr = [uploadBtn]

export default function installPugin (tinymce) {
  pulginArr.forEach(plugin => {
    if (typeof(plugin) === 'function') {
      plugin(tinymce)
    }
  })
}