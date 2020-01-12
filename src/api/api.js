import axios from 'axios' // 导入axios模块
export const getMenuList = params => { // 封装一个函数，名为getTodoList
  return axios.get(`/menu/list`, { // 请求路径 ‘/todo/list’
    params: params
  })
}
export const addMenu = params => {
  return axios.post(`/menu/add`, params).then(res => res.data)
}
// 新增一个请求查询代办单项列表的数据的接口函数
export const getTodo = params => {
  return axios.get(`/menu/` + params.id)
}
// 新增一个请求新增代办单的接口函数
export const addRecord = params => {
  return axios.post(`/todo/record/add`, params).then(res => res.data)
}
