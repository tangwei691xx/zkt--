// 更新表单字段
export function updateField (fields, name, key, value) {
  let field = {}
  fields.some((item) => {
    if (item.name === name) {
      field = item
      return true
    }
  })
  field[key] = value
}
