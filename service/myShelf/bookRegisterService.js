const pool = require("../../config/database");
const shelfDao = require("../../dao/myShelf/shelfDao");
const { errResponse, response } = require("../../config/response");
const baseResponse = require('../../config/baseResponse');


// Service: Create, Update, Delete 비즈니스 로직 처리
exports.registerBook = async (user_id, title, author, publisher, img_url) => {


    const registerBookInfoParams = [user_id, title, author, publisher, img_url];
    const connection = await pool.getConnection(async (conn) => conn);
    const bookReigsterResult = await shelfDao.registerBookInfo(connection,registerBookInfoParams);
    connection.release();

    return response(baseResponse.SUCCESS);

    
}

