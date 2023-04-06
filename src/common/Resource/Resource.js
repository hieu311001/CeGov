
// Các resource dùng chung toàn chương trình
var Resource = Resource || {};

/**
 * Giá trị của đối tượng khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */
export const RewardObject = {
    All: "Tất cả",
    Personal: "Cá nhân",        //cá nhân
    Group: "Tập thể",           //tập thể
    PersonalGroup: "Cá nhân và tập thể",   // cá nhân và tập thể
    Family: "Hộ gia đình"           //Hộ gia đình
}
/**
 * Giá trị của cấp khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */
export const RewardLevel = {
    Government: "Cấp Nhà nước",
    Province: "Cấp Tỉnh/Tương đương",
    District: "Cấp Huyện/Tương đương",
    Commune: "Cấp Xã/Tương đương"
}
/**
 * Giá trị của loại phong trào
 * CreatedBy VMHieu 23/03/2023
 */
export const TypeMovement = {
    All: "Tất cả",
    Usually: "Thường xuyên",          // Thường xuyên
    Batched: "Theo đợt",           // Theo đợt
    UsuallyBatched: "Thường xuyên; Theo đợt"
}
/**
 * Giá trị của trạng thái sử dụng
 * CreatedBy VMHieu 23/03/2023
 */
export const Status = {
    All: "Tất cả",
    Use: "Đang sử dụng", // Đang sử dụng
    StopUsing: "Ngừng sử dụng", // Ngừng sử dụng
}
/**
 * Giá trị của các trường enum
 * CreatedBy VMHieu 23/03/2023
 */
export const PropName = {
    All: "Tất cả",
    RewardObject: "RewardObject",   // Đối tượng khen thưởng
    Status: "Status",               // Trạng thái sử dụng
    TypeMovement: "TypeMovement", // Loại phong trào
}
/**
 * Giá trị của các error
 * CreatedBy VMHieu 23/03/2023
 */
export const ValidateError = {
    ErrorCode: "Mã danh hiệu không được để trống.",
    ErrorName: "Tên danh hiệu thi đua không được để trống.",
    ErrorObject: "Đối tượng thi đua không được để trống.",
    ErrorRewardLevel: "Cấp khen thưởng không được để trống.",
    ErrorTypeMovement: "Loại phong trào không được để trống."
}
/**
 * Nội dung thông báo toast message
 * CreatedBy VMHieu 05/04/2023
 */
export const ToastSuccess = {
    AddSuccess: "Thêm thành công",
    EditSuccess: "Sửa thành công",
    DeleteSuccess: "Xóa thành công",
    LoadSuccess: "Tải dữ liệu thành công",
}
/**
 * Nội dung thông báo toast message
 * CreatedBy VMHieu 05/04/2023
 */
export const ToastFail = {
    AddFail: "Thêm thất bại",
    EditFail: "Sửa thất bại",
    DeleteFail: "Xóa thất bại",
    LoadFail: "Tải dữ liệu thất bại"
}
/**
 * Nội dung xóa danh hiệu thi đua
 * CreatedBy VMHieu 05/04/2023
 */
export const PopupMessage = {
    Delete: "Bạn có chắc chắn muốn xóa Danh hiệu thi đua * đã chọn không?",
    DeleteMultiple: "Xóa * danh hiệu đã chọn?",
    Breakpoint: "*", // Kí tự ngắt dòng để thay thế 
}

/**
 * Data cấp khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */
export const DataRewardLevel = [
    "Tất cả",
    "Cấp Nhà nước",
    "Cấp Tỉnh/Tương đương",
    "Cấp Huyện/Tương đương",
    "Cấp Xã/Tương đương"
]
/**
 * Data đối tượng khen thưởng
 * CreatedBy VMHieu 23/03/2023
 */
export const DataRewardObject = [
    "Tất cả",
    "Hộ gia đình",
    "Tập thể",
    "Cá nhân",
    "Cá nhân và tập thể"
]
/**
 * Data Loại phong trào
 * CreatedBy VMHieu 23/03/2023
 */
export const DataTypeMovement = [
    "Tất cả",
    "Thường xuyên",
    "Theo đợt"
]
/**
 * Data trạng thái sử dụng
 * CreatedBy VMHieu 23/03/2023
 */
export const DataStatus = [
    "Tất cả",
    "Đang sử dụng",
    "Ngừng sử dụng"
]
/**
 * Data pagesize
 * CreatedBy VMHieu 23/03/2023
 */
export const DataPageSize = [
    10,
    20,
    50,
    100
]
/**
 * các loại error validate combobox
 * CreatedBy VMHieu 23/03/2023
 */
export const ErrorCombobox = {
    ErrorRewardObject: "Đối tượng khen thưởng không đúng. Vui lòng chọn Đối tượng khen thưởng trong danh sách.",
    ErrorTypeMovement: "Loại phong trào không đúng. Vui lòng chọn Loại phong trào trong danh sách.",
    ErrorRewardLevel: "Cấp khen thưởng không đúng. Vui lòng chọn Cấp khen thưởng trong danh sách.",
    ErrorStatus: "Trạng thái không đúng. Vui lòng chọn Trạng thái trong danh sách."
}
/**
 * các trường label của form thêm sửa
 * CreatedBy VMHieu 23/03/2023
 */
export const LabelForm = {
    TitleAdd: "Thêm danh hiệu thi đua",
    TitleEdit: "Sửa danh hiệu thi đua",
    EmulationName: "Tên danh hiệu thi đua",
    EmulationCode: "Mã danh hiệu thi đua",
    RewardObject: "Đối tượng khen thưởng",
    RewardLevelName: "Cấp khen thưởng",
    TypeMovement: "Loại phong trào áp dụng",
    Note: "Ghi chú"
}

export default Resource;