import md5 from "./md5.js";
//

const appKey = "xx";
const key = "xx";

function translate({ q, from, to }) {
  return new Promise((resolve, reject) => {
    if (!from) {
      from = "auto"
    }
    let salt = Date.now();
    let sign = md5(appKey + q + salt + key);
    wx.request({
      url: 'https://openapi.youdao.com/api',
      data: {
        q,
        appKey,
        salt,
        from,
        to,
        sign
      },
      success(res) {
        if (res.data && res.data.translation) {
          resolve(res.data)
        } else {
          reject({ status: "error", msg: "翻译失败" });
          wx.showToast({
            title: '翻译失败',
            duration: 2000
          })
        }
      },
      fail(err) {
        reject({ status: "error", msg: "翻译失败" });
        wx.showToast({
          title: '网络异常',
          duration: 2000
        })
      }
    })
  })
}

export default translate;