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
 * Chuyển mảng thành chuỗi theo thứ tự sắp xếp ASC
 * @param {} array 
 * @returns 
 * CreatedBy VMHieu 10/05/2023
 */
export function arrayBiding(array) {
    array = array.sort(function(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    return array.join("");
}
/**
 * Chuyển chuỗi thành mảng theo thứ tự ASC
 * @param {} str 
 * @returns 
 * CreatedBy VMHieu 10/05/2023
 */
export function bidingArray(str) {
    let arr = str.split('').sort(function(a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });
    return arr;
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
 * Format big number
 * @param {*} value 
 * @returns 
 * CreatedBy VMHieu 28/04/2023
 */
export function addCommas(value) {
    const stringFormat = `${value}`;
    const x = stringFormat.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? `.${x[1]}` : '';
    const regex = /(\d+)(\d{3})/;
    while (regex.test(x1)) {
      x1 = x1.replace(regex, '$1.$2');
    }
    return x1 + x2;
}

/**
 * Hàm xử lý ngoại lệ nhận về từ server
 * @param {*} context 
 * @param {*} errorMsg 
 * @param {*} code 
 * CreatedBy VMHieu 07/04/2023
 */
export function handleError(context, errorMsg, code) {
    context.commit('updatePopupMsg', errorMsg);
    context.commit('showPopup', true);
}

