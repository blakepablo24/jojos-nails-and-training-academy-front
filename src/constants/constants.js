let myConstClass = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=EAAFcRxx4sPIBAMU8RqrWMHE99bAGB9MNxMaXtr9qZC1KgXecbV6792fDcarPMJQXUocUrMoRHmvGcqZBvDO3VJUyNzm19Achjz0wuyXFbsTwy0HTnaAovqofddhdW0lthYM82kfDIdixTwpnVQZBe91qGmARNNLi82yTLE7VHbXAxWtgYEX"
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=EAAFcRxx4sPIBAMU8RqrWMHE99bAGB9MNxMaXtr9qZC1KgXecbV6792fDcarPMJQXUocUrMoRHmvGcqZBvDO3VJUyNzm19Achjz0wuyXFbsTwy0HTnaAovqofddhdW0lthYM82kfDIdixTwpnVQZBe91qGmARNNLi82yTLE7VHbXAxWtgYEX"
  }
}
 
export default myConstClass