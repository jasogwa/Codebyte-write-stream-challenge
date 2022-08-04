const https = require('https');
var fs = require("fs");
const crypto = require("crypto");

https.get('https://coderbyte.com/api/challenges/json/age-counting', (resp) => {
  
  let {statusCode} = resp;
  let contentType = resp.headers['content-type']
  resp.setEncoding('utf-8')

  let data = '';

  resp.on('data', (res) => {
    data += [res]
  })

  resp.on('end', () => {
    
    let json_d = JSON.parse(data.toString());
    let actual = json_d.data;
    let arr = actual.split(", ");
    let with_age = [];
    let without_age = [];

    for(let i=0; i<arr.length; i++){
      let j = arr[i];
      if(j.includes("age=")) {
        with_age.push(j)
      }else{
        without_age.push(j)
      }
    }

    let sorted_age_arr = [];
    var count = 0;
    for(let i=0; i<with_age.length; i++) {
      let item = with_age[i].split("=");
      if(parseInt(item[1]) === 32) {
        ans = item[0]+":"+item[1];
        sorted_age_arr.push(ans)
        count++
      }
    }
    //console.log(count)

    var out = fs.createWriteStream("output.txt");
    arr.forEach((val) => {
      fs.appendFile("output.txt", out.write(`${val}\n`),
        (err) => {
          if(err) throw err;
        }
      )
    })
    
    fs.readFile('output.txt', 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      const hash = crypto.createHash("sha1");
      hash.update(data);
      const hex = hash.digest("hex");
      console.log(hex)
    })
    
  });

});