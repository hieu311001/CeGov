
// Các resource dùng chung toàn chương trình
var Resource = Resource || {};

// Các trường cần bắt buộc điền
export const RewardObject = Object.freeze({
    Personal: "Cá nhân",        //cá nhân
    Group: "Tập thể",           //tập thể
    PersonalGroup: "Cá nhân và tập thể",   // cá nhân và tập thể
    Family: "Hộ gia đình"           //Hộ gia đình
})

export const TypeMovement = Object.freeze({
    Usually: "Thường xuyên",          // Thường xuyên
    Batched: "Theo đợt"           // Theo đợt
})

export const Status = Object.freeze({
    Use: "Đang sử dụng", // Đang sử dụng
    StopUsing: "Ngừng sử dụng", // Ngừng sử dụng
})

export const PropName = Object.freeze({
    RewardObject: "RewardObject",   // Đối tượng khen thưởng
    Status: "Status",               // Trạng thái sử dụng
    TypeMovement: "TypeMovement", // Loại phong trào
})

export default Resource;