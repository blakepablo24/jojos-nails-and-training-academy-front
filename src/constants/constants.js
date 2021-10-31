let myConstClass = {}
const fbAccessCode = "EAAFcRxx4sPIBAIpUymdsth7n8rg49QGN3GZCiFwjZCsRNw7YhCesmZA0ZB3ZCLNmWoYxWNqUtnEZAOvRPM7mHdiJZCN9H8rc9CZBhxD9ZBKH1OFlFkYFbZAvjq3uodTpmLkZBKvNOkF3Vx0fRDvya305xBhywaDRe6kPrrbZCd3wjzhF2KZAjYyHikULy";

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