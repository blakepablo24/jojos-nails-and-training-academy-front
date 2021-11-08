let myConstClass = {}
const fbRequest = "https://graph.facebook.com/v12.0/me?fields=id,name,overall_star_rating,picture{url},rating_count,ratings{created_time,review_text,rating,reviewer{id,first_name,profile_pic}}&access_token=";
const fbAccessCode = "EAAFcRxx4sPIBAFp961OZCpYiUizzWje3pWVoY1vAkwz2CxqpJTyyXNr50ecapwzDQdyObikpULroyqv8JxsOm0SFeMJep6oRK46jFZC5BZAF38KiWCQG6zzHTuDHdQePY5j4JGmF8MDtObNtm8A3cO5CeIYDmHaqKwrwTBLjYee8Hk87TUZB";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: fbRequest + fbAccessCode
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB:  fbRequest + fbAccessCode
  }
}
 
export default myConstClass