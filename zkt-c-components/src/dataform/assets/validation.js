// function形式
export default function (throwError) {
  return {
    input: {
      required: true, // 必须设置为true
      input (val) {
        if (!/\d{3}-\d{7}/.test(val)) {
          return throwError('input', '我是自定义错误')
        }
        return true
      }
    }
  }
}
// Object形式
// export default {
//   input: {
//     required: true, // 必须设置为true
//   }
// }