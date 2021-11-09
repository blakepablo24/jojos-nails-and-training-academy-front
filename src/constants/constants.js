let myConstClass = {}
const fbRequest = "https://graph.facebook.com/v12.0/me?fields=id,name,overall_star_rating,picture{url},rating_count,ratings{created_time,review_text,rating,reviewer{id,first_name,profile_pic}}&access_token=";
const fbAccessCode = "EAAFcRxx4sPIBAL2xhhn7AVYvyLlQZAU5OP5JZBKqheZAbEuJu5X3z2HZCmJom2OFg0PyXKS1Ag25GvfNVXROEOQDoHh4nVYCSdQHK69c2YA1XlQjlkEQtYg6YZAINpTuIZALfHVAthu641GrEgAeGi2Pf3HizP2kyTNk64O7eH1yFuA0ifnDRg";

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