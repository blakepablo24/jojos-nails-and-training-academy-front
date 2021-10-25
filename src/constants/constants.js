let myConstClass = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=EAAFcRxx4sPIBAM3JV6E05qHttc8OMCkIEYTiZBGZApMCwjTA2x2qgHLOU6dUIzbyhbcQQdnm8lGsD9URmyhAzZADGn5rmiZCILKt89rCqwT0MvuuM6hRqrPhbb9L0qIP95I8yZCwWFBAx01UtP8YT1mvIiqdBAX2zyn2z8HwZCy5aJbN1DNnqx"
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings%7Bcreated_time%2Creview_text%2Crating%2Creviewer%7Bid%2Cfirst_name%2Cprofile_pic%7D%7D&access_token=EAAFcRxx4sPIBAM3JV6E05qHttc8OMCkIEYTiZBGZApMCwjTA2x2qgHLOU6dUIzbyhbcQQdnm8lGsD9URmyhAzZADGn5rmiZCILKt89rCqwT0MvuuM6hRqrPhbb9L0qIP95I8yZCwWFBAx01UtP8YT1mvIiqdBAX2zyn2z8HwZCy5aJbN1DNnqx"
  }
}
 
export default myConstClass