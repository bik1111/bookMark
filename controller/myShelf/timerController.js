const timerProvier = require("../../provider/myShelf/timerProvider");


module.exports.startTimer = async (req, res) => {
    try {
      const user_id = parseInt(req.params.user_id);
      const book_id = parseInt(req.params.book_id);
      if (!user_id) {
        res.send("This is not proper id");
        res.redirect("/");
      } else {
        // 현재 유저의 접속 상태를 True 로 설정
        const Online = await timerProvier.retrieveUserOnline(user_id);
        console.log(Online);
        // 현재 선택된 책의 총 독서시간 응답데이터로 전송
        const totalReadingTime = await timerProvier.retrieveTotalReadingTime(
          user_id,
          book_id
        );
        console.log(totalReadingTime);
        res.send({
          user_id: user_id,
          total_reading_time: totalReadingTime.total_reading_time,
        });
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  
  // 타이머 종료
  module.exports.finishTimer = async (req, res) => {
    try {
      var user_id = parseInt(req.params.user_id);
      var book_id = parseInt(req.params.book_id);
      var total_reading_time = parseInt(req.body.total_reading_time);
      var current_reading_page = parseInt(req.body.current_reading_page);
      //var total_reading_time = 10;
      //var current_reading_page = 10;
      if (!user_id) {
        res.send("This is not proper id");
        res.redirect("/");
      } else {
        // 현재 유저의 접속 상태를 False 로 설정
        const Offline = await timerProvier.retrieveUserOffline(user_id);
        console.log(Offline);
        // 현재 유저가 선택한 책의 총 독서시간과 현재 읽고 있는 페이지 업데이트
        const BookInfo = await timerProvier.editBookInfo(
          total_reading_time,
          current_reading_page,
          user_id,
          book_id
        );
        console.log(BookInfo);
        res.send("타이머 종료 / 독서시간 업데이트 완료");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
