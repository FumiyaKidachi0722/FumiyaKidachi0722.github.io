# package.json作成
```
npm init
```
全てエンターキーを押下
```
{
  "name": "express-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

# ディレクトリ構成
```
express-api
　|---- /app         //これを実行してサーバーを起動します
　|　　　└ app.js    //このディレクトリは各apiのコードを書いたjsファイル入れていきます
　|　　　└ /models   //データベースのモデル情報を書いたjsファイルを入れていきます
　|ㅤ　　　└ /route  //npm initによって生産されたものです
　|　　　　　└ v1
　|---- package.json
```
```
npm install express --save
npm install mongodb --save
npm install mongoose --save
npm install body-parser --save
npm install moment --save
```