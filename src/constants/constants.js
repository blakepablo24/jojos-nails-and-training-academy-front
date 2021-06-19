let myConstClass = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC"
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC"
  }
}



export default myConstClass