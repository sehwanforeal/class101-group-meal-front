// exports.client_id = "client_id=854668779588.857346823878";
// exports.client_secret = "client_secret=50ca812413faf339cd2848f42b8762dd";
exports.client_id = "client_id=2877224790.859064433381";
exports.client_secret = "client_secret=a8a3140b7dd976601be6c52ffab797c2";
exports.url = "https://ex-manager2.class101.net/";
// "http://54.180.92.87:3030/";
// " https://86ds5kfejd.execute-api.ap-northeast-2.amazonaws.com/prod/";
exports.url_j = "http://10.0.4.53:3030/";
exports.url_q = "http://10.0.7.163:3030/";
const token = sessionStorage.getItem("access_token");
const headers = {
  authorization: token
};
