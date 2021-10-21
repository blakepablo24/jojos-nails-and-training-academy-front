let myConstClass = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings{created_time,review_text,rating,reviewer{id,first_name,profile_pic}}&access_token=EAAFcRxx4sPIBAOu0BBm8kIzag6abqdJznggEgHwYkbyBYmDumtAdMPTuBCH1JTSU6ZB992aFmudys5vj8YZCySMxpO42hXw8VUZCY6XpH3cfc5MaLZAHxp0FNXEE2ZB8vdeZCYE4ZBdZBWqXNvZBTL74HKZCk2cFGziTG3NfK2Lshq3NPWXPypgPTA"
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB: "https://graph.facebook.com/v12.0/me?fields=id%2Cname%2Coverall_star_rating%2Crating_count%2Cratings{created_time,review_text,rating,reviewer{id,first_name,profile_pic}}&access_token=EAAFcRxx4sPIBAOu0BBm8kIzag6abqdJznggEgHwYkbyBYmDumtAdMPTuBCH1JTSU6ZB992aFmudys5vj8YZCySMxpO42hXw8VUZCY6XpH3cfc5MaLZAHxp0FNXEE2ZB8vdeZCYE4ZBdZBWqXNvZBTL74HKZCk2cFGziTG3NfK2Lshq3NPWXPypgPTA"
  }
}



export default myConstClass