import * as Enumeration from "./Enum/enum";
import * as Resource from "./Resource/resource";
// Các hàm dùng chung toàn chương trình

/**
 * Lấy giá trị của một enum
 * @param {*} data 
 * @param {*} resourceName 
 * @returns 
 * CreatedBy VMHieu 08/04/2023
 */
export function getValueEnum (data, enumName) {
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for(const prop in enumeration) {
        if(enumeration[prop] == data){
            data = resource[prop];
        }
    }
    
    return data;
}

/**
 * Chuyển đổi giá trị enum về giá trị trong csdl
 * @param {*} data 
 * @param {*} resourceName 
 * @returns 
 * CreatedBy VMHieu 08/04/2023
 */
export function getValueEnumBack (data, resourceName)  {
    let enumeration = Enumeration[resourceName],
        resource = Resource[resourceName];

    for(const prop in resource) {
        if(resource[prop] == data){
            data = enumeration[prop];
        }
    }
    
    return data;
}
/**
 * Show toast thông báo mỗi khi thực hiện xong thao tác
 * CreatedBy VMHieu 07/04/2023
 */
export function handleShowToast(context) {
    context.commit('showToast', true);
    setTimeout(() => {
        context.commit('showToast', false);
    }, 2000);
}
/**
 * Chuyển đổi enum text về giá trị của checkbox
 * @param {*} data 
 * @param {*} enumName 
 * @returns 
 * CreatedBy VMHieu 12/04/2023
 */
export function getValueEnumText(data, enumName) {
    let result = [];
    let enumeration = Enumeration[enumName],
        resource = Resource[enumName];

    for(const prop in enumeration) {
        if (data.includes(enumeration[prop]) && enumeration[prop]) {
            result.push(resource[prop]);
        }
    }
    return result.join(resource.Breakpoint);
}

/**
 * Hàm xử lý ngoại lệ nhận về từ server
 * @param {*} context 
 * @param {*} errorMsg 
 * @param {*} code 
 * CreatedBy VMHieu 07/04/2023
 */
export function handleError(context, errorMsg, code) {
    let msg = "";
    let arr = [];
    switch(errorMsg.join('')) {
        case Resource.ErrorMsg.ErrorDuplicateCode:
            arr = Resource.PopupMessage.DuplicateCode.trim().split(" ");
            for(let i = 0; i < arr.length; i++) {
                if (arr[i] == Resource.PopupMessage.Breakpoint) {
                    arr[i] = code;
                }
            }
            msg = arr.join(" ");
            break;
        default:
            msg = Resource.ErrorMsg.ErrorSystem;
    }
    context.commit('updatePopupMsg', msg);
    context.commit('showPopup', true);
}

