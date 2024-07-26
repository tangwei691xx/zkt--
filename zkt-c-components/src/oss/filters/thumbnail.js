function getFileExtension(filename) {
  // 确保传入的是字符串
  if (typeof filename === 'string') {
    const lastDotPosition = filename.lastIndexOf('.');
    // 确保点号不是第一个字符，并且不是最后一个字符
    if (lastDotPosition > 0 && lastDotPosition < filename.length - 1) {
      return filename.substring(lastDotPosition + 1);
    }
  }
  return '';
}

export default function (name) {
  if (!name) {
    return name;
  }

  try {
    const suffix = getFileExtension(name);
    // 假设当前后缀是avif，不添加oss
    if (suffix === 'avif') {
      return name;
    }
  } catch (e) {
    console.log(e, '---- thumbnail error ----', name);
  }

  return name + '?x-oss-process=image/auto-orient,1/resize,m_pad,w_200,h_200/quality,q_100';
}
