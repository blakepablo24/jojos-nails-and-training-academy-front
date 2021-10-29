let myConstClass = {}
const fbAccessCode = "EAAFcRxx4sPIBAAIKUhZCXDAS8ShUcqdxPVt9yNZCfwZAWbRqnsxsbiXd67scBp4A0e7kavZBDBIFR1LHdrmbKHXchFuazKacaneD9RamYlvoXJlfFH1bv3w43XSvRPNc2qan6WCGbVXQ6ZBouhvdFDJbMkSd5PtV9i0jiD5xBtnx7iAGLPwTu";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=" + fbAccessCode
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=" + fbAccessCode
  }
}
 
export default myConstClass