# Welcome to CAP-CHECKER (AKA Auto Cap)

here you can download Provisional CAP round Allotment PDFs for dse engg within one click

## how to start

- clone this repo by running

```bash
git clone https://github.com/divyanshu-patil/cap-checker.git
```

- navigate to cap-checker by running

```bash
cd cap-checker
```

- install dependencies

```bash
npm i
```

- create a `.env` file in root `/` folder with contents

```text
TARGET_SITE=https://dse2025.mahacet.org.in/dse25/index.php/hp_controller/instwiseallotment
CAP1=./public/result/cap1
CAP2=./public/result/cap2
CAP3=./public/result/cap3
CAP4=./public/result/cap4
CSV_DATA=./result/DATA.csv
```

- run project

```bash
npm run dev
```

---

# Directory Structure

```
├───app
│   └───api
│       ├───data          // used in legacy code currently not using
│       └───getInstPdfZip // zip download endpoint
├───components
├───constants       // constants used in App
├───context
├───lib
│   ├───api         // client API methods
│   └───methods
│       └───server  // server API methods
└───types           // global typescipt types
```

---

# Techstack used

- Next Js
- Axios
- Cheerio
- Archiver
- Tailwind CSS

### ⭐ Give a Star to My repo if you liked it
