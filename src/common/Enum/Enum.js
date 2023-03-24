// Các enum dùng chung toàn chương trình
var Enumeration = Enumeration || {};

// Các mode của form detail
export const FormMode = Object.freeze({
    Add: 1,    // Thêm mới
    Edit: 2,   // Sửa
    Delete: 3,  // Xóa
})

export const RewardObject = Object.freeze({
    Personal: 1,        //cá nhân
    Group: 2,           //tập thể
    PersonalGroup: 3,   // cá nhân và tập thể
    Family: 4           //Hộ gia đình
})

export const TypeMovement = Object.freeze({
    Usually: 1,          // Thường xuyên
    Batched: 2           // Theo đợt
})

export const Status = Object.freeze({
    Use: 1, // Đang sử dụng
    StopUsing: 2, // Ngừng sử dụng
})

export default Enumeration;