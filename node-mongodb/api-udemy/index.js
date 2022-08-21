const express = require('express');
const app = express();
const port = 5000;
app.use(express.json());

app.listen(port, () => console.log("サーバーが起動しました"));

app.get("/", (req, res) => {
    res.send("udemy講座を受講中");
});

//jsonfaile形式
const customers = [
    {title: "田中", id: 1},
    {title: "斎藤", id: 2},
    {title: "橋本", id: 3},
    {title: "鈴木", id: 4},
    {title: "安藤", id: 5},
];

app.get("/api/customers", (req, res) => {
    res.send(customers);
});

app.post("/api/customers", (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customer);
});

//お客様情報の更新
app.put("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    //customersの全ての情報をcの変数に入れ調べ、:idはreq.params.idをさしている
    //idで指定したものを探す
    customer.title = req.body.title;
    res.send(customer);
});

//お客様情報の削除
app.delete("/api/customers/:id", (req, res) => {
    const customer = customers.find((c) => c.id === parseInt(req.params.id));
    //customerがcustomersの何番目にあるのか配列の番号を返す
    const index = customers.indexOf(customer);
    customers.splice(index, 1);
    res.send(customer);
});