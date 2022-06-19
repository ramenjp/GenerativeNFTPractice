## What is

Generative NFT PJ の練習レポジトリです。
frontend は作成しておらず、直コンで mint しています。
動作確認は Network は Riknkeby, testnet Opensea で行いました。

## 使用技術

- Solidity 0.8.9
- Next.js 12.1.6
- TypeScript
- openZeppelin
- Hardhat
- Infura
- Typechain
- IPFS(Pinata)

## Command

### contract フォルダ

- yarn dev
  - local node の立ち上げ
- yarn flatten
  - etherscan 上で verify するための flat 化されたコードを生成

### front フォルダ

- yarn install
  - package インストール
- yarn dev
  - 開発環境の立ち上げ

### generate フォルダ

- yarn generate
  - metadata.csv 通りに画像を生成
- yarn csv-generate
  - metadata.csv を生成
- yarn tojson
  - json ファイル生成

## 今後やりたいこと

- reveal の実装
- markletree を用いた WhiteList の実装
