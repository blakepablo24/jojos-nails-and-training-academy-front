let myConstClass = {}

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  myConstClass = {
    BASE_URL: "http://localhost:8000",
    ST: "ST",
    TC: "TC",
    FB: "EAAFcRxx4sPIBANbROeXHUi9cDRBlFF7fLD9oTrKRH7dFd1FLljr3lCoErZAS2jSx4tIH5c07cg5yNTIwTo9CS2gtRlpzCAIpGZATtr4ZAcg0Rf5k1A5ze42zPCuCF9OKodphzhWj6WJ69lBNL12yZBO1D5esWTTNo7wgFf7Oq1XJQgpPKLuw"
  }
} else {
  myConstClass = {
    BASE_URL: "http://jojosnailandbeautytrainingacademy.paulrobsondev.co.uk/back/public",
    ST: "ST",
    TC: "TC",
    FB: "EAAFcRxx4sPIBANbROeXHUi9cDRBlFF7fLD9oTrKRH7dFd1FLljr3lCoErZAS2jSx4tIH5c07cg5yNTIwTo9CS2gtRlpzCAIpGZATtr4ZAcg0Rf5k1A5ze42zPCuCF9OKodphzhWj6WJ69lBNL12yZBO1D5esWTTNo7wgFf7Oq1XJQgpPKLuw"
  }
}



export default myConstClass