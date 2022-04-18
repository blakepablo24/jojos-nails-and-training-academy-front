let myConstClass = {}
const fbRequest = "https://graph.facebook.com/v13.0/me?fields=id,name,overall_star_rating,picture{url},rating_count,ratings{created_time,review_text,rating,reviewer{id,first_name,profile_pic}}&access_token=";
let BASE_URL = "";
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    BASE_URL = "http://localhost:8000";
} else {
  BASE_URL = "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public";
}

myConstClass = {
  BASE_URL: BASE_URL,
  ST: "ST",
  TC: "TC",
  FBR: fbRequest
}
 
export default myConstClass