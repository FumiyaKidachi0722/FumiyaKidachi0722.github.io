const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

app.use(express.json());//重要
app.use(express.static("./public"));

const PORT = 5000;

//ルーティング設計
//use("共通している部分", 共通外)
app.use("/api/v1/tasks", taskRoute);

//データベースと接続
const start = async () => {
    try {
        await connectDB("mongodb+srv://udemy:fVwtmqg21135@cluster0.tvzrbzz.mongodb.net/todoapp?retryWrites=true&w=majority");
        app.listen(PORT, console.log("サーバーが起動しました"));
    } catch (err) {
        console.log(err)
    }
}

start();
