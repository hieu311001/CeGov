import axios from "axios";

/**
 * Lấy toàn bộ bản ghi danh hiệu thi đua
 * @returns mảng chứa toàn bộ bản ghi danh hiệu thi đua
 * CreatedBy VMHieu 22/03/2023
 */
export async function getAllEmulation() {
    let emulation;

    await axios.get(`https://localhost:7004/api/v1/Emulation`)
    .then(function (response) {
        emulation = response.data;
    })
    .catch(function (error) {
        emulation = error.response.status;
    })

    return emulation;
}

export async function getByID(id) {
    let emulation;

    await axios.get(`https://localhost:7004/api/v1/Emulation/` + id)
    .then(function (response) {
        emulation = response.data;
    })
    .catch(function (error) {
        emulation = error.response.status;
    }) 

    return emulation;
}