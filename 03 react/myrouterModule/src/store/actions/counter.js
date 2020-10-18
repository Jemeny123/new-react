//把action的方法进一步封装，这里的方法是在组件里面调用的
export function addCount(data) {
  return {
    type: "INC",
    data,
  };
}

export function cutCount(data) {
  return {
    type: "DEC",
    data,
  };
}
