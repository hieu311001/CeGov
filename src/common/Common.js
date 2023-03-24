import * as Enumeration from "./Enum/Enum";
import * as Resource from "./Resource/Resource";
// Các hàm dùng chung toàn chương trình

// Lấy giá trị của một enum
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


// Chuyển đổi giá trị enum về giá trị trong csdl
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

