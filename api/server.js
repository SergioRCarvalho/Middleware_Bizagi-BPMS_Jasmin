const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var axios = require('axios');
const USER_TOKEN = "eyJhbGciOiJSUzI1NiIsImtpZCI6IkFEM0Q1RDJERjM4OTZBMDUwMzYwNzVDQkNFNDc0RDJBMjI4MUVCM0UiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJyVDFkTGZPSmFnVURZSFhMemtkTktpS0I2ejQifQ.eyJuYmYiOjE2MTExODA3NzEsImV4cCI6MTYxMTE5NTE3MSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiTkVXR1JVUE8xNEFQUCIsInNjb3BlIjpbImFwcGxpY2F0aW9uIl19.LVVxNsNdzPKVzeCPO0HXvyhazQnWdqWjz0ZHbGTERKVoUe98Gh2_UuoBrolge7ghSnwg6PeUZzi86MsKfAGE5i0GgMKR8zVi8vMS5k4iQkyHZDUuYzS0lLkia7N9qo3PuOpkoFqZZFvbbQxdpiFHIXkqTJ1nztC1veOS7n4hRw7r6HEv4m9OAqBwdpAjJ9EdbXkcn5PsQ5Za0oOnMw-3erbpqLglPw-CWzi6jtyBZ7lFydoj5912N40sCBOAHfuz2dxcKoOwZF777lFgd6o77RBlYplEwuE9_7Z09_-lf5w40eqU7uL5qWA-HqGwp8py79PHyCcatjwfERaBXQvCLg";

const AuthStr = 'Bearer '.concat(USER_TOKEN);

// parse application/json
app.use(bodyParser.json());



//##############################################################################################################################
// retorna o valor pago pela encomenda
app.get('/api/VerificaPagamento', async (req, res) => {
try{
   const URL = 'https://my.jasminsoftware.com/api/246190/246190-0001/sales/orders';
   
   let orders = await axios.get(URL, 
      { headers: { Authorization: AuthStr}});
      const data =orders.data.map((order)=>{
        return{
          EstadoPagamento:order.payableAmountAmount
        };
      });
      res.json(data);
    }
    catch(error)
    {
      console.log(error.message);
    }
    });

//##############################################################################################################################
// retorna todos os users
app.get('/api/Utilizadores',async (req, res) => {
try{
  const URL = 'https://my.jasminsoftware.com/api/246190/246190-0001/salesCore/customerParties';
 let users = await axios.get(URL, 
      { headers: { Authorization: AuthStr}});

      const data =users.data.map((u)=>{
        return{
          id:u.partyKey,
          nome:u.name,
          email:u.electronicMail
        };
      });
      res.json(data);
    }
    catch(error)
    {
      console.log(error.message);
    }
    });

// ###########################################################################
//Server listening
app.listen(3000,() =>{
  console.log('Server started on port 3000...');
});