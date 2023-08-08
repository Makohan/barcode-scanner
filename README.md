# バーコードスキャナー

図書委員の活動の一環で、本を管理するためのシステムです。

主な機能は下記の通り

- カメラでのバーコード（ISBN）スキャン
- バーコードをもとに[Google Books APIs](https://developers.google.com/books)、[openBD](https://openbd.jp/)で書籍検索
- 検索結果をCSVダウンロード

## 開発者向け

`pnpm`でパッケージ管理しています

```bash
# パッケージインストール
pnpm i

# 開発環境の起動
pnpm dev
```
