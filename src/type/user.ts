export interface ListInt {
    //用户信息的限制
    id:number
    nickName:string
    role:RoleInt[]
    userName:string
}
interface RoleInt {
    //用户规则权限的限制
    role:number
    roleName:string
}
interface SelectDataInt {
    //类中selectData的限制，表示上面查找数据板块的限制
    role:number
    nickName:string
}
interface RoleListInt {
    //用户信息列表
    authority:number[]
    roleId:number
    roleName:string
}
interface ActiveInt {
    id:number
    nickName:string
    role:number[]
    userName:string
}
//创建的类
export class InitData {
    //输入框
    selectData: SelectDataInt = {
        nickName:"",
        role:0
    }
    list: ListInt[] = [] //用来接收用户信息的列表
    roleList : RoleListInt[] = [] //用来接收角色信息的列表
    isShow = false
    active:ActiveInt = { //接受选中的对象
        id:0,
        nickName:"",
        role:[],
        userName:""
    }
}
