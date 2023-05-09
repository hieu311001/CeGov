// Các enum dùng chung toàn chương trình
var Enumeration = Enumeration || {};

/**
 * Các mode của form detail
 * CreatedBy VMHieu 23/03/2023
 */ 
export const FormMode = {
    Add: 1,    // Thêm mới
    Edit: 2,   // Sửa
    Delete: 3,  // Xóa
    AddSave: 4, // Lưu và thêm mới
    DeleteMultiple: 5 //Xóa nhiều
}
/**
 * Các giá trị của đối tượng khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */ 
export const RewardObject = {
    All: "",
    Personal: "1",        //cá nhân
    Group: "2",           //tập thể
    Family: "3"           //Hộ gia đình
}
/**
 * Giá trị của cấp khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */
export const RewardLevel = {
    Government: "0001",
    Province: "0002",
    District: "0003",
    Commune: "0004"
}
/**
 * Các giá trị của loại phong trào
 * CreatedBy VMHieu 23/03/2023
 */ 
export const TypeMovement = {
    All: "",
    Usually: "1",          // Thường xuyên
    Batched: "2",           // Theo đợt
}
/**
 * Các giá trị của trạng thái sử dụng
 * CreatedBy VMHieu 23/03/2023
 */ 
export const Status = {
    All: "",
    Use: 1, // Đang sử dụng
    StopUsing: 2, // Ngừng sử dụng
}
/**
 * Các giá trị của trạng thái popup
 * CreatedBy VMHieu 31/03/2023
 */ 
export const PopupStatus = {
    Delete: 1,   // Cảnh báo trước khi xóa
    Error: 2, // Cảnh báo lỗi
}
/**
 * Các giá trị của mode khi lấy thông tin emulation
 * CreatedBy VMHieu 25/04/2023
 */
export const GetEmulationForm = {
    Edit: 0,
    NotEdit: 1,
}

export default Enumeration;