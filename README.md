# auth-totp
like Google Authenticator implement the Time-Based One-Time Password (TOTP) algorithm, demo implemented by java .etc

# Pseudo Code [1]
original_secret = xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
secret = BASE32_DECODE(TO_UPPERCASE(REMOVE_SPACES(original_secret)))
input = CURRENT_UNIX_TIME() / 30
hmac = SHA1(secret + SHA1(secret + input))
four_bytes = hmac[LAST_BYTE(hmac):LAST_BYTE(hmac) + 4]
large_integer = INT(four_bytes)
small_integer = large_integer % 1,000,000

# See Also
1. How Google Authenticator Works, https://garbagecollected.org/2014/09/14/how-google-authenticator-works/
2. 谷歌两步验证系统的工作原理 (How Google Authenticator Works) 【译】, http://www.infoq.com/cn/news/2014/09/system-verification
3. 利用google authenticator构建平台的otp动态口令, http://xiaorui.cc/2014/11/09/%E5%88%A9%E7%94%A8google-authenticator%E6%9E%84%E5%BB%BA%E5%B9%B3%E5%8F%B0%E7%9A%84otp%E5%8A%A8%E6%80%81%E5%8F%A3%E4%BB%A4/
4. 推荐全平台应用 POWERFUL 2FA PROTECTION FOR EVERYONE, https://www.authy.com/app/
